import React, { JSX } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import Section from ".";
import type { Content, ContentEntryProps } from "@/types";

const resources = [
    {
        fields: {
            flexDirection: "Row",
            headline: "Test resource headline",
            description: "Test resource description",
            link: "test-resource-slug",
        },
    },
    {
        fields: {
            flexDirection: "Row",
            headline: "Test resource headline 2",
            description: "Test resource description ",
            link: "test-resource-slug",
        },
    },
];

// reduce repeated fields
const directions = ["Center", "Right", "Left", "Column"];
const repeatFields = {
    image: {
        fields: {
            file: {
                url: "https://image.url",
            },
        },
    },
    headline: "Test section headline",
    ctaLabel: "Test section ctaLabel",
    ctaSlug: "test-section-cta-slug",
    body: "Test section body to see that it's working",
};

vi.mock("@/hooks", () => ({
    useImageSrc: () => ({ load: false }),
}));

const mockSectionCenter = {
    fields: {
        sectionType: directions[0],
        image: repeatFields.image,
        headline: repeatFields.headline,
        ctaLabel: repeatFields.ctaLabel,
        ctaSlug: repeatFields.ctaSlug,
        body: repeatFields.body,
    },
} as Entry<Content>;

const mockSectionRight = {
    fields: {
        sectionType: directions[1],
        image: repeatFields.image,
        headline: repeatFields.headline,
        body: repeatFields.body,
        resources,
    },
} as Entry<Content>;

const mockSectionLeft = {
    fields: {
        sectionType: directions[2],
        image: repeatFields.image,
        headline: repeatFields.headline,
        body: repeatFields.body,
        resources,
    },
} as Entry<Content>;

const mockSectionColumn = {
    fields: {
        sectionType: directions[3],
        headline: repeatFields.headline,
        resources,
    },
} as Entry<Content>;

const TestSectionComponent = (
    props: ContentEntryProps<Content>
): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Section {...props} />
            </Router>
        </QueryClientProvider>
    );
};

describe("<Section />", () => {
    test("Center Section renders correctly", async () => {
        const { getByTestId } = render(
            <TestSectionComponent contentEntry={mockSectionCenter} />
        );

        const healine = getByTestId("sectionHeadline")?.textContent;
        const ctaLabel = getByTestId("sectionCta")?.textContent;
        const ctaSlug = getByTestId("sectionCta")?.getAttribute("href");
        const sectionBody = getByTestId("sectionBody")?.textContent;
        const sectionImg = getByTestId("sectionImg");
        const styles = window.getComputedStyle(sectionImg);

        expect(styles.backgroundImage).toBe(`url("https://image.url")`);

        const navigate = screen.findByText("Test section ctaLabel");
        fireEvent.click(await navigate);

        expect(healine).toBe("Test section headline");
        expect(ctaLabel).toBe("Test section ctaLabel");
        expect(ctaSlug).toBe("test-section-cta-slug");

        expect(sectionBody).toBe("Test section body to see that it's working");
    });

    test("Right Section renders correctly", () => {
        const { getByTestId, getAllByTestId } = render(
            <TestSectionComponent contentEntry={mockSectionRight} />
        );

        const image = getByTestId("sectionImg")?.getAttribute("src");
        const healine = getByTestId("sectionHeadline")?.textContent;
        const sectionBody = getByTestId("sectionBody")?.textContent;

        expect(image).toBe("https://image.url");
        expect(healine).toBe("Test section headline");
        expect(sectionBody).toBe("Test section body to see that it's working");

        const resourceHeadline = getAllByTestId("resourceHeadline");

        expect(resourceHeadline).toHaveLength(2);
        expect(resourceHeadline[0].textContent).toBe("Test resource headline");
        expect(healine).toBe("Test section headline");
    });

    test("Left Section renders correctly", () => {
        const { getByTestId, getAllByTestId } = render(
            <TestSectionComponent contentEntry={mockSectionLeft} />
        );

        const image = getByTestId("sectionImg")?.getAttribute("src");
        const healine = getByTestId("sectionHeadline")?.textContent;
        const sectionBody = getByTestId("sectionBody")?.textContent;

        expect(image).toBe("https://image.url");
        expect(healine).toBe("Test section headline");
        expect(sectionBody).toBe("Test section body to see that it's working");

        const resourceHeadline = getAllByTestId("resourceHeadline");

        expect(resourceHeadline).toHaveLength(2);
        expect(resourceHeadline[0].textContent).toBe("Test resource headline");
        expect(healine).toBe("Test section headline");
    });

    test("Column Section renders correctly", () => {
        const { getByTestId, getAllByTestId } = render(
            <TestSectionComponent contentEntry={mockSectionColumn} />
        );

        const healine = getByTestId("sectionHeadline")?.textContent;
        const resourceHeadline = getAllByTestId("resourceHeadline");

        expect(resourceHeadline).toHaveLength(2);
        expect(resourceHeadline[0].textContent).toBe("Test resource headline");
        expect(healine).toBe("Test section headline");
    });
});
