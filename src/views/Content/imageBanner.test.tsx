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
        const wrapper = render(
            <TestImageBannerComponent contentEntry={mockImageBanner} />
        );

        const image = wrapper.container
            .querySelector("#image")
            ?.getAttribute("src");
        expect(image).toBe("https://image.url");

        const imgArr = wrapper.container.querySelectorAll("#image");
        expect(imgArr.length).toBe(2);
    });
});
