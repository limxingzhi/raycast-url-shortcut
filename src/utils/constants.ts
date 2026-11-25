import { getPreferenceValues } from "@raycast/api";

export const SYNC_RUNNING_KEY = "shortcut_keys_sync_running";
export const LAST_RUN_KEY = "shortcut_keys_sync_last_ran";
export const SYNC_COOLDOWN = 5_000;

export const SHORTCUT_KEYS = "shortcut_keys_all";

const preferences = getPreferenceValues<Preferences>();

export const SYNC_ENDPOINT = preferences.sync_endpoint;
const REDIRECTION_ENDPOINT = preferences.redirection_endpoint;

export const EDIT_ENDPOINT = preferences.edit_endpoint;
export const getEditUrl = (key: string) => {
  return `${EDIT_ENDPOINT}?k=${key}`;
};
export const DELETE_ENDPOINT = preferences.delete_endpoint;
export const getDeleteUrl = (key: string) => `${DELETE_ENDPOINT}?Key=${key}`;

export const USE_REDIRECTION = preferences.use_302_redirection;
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
