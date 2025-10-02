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
        const wrapper = render(
            <TestProductComponent contentEntry={mockProductNotInstock} />
        );

        const name =
            wrapper.container.querySelector("#productName")?.textContent;
        const price = wrapper.container.querySelector("#price")?.textContent;
        const oldPrice =
            wrapper.container.querySelector("#oldPrice")?.textContent;
        const featureImage = wrapper.container
            .querySelector("#featureImage")
            ?.getAttribute("src");
        const soldOut =
            wrapper.container.querySelector("#sold-out")?.textContent;

        const navigate = screen.findByText("Test Product");
        fireEvent.click(await navigate);

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00 NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(soldOut).toBe("SOLD OUT");
    });

    test("renders summary view correctly for the in stock state", async () => {
        const wrapper = render(
            <TestProductComponent contentEntry={mockProductInstock} />
        );

        const name =
            wrapper.container.querySelector("#productName")?.textContent;
        const price = wrapper.container.querySelector("#price")?.textContent;
        const oldPrice =
            wrapper.container.querySelector("#oldPrice")?.textContent;
        const featureImage = wrapper.container
            .querySelector("#featureImage")
            ?.getAttribute("src");
        const soldOut =
            wrapper.container.querySelector("#sold-out")?.textContent;

        const navigate = screen.findByText("Test Product");
        fireEvent.click(await navigate);

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00 NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(soldOut).toBeUndefined();
    });

    test("renders summary view correctly for the new product state", async () => {
        const wrapper = render(
            <TestProductComponent contentEntry={mockNewProduct} />
        );

        const name =
            wrapper.container.querySelector("#productName")?.textContent;
        const price = wrapper.container.querySelector("#price")?.textContent;
        const oldPrice =
            wrapper.container.querySelector("#oldPrice")?.textContent;
        const featureImage = wrapper.container
            .querySelector("#featureImage")
            ?.getAttribute("src");
        const newProduct =
            wrapper.container.querySelector("#new-product")?.textContent;

        const navigate = screen.findByText("Test Product");
        fireEvent.click(await navigate);

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00 NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(newProduct).toBe("NEW");
    });

    // TODO add array of files to test
    test("renders full view correctly", () => {
        const wrapper = render(
            <CartProvider>
                <TestProductComponent
                    detail={true}
                    contentEntry={mockProductNotInstock}
                />
            </CartProvider>
        );

        const name =
            wrapper.container.querySelector("#productName")?.textContent;
        const price = wrapper.container.querySelector("#price")?.textContent;
        const oldPrice =
            wrapper.container.querySelector("#oldPrice")?.textContent;
        const featureImage = wrapper.container
            .querySelector("#featureImage")
            ?.getAttribute("src");
        const description =
            wrapper.container.querySelector("#description")?.textContent;

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(description).toBe("Test description");
    });
});
