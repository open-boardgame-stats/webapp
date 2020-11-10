export const importStorage = (jsonString: string, key = "amongUs") => {
  try {
    const json = JSON.parse(jsonString);
    if (!Array.isArray(json)) {
      throw new Error("wrong format");
    }
    localStorage.setItem(key, jsonString);
  } catch (e) {
    console.error(`unknown format: ${jsonString}\n`, e);
  }
};

export const saveNewMatch = (match: object, key = "amongUs") => {
  const json = getStorage(key);
  json.push(match);
  importStorage(JSON.stringify(json));
};

export const getStorageString = (key = "amongUs"): string =>
  localStorage.getItem(key) || "";

export const getStorage = (key = "amongUs") =>
  JSON.parse(getStorageString() || "[]");
