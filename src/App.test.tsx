import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import db from "./adapters/indexeddb";

it("Is able to navigate to Secret Hitler match creation form", () => {
  const { getByText, getAllByText } = render(<App />);
  const games = getByText(/Games/i);
  games.click();
  const hitler = getAllByText(/Secret Hitler/i);
  hitler[0].click();
  const addMatch = getByText(/Add a match/i);
  addMatch.click();

  const saveGame = getByText(/Save game/i);
  expect(saveGame).toBeInTheDocument();
});

describe("App settings: drawer", () => {
  beforeAll(() => {
    db.set("settings", "drawerOpen", true);
  });

  it("has the drawer open", () => {
    const { getByTestId } = render(<App />);
    const drawer = getByTestId("menu-drawer");
    expect(drawer.className).toMatch(/drawerOpen/);
  });

  it("saves the drawer state to indexeddb", async () => {
    const { getByTestId } = render(<App />);
    const button = getByTestId("drawer-toggle-button");
    button.click();
    const drawer = getByTestId("menu-drawer");
    expect(drawer.className).toMatch(/drawerClose/);

    const stored = await db.get("settings", "drawerOpen");
    expect(stored).toBeFalsy();
  });
});
