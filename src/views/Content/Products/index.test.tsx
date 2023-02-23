import React from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, fireEvent } from '@testing-library/react'
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from 'vitest'

import Products, { ProductProps } from ".";
import { ProductTypes } from "@/types";

const mockProduct = {
    fields: {
        name: "Test Product",
        slug: "test-product",
        description: "Test description",
        price: 10,
        featureImage: {
            fields: {
                file: {
                    url: "https://image.url",
                }
            }
        },
        nzShippingOnly: true,
        inStock: false,
        oldPrice: 20,
        productFiles: [
            {
                fields: {
                    file: {
                        url: "https://file.url",
                    }
                }
            },
            {
                fields: {
                    file: {
                        url: "https://file2.url",
                    }
                }
            }
        ]
    }
} as Entry<ProductTypes>;

const TestProductComponent = (props: ProductProps): React.ReactElement => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <Products {...props} />
            </QueryClientProvider>
        </Router>
    )
}

describe("<Products />", () => {
    test("renders summary view correctly", async () => {
        const wrapper = render(<TestProductComponent contentEntry={mockProduct} />);
        expect(wrapper).toBeTruthy();

        const name = wrapper.container.querySelector("#productName")?.textContent;
        const price = wrapper.container.querySelector("#price")?.textContent;
        const oldPrice = wrapper.container.querySelector("#oldPrice")?.textContent;
        const featureImage = wrapper.container.querySelector("#featureImage")?.getAttribute("src");
        const soldOut = wrapper.container.querySelector("#soldOut")?.textContent;

        const navigate = screen.findByText("Test Product");
        fireEvent.click(await navigate)

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00 NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(soldOut).toBe("SOLD OUT");
    })

    // TODO add array of files to test
    test("renders full view correctly", () => {
        const wrapper = render(<TestProductComponent detail={true} contentEntry={mockProduct} />);
        expect(wrapper).toBeTruthy();

        const name = wrapper.container.querySelector("#productName")?.textContent;
        const price = wrapper.container.querySelector("#price")?.textContent;
        const oldPrice = wrapper.container.querySelector("#oldPrice")?.textContent;
        const featureImage = wrapper.container.querySelector("#featureImage")?.getAttribute("src");
        const description = wrapper.container.querySelector("#description")?.textContent;

        expect(name).toBe("Test Product");
        expect(price).toBe("$10.00NZD");
        expect(oldPrice).toBe("$20.00");
        expect(featureImage).toBe("https://image.url");
        expect(description).toBe("Test description");
    })
})