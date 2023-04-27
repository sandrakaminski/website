import React from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, fireEvent } from '@testing-library/react'
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from 'vitest'

import ImageContainer from "./ImageContainer";
import type { ContentEntryProps, ImageContainerProps } from '@/types';

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
                            }
                        }
                    }
                }
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
                            }
                        }
                    }
                }
            }
        ]
    }
} as Entry<ImageContainerProps>;

const TestImageBannerComponent = (props: ContentEntryProps<ImageContainerProps>): JSX.Element => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Router>
                <ImageContainer {...props} />
            </Router>
        </QueryClientProvider>
    )
}

describe("<ImageContainer />", () => {
    test("renders correctly", async () => {
        const wrapper = render(<TestImageBannerComponent contentEntry={mockImageBanner} />);
        expect(wrapper).toBeTruthy();

        const image = wrapper.container.querySelector("#image")?.getAttribute("src");
        expect(image).toBe("https://image.url");

        const imgArr = wrapper.container.querySelectorAll("#image");
        expect(imgArr.length).toBe(2);

        const title = wrapper.container.querySelector("#title")?.textContent;
        expect(title).toBe("Test Image Container");

        const subheader = wrapper.container.querySelector("#subheader")?.textContent;
        expect(subheader).toBe("Test Subheader");

        const navigate = screen.findByText("Test Image Container");
        fireEvent.click(await navigate)
    })
})
