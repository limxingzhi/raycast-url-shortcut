import { environment, LaunchType, LocalStorage, showToast, Toast } from "@raycast/api";
import { SYNC_RUNNING_KEY, SHORTCUT_KEYS, LAST_RUN_KEY, SYNC_COOLDOWN, SYNC_ENDPOINT } from "./constants";
import { KeyList, keyListSchema } from "./schema";

const safeShowToast = (options: Toast.Options): Promise<Toast> | undefined => {
  const isBg = environment.launchType == LaunchType.Background;
  console.log(`Fetching new data${isBg ? ' in the background' : ''}.`);

  if (isBg) return;
  else return showToast(options);
};

export async function syncShortcutKeys(): Promise<KeyList | null> {
  const now = Date.now();

  // Cooldown check
  const lastRun = await LocalStorage.getItem<string>(LAST_RUN_KEY);
  if (lastRun && now - parseInt(lastRun) < SYNC_COOLDOWN) {
    await safeShowToast({
      style: Toast.Style.Failure,
      title: "Shortcut keys sync: cooldown active",
      message: `Please wait ${Math.ceil((SYNC_COOLDOWN - (now - parseInt(lastRun))) / 1000)}s before retrying.`,
    });
    return null;
  }

  // Running lock
  const isRunning = await LocalStorage.getItem<string>(SYNC_RUNNING_KEY);
  if (isRunning === "true") {
    await safeShowToast({
      style: Toast.Style.Failure,
      title: "Shortcut keys sync: already running",
    });
    return null;
  }

  await LocalStorage.setItem(SYNC_RUNNING_KEY, "true");

  try {
    await safeShowToast({ style: Toast.Style.Animated, title: "Shortcut keys sync: started" });

    const response = await fetch(SYNC_ENDPOINT);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const values = await response.text();
    const parsed = keyListSchema.safeParse(JSON.parse(values));
    if (!parsed.success) throw new Error(`Parse error: ${parsed.error.message}`);

    await LocalStorage.setItem(SHORTCUT_KEYS, values);
    await LocalStorage.setItem(LAST_RUN_KEY, now.toString());

    await safeShowToast({
      style: Toast.Style.Success,
      title: `Shortcut keys sync: success, ${parsed.data.length} items fetched.`,
    });

    return parsed.data;
  } catch (error) {
    await safeShowToast({
      style: Toast.Style.Failure,
      title: "Shortcut keys sync: failed",
      message: String(error),
    });
    return null;
  } finally {
    await LocalStorage.removeItem(SYNC_RUNNING_KEY);
  }
}
