import React, { createContext, useContext, useEffect, useState } from "react";

export interface Settings {
  drawerOpen: boolean;
}

interface Context {
  settings: Settings;
  update: (fields: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  drawerOpen: false,
};

const SettingsContext = createContext<Context>({
  settings: defaultSettings,
  update: () => null,
});

export const useSettings = () => useContext(SettingsContext);

const storageKey = "settings";

const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const decoded = JSON.parse(stored);
        setSettings(decoded);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const update = (fields: Partial<Settings>) => {
    const newSettings = { ...settings, ...fields };
    localStorage.setItem(storageKey, JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
