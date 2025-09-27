/// <reference types="vitest" />
/**
 * Unit tests for DashboardPage component (UI-focused)
 *
 * @example
 * pnpm test:unit
 */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DashboardPage } from "../index";

/**
 * Render helper
 * @returns The rendered component
 */
function renderWithRouter() {
  return render(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  );
}

describe("DashboardPage", () => {
  it("renders greeting and primary CTA", () => {
    renderWithRouter();
    expect(screen.getByText(/welcome back, alex!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start call campaign/i })).toBeInTheDocument();
  });

  it("shows overview section and stat cards", () => {
    renderWithRouter();
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
    expect(screen.getByText(/active calls/i)).toBeInTheDocument();
    expect(screen.getByText(/scheduled calls/i)).toBeInTheDocument();
    expect(screen.getByText(/completed calls/i)).toBeInTheDocument();
    expect(screen.getByText(/success rate/i)).toBeInTheDocument();
    expect(screen.getByText(/ai confidence score/i)).toBeInTheDocument();
  });

  it("renders activity feed items", () => {
    renderWithRouter();
    expect(screen.getByText(/campaign launched/i)).toBeInTheDocument();
    expect(screen.getAllByText(/new member/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/agents updated/i)).toBeInTheDocument();
  });
});