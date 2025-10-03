import { JSX } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import Article, { ArticleTypes } from ".";
import { ArticleType } from "@/types";

const mockArticle = {
    fields: {
        coverImage: {
            fields: {
                file: {
                    url: "https://image.url",
                },
            },
        },
        headline: "Test Headline",
        slug: "test-headline",
        body: "Test body to check it's working",
        author: {
            fields: {
                name: "Test Author",
                slug: "test-author",
            },
        },
        date: "2021-08-01",
    },
    sys: {
        id: "1234556",
    },
} as Entry<ArticleType>;

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

const TestArticleComponent = (props: ArticleTypes): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <Article {...props} />
            </QueryClientProvider>
        </Router>
    );
};

describe("<Article />", () => {
    test("renders summary view correctly", async () => {
        const { getByTestId } = render(
            <TestArticleComponent contentEntry={mockArticle} />
        );

        const headline = getByTestId("headline")?.textContent;
        const coverImg = getByTestId("coverImage")?.getAttribute("src");
        const date = getByTestId("date")?.textContent;
        const author = getByTestId("author")?.textContent;
        const navigate = screen.findByText("Test Headline");
        fireEvent.click(await navigate);

        expect(screen.queryAllByTestId("coverImage")).toBeTruthy();

        expect(headline).toBe("Test Headline");
        expect(coverImg).toBe("https://image.url");
        expect(date).toBe("1 August 2021");
        expect(author).toBe("Test Author");
    });

    test("renders detail view correctly", () => {
       const { getByTestId } = render(
           <TestArticleComponent detail={true} contentEntry={mockArticle} />
       );

        const headline = getByTestId("headline")?.textContent;
        const coverImg = getByTestId("coverImage")?.getAttribute("src");
        const date = getByTestId("date")?.textContent;
        const author = getByTestId("author")?.textContent;
        const body = getByTestId("body")?.textContent;

        expect(headline).toBe("Test Headline");
        expect(coverImg).toBe("https://image.url");
        expect(date).toBe("1 August 2021");
        expect(author).toBe("Test Author");
        expect(body).toBe("Test body to check it's working");
    });
});
