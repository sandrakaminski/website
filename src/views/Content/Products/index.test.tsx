import { JSX } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import Products, { ProductProps } from ".";
import { ProductTypes } from "@/types";
import { CartProvider } from "@/views/Cart/cartActions";

const productInfo = {
    name: "Test Product",
    slug: "test-product",
    description: "Test description",
    price: 10,
    featureImage: {
        fields: {
            file: {
                url: "https://image.url",
            },
        },
    },
    nzShippingOnly: true,
    oldPrice: 20,
    productFiles: [
        {
            fields: {
                file: {
                    url: "https://file.url",
                },
            },
        },
        {
            fields: {
                file: {
                    url: "https://file2.url",
                },
            },
        },
    ],
};

vi.mock("@/hooks", () => ({
    useImageSrc: () => ({ load: false }),
    useFetchEntries: () => ({
        loading: false,
        error: {
            message: "",
            state: false,
        },
        response: [],
        handleGet: vi.fn(),
        rerender: vi.fn(),
    }),
    useCreateSubmission: () => ({
        submitting: false,
        error: {
            message: "",
            state: false,
        },
        submitted: false,
        createSubmission: vi.fn(),
    }),
}));

const mockProductNotInstock = {
    fields: {
        inStock: false,
        ...productInfo,
    },
} as Entry<ProductTypes>;

const mockProductInstock = {
    fields: {
        inStock: true,
        ...productInfo,
    },
} as Entry<ProductTypes>;

const mockNewProduct = {
    fields: {
        inStock: true,
        ...productInfo,
        newProduct: true,
    },
} as Entry<ProductTypes>;

const TestProductComponent = (props: ProductProps): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <Products {...props} />
            </QueryClientProvider>
        </Router>
    );
};

describe("<Products />", () => {
    test("renders summary view correctly for the out of stock state", async () => {
        const { getByTestId } = render(
            <TestProductComponent contentEntry={mockProductNotInstock} />
        );

        const name = getByTestId("productName")?.textContent;
        const price = getByTestId("price")?.textContent;
        const oldPrice = getByTestId("oldPrice")?.textContent;
        const featureImage = getByTestId("featureImage")?.getAttribute("src");
        const soldOut = getByTestId("sold-out")?.textContent;

        const navigate = screen.findByText("Test Product");
        fireEvent.click(await navigate);

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00 NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(soldOut).toBe("SOLD OUT");
    });

    test("renders summary view correctly for the in stock state", async () => {
        const { getByTestId, container } = render(
            <TestProductComponent contentEntry={mockProductInstock} />
        );

        const name = getByTestId("productName")?.textContent;
        const price = getByTestId("price")?.textContent;
        const oldPrice = getByTestId("oldPrice")?.textContent;
        const featureImage = getByTestId("featureImage")?.getAttribute("src");

        // sold out banner should not be present
        const soldOut = container.querySelector("#sold-out")?.textContent;

        const navigate = screen.findByText("Test Product");
        fireEvent.click(await navigate);

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00 NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");

        expect(soldOut).toBeUndefined();
    });

    test("renders summary view correctly for the new product state", async () => {
        const { getByTestId } = render(
            <TestProductComponent contentEntry={mockNewProduct} />
        );

        const name = getByTestId("productName")?.textContent;
        const price = getByTestId("price")?.textContent;
        const oldPrice = getByTestId("oldPrice")?.textContent;
        const featureImage = getByTestId("featureImage")?.getAttribute("src");
        const newProduct = getByTestId("new-product")?.textContent;

        const navigate = screen.findByText("Test Product");
        fireEvent.click(await navigate);

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00 NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(newProduct).toBe("NEW");
    });

    test("renders full view correctly", () => {
        const { getByTestId, getAllByTestId } = render(
            <CartProvider>
                <TestProductComponent
                    detail={true}
                    contentEntry={mockProductNotInstock}
                />
            </CartProvider>
        );

        const name = getByTestId("productName")?.textContent;
        const price = getByTestId("price")?.textContent;
        const oldPrice = getByTestId("oldPrice")?.textContent;
        const featureImage = getByTestId("featureImage")?.getAttribute("src");
        const description = getByTestId("description")?.textContent;
        const productFiles = getAllByTestId("productFiles");

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(description).toBe("Test description");
        expect(productFiles.length).toBe(2);

        expect(productFiles[0]?.getAttribute("src")).toBe("https://file.url");
        expect(productFiles[1]?.getAttribute("src")).toBe("https://file2.url");


    });
});
