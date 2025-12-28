import { List, LocalStorage, ActionPanel, Action } from "@raycast/api";
import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";

import {
  getRedirectionUrl,
  SHORTCUT_KEYS,
  fuseOptions,
  USE_REDIRECTION,
  EDIT_ENDPOINT,
  DELETE_ENDPOINT,
  getEditUrl,
  getDeleteUrl,
} from "./utils/constants";
import { syncShortcutKeys } from "./utils/sync";
import { keyListSchema, KeyList } from "./utils/schema";

export default function ShortcutKeysCommand() {
  const [keys, setKeys] = useState<KeyList>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const fuse = useMemo(() => new Fuse(keys, fuseOptions), [keys]);
  const filteredKeys = useMemo<KeyList>(() => {
    return searchText.length > 0 ? fuse.search(searchText).map(({ item }) => item) : keys;
  }, [searchText, fuse]);

  useEffect(() => {
    async function fetchKeys() {
      const storedKeys = await LocalStorage.getItem<string>(SHORTCUT_KEYS);
      if (storedKeys) {
        try {
          const parsed = keyListSchema.parse(JSON.parse(storedKeys));
          setKeys(parsed);
        } catch {
          setKeys([]);
        }
      }

      if (!storedKeys) {
        const newKeys = await syncShortcutKeys();
        if (newKeys) setKeys(newKeys);
      }
      setLoading(false);
    }

    fetchKeys();
  }, []);

  return (
    <List
      searchText={searchText}
      onSearchTextChange={setSearchText}
      isLoading={loading}
      navigationTitle="Search Shortcut Keys"
    >
      <List.Section title={"URL Shortener"}>
        {filteredKeys.map((item, index) => (
          <List.Item
            key={item.key + "_" + index}
            title={item.key}
            subtitle={item.value}
            accessories={[{ text: item.description }]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser
                  title="Open URL"
                  url={USE_REDIRECTION ? getRedirectionUrl(item.key) : item.value}
                />
                {Boolean(EDIT_ENDPOINT) && (
                  <Action.OpenInBrowser title="Edit URL" url={decodeURIComponent(getEditUrl(item.key))} />
                )}

                {Boolean(DELETE_ENDPOINT) && <Action.OpenInBrowser title="Delete URL" url={getDeleteUrl(item.key)} />}
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
