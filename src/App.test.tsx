import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the Welcome message", () => {
  const { getByText } = render(<App />);
  const welcomeElement = getByText(/welcome/i);
  expect(welcomeElement).toBeInTheDocument();
});
