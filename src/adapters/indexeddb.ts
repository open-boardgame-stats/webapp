import { openDB, StoreNames } from "idb";
import DB, { SettingsKeys } from "../types/DB";

const db = openDB<DB>("obgs", 1, {
  upgrade(db) {
    db.createObjectStore("settings");
  },
});

const idbAdapter = {
  async get(store: StoreNames<DB>, query: SettingsKeys) {
    return (await db).get(store, query);
  },
  async set(store: StoreNames<DB>, key: SettingsKeys, val: boolean) {
    return (await db).put(store, val, key);
  },
};

export default idbAdapter;
