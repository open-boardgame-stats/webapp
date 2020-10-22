import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the Hitler message", () => {
  const { getByText } = render(<App />);
  const hitlerElement = getByText(/Hitler/i);
  expect(hitlerElement).toBeInTheDocument();
});
