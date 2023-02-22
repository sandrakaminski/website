import React from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from 'vitest'

import Article, { ArticleTypes } from ".";
import { ArticleType } from "@/types";

const mockArticle = {
    fields: {
        coverImage: {
            fields: {
                file: {
                    url: "https://image.url",
                }
            }
        },
        headline: "Test Headline",
        slug: "test-headline",
        body: "Test body to check it's working",
        author: {
            fields: {
                name: "Test Author",
                slug: "test-author",
            }
        },
        date: "2021-08-01",
    },
    sys: {
        id: "1234556"
    }
} as Entry<ArticleType>;

const TestArticleComponent = (props: ArticleTypes) => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <Article {...props} />
            </QueryClientProvider>
        </Router>
    )
}


describe("<Article />", () => {
    test("renders summary view correctly", () => {

        const wrapper = render(<TestArticleComponent contentEntry={mockArticle} />);
        expect(wrapper).toBeTruthy();

        const headline = wrapper.container.querySelector("#headline")?.textContent;
        const coverImg = wrapper.container.querySelector("#coverImage")?.getAttribute("src");
        const date = wrapper.container.querySelector("#date")?.textContent;
        const author = wrapper.container.querySelector("#author")?.textContent;

        expect(screen.queryAllByTestId("coverImage")).toBeTruthy();
        
        expect(headline).toBe("Test Headline");
        expect(coverImg).toBe("https://image.url");
        expect(date).toBe(" 1 August 2021");
        expect(author).toBe("Test Author");

    });

    test("renders detail view correctly", () => {

        const wrapper = render(<TestArticleComponent detail={true} contentEntry={mockArticle} />);
        expect(wrapper).toBeTruthy();

        const headline = wrapper.container.querySelector("#headline")?.textContent;
        const coverImg = wrapper.container.querySelector("#coverImage")?.getAttribute("src");
        const date = wrapper.container.querySelector("#date")?.textContent;
        const author = wrapper.container.querySelector("#author")?.textContent;
        const body = wrapper.container.querySelector("#body")?.textContent;

        expect(headline).toBe("Test Headline");
        expect(coverImg).toBe("https://image.url");
        expect(date).toBe(" 1 August 2021");
        expect(author).toBe("Test Author");
        expect(body).toBe("Test body to check it's working");

    });
})