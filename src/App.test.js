import React, { Children } from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";

test("renders Login Tab", () => {
  const { getByText } = render(
    <Router>
      <Route component={App} />
    </Router>
  );
  const linkElement = getByText(/Login/i);
  console.log(linkElement);
  expect(linkElement).toBeInTheDocument();
});
