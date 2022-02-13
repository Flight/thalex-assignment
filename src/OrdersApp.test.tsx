import React from "react";
import { render, screen } from "@testing-library/react";
import { OrdersApp } from "./OrdersApp";

test("renders learn react link", () => {
  render(<OrdersApp />);
  expect(screen.getByText("Thalex Front-End Developer Technical Assignment Solution")).toBeInTheDocument();
});
