import React from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react'
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from 'vitest'

import Section from ".";
import type { Content, ContentEntryProps } from '@/types';

// reduce repeated fields
const directions = ['Center', 'Right', 'Left', 'Column'];
const repeatFields = {
    image: {
        fields: {
            file: {
                url: "https://image.url",
            }
        }
    },
    headline: 'Test section headline',
    ctaLabel: 'Test section ctaLabel',
    ctaSlug: 'test-section-cta-slug',
    body: "Test section body to see that it's working"
};

vi.mock("@/functions/useImgSrc", () => ({
    useImageSrc: () => ({ load: false }),
}));

const mockSectionCenter = {
    fields: {
        sectionType: directions[0],
        image: repeatFields.image,
        headline: repeatFields.headline,
        ctaLabel: repeatFields.ctaLabel,
        ctaSlug: repeatFields.ctaSlug,
        body: repeatFields.body
    }
} as Entry<Content>;

const mockSectionRight = {
    fields: {
        sectionType: directions[1],
        image: repeatFields.image,
        headline: repeatFields.headline,
        body: repeatFields.body
    }
} as Entry<Content>;

const mockSectionLeft = {
    fields: {
        sectionType: directions[2],
        image: repeatFields.image,
        headline: repeatFields.headline,
        body: repeatFields.body
    }
} as Entry<Content>;

const mockSectionColumn = {
    fields: {
        sectionType: directions[3],
        headline: repeatFields.headline,
    }
} as Entry<Content>;

const TestSectionComponent = (props: ContentEntryProps<Content>): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Section {...props} />
            </Router>
        </QueryClientProvider>
    )
};

describe("<Section />", () => {
    test("Center Section renders correctly", async () => {
        const wrapper = render(<TestSectionComponent contentEntry={mockSectionCenter} />);
        expect(wrapper).toBeTruthy();

        const image = wrapper.container.querySelector("#sectionImg")?.getAttribute("src");
        const healine = wrapper.container.querySelector("#sectionHeadline")?.textContent;
        const ctaLabel = wrapper.container.querySelector("#sectionCta")?.textContent;
        const ctaSlug = wrapper.container.querySelector("#sectionCta")?.getAttribute("href");
        const sectionBody = wrapper.container.querySelector("#sectionBody")?.textContent;

        const navigate = screen.findByText("Test section ctaLabel");
        expect(navigate).toBeTruthy();
        fireEvent.click(await navigate)

        expect(image).toBe("https://image.url");
        expect(healine).toBe("Test section headline");
        expect(ctaLabel).toBe("Test section ctaLabel");
        expect(ctaSlug).toBe("test-section-cta-slug");

        expect(sectionBody).toBe("Test section body to see that it's working");
    });

    test("Right Section renders correctly", () => {
        const wrapper = render(<TestSectionComponent contentEntry={mockSectionRight} />);
        expect(wrapper).toBeTruthy();

        const image = wrapper.container.querySelector("#sectionImg")?.getAttribute("src");
        const healine = wrapper.container.querySelector("#sectionHeadline")?.textContent;
        const sectionBody = wrapper.container.querySelector("#sectionBody")?.textContent;

        expect(image).toBe("https://image.url");
        expect(healine).toBe("Test section headline");
        expect(sectionBody).toBe("Test section body to see that it's working");
    });

    test("Left Section renders correctly", () => {
        const wrapper = render(<TestSectionComponent contentEntry={mockSectionLeft} />);
        expect(wrapper).toBeTruthy();

        const image = wrapper.container.querySelector("#sectionImg")?.getAttribute("src");
        const healine = wrapper.container.querySelector("#sectionHeadline")?.textContent;
        const sectionBody = wrapper.container.querySelector("#sectionBody")?.textContent;

        expect(image).toBe("https://image.url");
        expect(healine).toBe("Test section headline");
        expect(sectionBody).toBe("Test section body to see that it's working");
    });

    test("Column Section renders correctly", () => {
        const wrapper = render(<TestSectionComponent contentEntry={mockSectionColumn} />);
        expect(wrapper).toBeTruthy();

        const healine = wrapper.container.querySelector("#sectionHeadline")?.textContent;
        expect(healine).toBe("Test section headline");
    });

})