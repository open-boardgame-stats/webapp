import { DBSchema } from "idb";

export type SettingsKeys = "drawerOpen";

interface DB extends DBSchema {
  settings: {
    value: boolean;
    key: SettingsKeys;
  };
}

export default DB;
