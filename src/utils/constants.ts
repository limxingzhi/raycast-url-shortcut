import { getPreferenceValues } from "@raycast/api";

export const SYNC_RUNNING_KEY = "shortcut_keys_sync_running";
export const LAST_RUN_KEY = "shortcut_keys_sync_last_ran";
export const SYNC_COOLDOWN = 5_000;

export const SHORTCUT_KEYS = "shortcut_keys_all";

export const SYNC_ENDPOINT = getPreferenceValues()["sync_endpoint"];
const REDIRECTION_ENDPOINT = getPreferenceValues()["redirection_endpoint"];

export const EDIT_ENDPOINT = getPreferenceValues()["edit_endpoint"];
export const getEditUrl = (key: string, value: string, description?: string) =>
  `${EDIT_ENDPOINT}?Key=${key}&Value=${value}&Description=${description ?? ""}`;
export const DELETE_ENDPOINT = getPreferenceValues()["delete_endpoint"];
export const getDeleteUrl = (key: string) => `${DELETE_ENDPOINT}?Key=${key}`;

export const USE_REDIRECTION = getPreferenceValues()["use_302_redirection"];
export const getRedirectionUrl = (key: string) => `${REDIRECTION_ENDPOINT}?k=${key}`;

// https://www.fusejs.io/concepts/scoring-theory.html
export const fuseOptions = {
  isCaseSensitive: true,
  shouldSort: true,
  fieldNormWeight: 1,
  keys: [
    { name: "key", weight: 0.7 },
    { name: "value", weight: 0.1 },
    { name: "description", weight: 0.2 },
  ],
};
