import React from "react";
import { render, screen } from "@testing-library/react";
import { OrdersApp } from "./OrdersApp";

test("renders learn react link", () => {
  render(<OrdersApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
