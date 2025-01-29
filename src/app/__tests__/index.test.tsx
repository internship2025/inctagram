import { render, screen } from "@testing-library/react";
import Home from "@/app/page"; // Импорт главной страницы

describe("Home Page", () => {
    it("renders the homepage with welcome text", () => {
        render(<Home />);
        expect(screen.getByText(/welcome to next\.js/i)).toBeInTheDocument();
    });
});