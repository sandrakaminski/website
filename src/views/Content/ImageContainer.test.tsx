import React from "react";

import { render } from '@testing-library/react'
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from 'vitest'

import ImageBanner from "./ImageBanner";
import type { ContentEntryProps, ImageBannerType } from '@/types';

const mockImageBanner = {
    fields: {
        images: [
            {
                fields: {
                    file: {
                        url: "https://image.url",
                    }
                }
            },
            {
                fields: {
                    file: {
                        url: "https://image2.url",
                    },
                }
            }
        ]
    }
} as Entry<ImageBannerType>;

const TestImageBannerComponent = (props: ContentEntryProps<ImageBannerType>) => {
    return (
        <Router>
            <ImageBanner {...props} />
        </Router>
    )
}

describe("<ImageBanner />", () => {
    test("renders correctly", () => {
        const wrapper = render(<TestImageBannerComponent contentEntry={mockImageBanner} />);
        expect(wrapper).toBeTruthy();

        const image = wrapper.container.querySelector("#image")?.getAttribute("src");
        expect(image).toBe("https://image.url");

        const imgArr = wrapper.container.querySelectorAll("#image");
        expect(imgArr.length).toBe(2);
    })
})