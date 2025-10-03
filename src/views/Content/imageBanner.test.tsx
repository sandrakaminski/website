import { JSX } from "react";

import { render } from "@testing-library/react";
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import ImageBanner from "./ImageBanner";
import type { ContentEntryProps, ImageBannerType } from "@/types";

const mockImageBanner = {
    fields: {
        images: [
            {
                fields: {
                    file: {
                        url: "https://image.url",
                    },
                },
            },
            {
                fields: {
                    file: {
                        url: "https://image2.url",
                    },
                },
            },
        ],
    },
} as Entry<ImageBannerType>;

vi.mock("@/hooks", () => ({
    useImageSrc: () => ({ load: false }),
}));

const TestImageBannerComponent = (
    props: ContentEntryProps<ImageBannerType>
): JSX.Element => {
    return (
        <Router>
            <ImageBanner {...props} />
        </Router>
    );
};

describe("<ImageBanner />", () => {
    test("renders correctly", () => {
        const { getAllByTestId } = render(
            <TestImageBannerComponent contentEntry={mockImageBanner} />
        );

        const image = getAllByTestId("image");
        expect(image[0]?.getAttribute("src")).toBe("https://image.url");

        const imgArr = getAllByTestId("image");
        expect(imgArr.length).toBe(2);
    });
});
