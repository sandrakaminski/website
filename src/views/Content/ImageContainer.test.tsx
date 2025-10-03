import { JSX } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import ImageContainer from "./ImageContainer";
import type { ContentEntryProps, ImageContainerProps } from "@/types";

const mockImageBanner = {
    fields: {
        blocks: [
            {
                fields: {
                    imageRows: 2,
                    title: "Test Image Container",
                    subheader: "Test Subheader",
                    slug: "test-image-container",
                    image: {
                        fields: {
                            file: {
                                url: "https://image.url",
                            },
                        },
                    },
                },
            },
            {
                fields: {
                    imageRows: 2,
                    title: "Test 2 Image Container",
                    subheader: "Test 2 Subheader",
                    slug: "test2-image-container",
                    image: {
                        fields: {
                            file: {
                                url: "https://image2.url",
                            },
                        },
                    },
                },
            },
        ],
    },
} as Entry<ImageContainerProps>;

vi.mock("@/hooks", () => ({
    useImageSrc: () => ({ load: false }),
}));

const TestImageBannerComponent = (
    props: ContentEntryProps<ImageContainerProps>
): JSX.Element => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Router>
                <ImageContainer {...props} />
            </Router>
        </QueryClientProvider>
    );
};

describe("<ImageContainer />", () => {
    test("renders correctly", async () => {
        const { getAllByTestId } = render(
            <TestImageBannerComponent contentEntry={mockImageBanner} />
        );

        const image = getAllByTestId("image");
        expect(image[0]?.getAttribute("src")).toBe("https://image.url");

        const imgArr = getAllByTestId("image");
        expect(imgArr.length).toBe(2);

        const title = getAllByTestId("title");
        expect(title[0]?.textContent).toBe("Test Image Container");

        const subheader = getAllByTestId("subheader");
        expect(subheader[0]?.textContent).toBe("Test Subheader");

        const navigate = screen.findByText("Test Image Container");
        fireEvent.click(await navigate);
    });
});
