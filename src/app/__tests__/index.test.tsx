import { render, screen } from "@testing-library/react";
import Home from "@/app/page"; // Импорт главной страницы

describe("Home Page", () => {
  it("renders the homepage with welcome text", () => {
    render(<Home />);
    expect(
      screen.getByText(/Welcome to Radix UI with Next\.js/i),
    ).toBeInTheDocument();
  });
});
