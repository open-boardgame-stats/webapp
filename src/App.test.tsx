import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

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
