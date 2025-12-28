import { getPreferenceValues } from "@raycast/api";

export const SYNC_RUNNING_KEY = "shortcut_keys_sync_running";
export const LAST_RUN_KEY = "shortcut_keys_sync_last_ran";
export const SYNC_COOLDOWN = 5_000;

export const SHORTCUT_KEYS = "shortcut_keys_all";

export const SYNC_ENDPOINT = getPreferenceValues()["sync_endpoint"];
const REDIRECTION_ENDPOINT = getPreferenceValues()["redirection_endpoint"];

export const getRedirectionUrl = (key: string) => `${REDIRECTION_ENDPOINT}${key}`;

// https://www.fusejs.io/concepts/scoring-theory.html
export const fuseOptions = {
  isCaseSensitive: true,
  shouldSort: true,
  fieldNormWeight: 1,
  keys: ["key", "value"],
};
