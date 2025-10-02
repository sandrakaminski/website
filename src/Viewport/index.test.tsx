import React, { JSX } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import Viewport from ".";
import Header from "./Header";
import { CartProvider } from "@/views/Cart/cartActions";

vi.mock("@/components/Outline", () => ({
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@tanstack/react-query", () => ({
    QueryClient: vi.fn(),
    QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
    ),
    useQuery: vi.fn(() => ({
        data: {
            items: [
                {
                    fields: {
                        references: [
                            { fields: { slug: "shop", name: "Shop" } },
                        ],
                    },
                },
            ],
        },
    })),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-router-dom")>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const TestViewportComponent = (): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Viewport>
                        <div data-testid="test-child">Test Child</div>
                    </Viewport>
                </CartProvider>
            </QueryClientProvider>
        </Router>
    );
};

const TestHeaderComponent = (): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Header />
                </CartProvider>
            </QueryClientProvider>
        </Router>
    );
};

describe("Viewport Component", () => {
    test("renders children correctly", () => {
        const { getByTestId } = render(<TestViewportComponent />);
        const testText = getByTestId("test-child")?.textContent;

        expect(testText).toBe("Test Child");
    });
});

describe("Header Component", () => {
    test("renders logo correctly", () => {
        const { getByTestId } = render(<TestHeaderComponent />);
        const logo = getByTestId("logo");

        expect(logo.getAttribute("src")).toBe("/src/assets/logo.png");

        const homeLink = getByTestId("home-link");
        fireEvent.click(homeLink);

        expect(mockNavigate).toHaveBeenCalledWith("/", {
            state: { data: "home" },
        });
    });

    test("menu items function correctly", () => {
        const { getByTestId } = render(<TestHeaderComponent />);

        const shopLink = getByTestId("nav-Shop");

        fireEvent.click(shopLink);

        expect(shopLink.textContent).toBe("Shop");

        expect(mockNavigate).toHaveBeenCalledWith("/shop", {
            state: { data: "shop" },
        });
    });
});
