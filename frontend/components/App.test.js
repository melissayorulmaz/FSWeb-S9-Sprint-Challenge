import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppFunctional from "../frontend/components/AppFunctional";

test("Başlık doğru görünüyor mu?", () => {
  render(<AppFunctional />);
  const titleElement = screen.getByText(/Koordinatlar/i);
  expect(titleElement).toBeInTheDocument();
});

test("Butonlar doğru görünüyor mu?", () => {
  render(<AppFunctional />);
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(5);
});

test("Başlık metni doğru değişiyor mu?", () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText("email girin");
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput).toHaveValue("test@example.com");
});

test("Görünür metinler doğru görünüyor mu?", () => {
  render(<AppFunctional />);
  const coordinatesText = screen.getByText(/Koordinatlar/i);
  const stepsText = screen.getByText(/0 kere ilerlediniz/i);
  const messageText = screen.getByText(/Sunucu hatası/i);
  expect(coordinatesText).toBeInTheDocument();
  expect(stepsText).toBeInTheDocument();
  expect(messageText).toBeInTheDocument();
});

test("Başlık metni doğru değişiyor mu?", () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText("email girin");
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput).toHaveValue("test@example.com");
});
