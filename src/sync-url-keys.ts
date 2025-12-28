import { syncShortcutKeys } from "./utils/sync";

export default async function Command() {
  await syncShortcutKeys();
}
