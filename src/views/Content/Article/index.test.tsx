import React from "react";

import { render, screen, } from '@testing-library/react'
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Article from ".";
import { ArticleType } from "@/types";

const mockArticle = {
    fields: {
        coverImage: {
            fields: {
                file: {
                    url: "https:/image.url",
                }
            }
        },
        headline: "Test Headline",
        slug: "test-headline",
        body: "body text",
        author: {
            fields: {
                name: "Test Author",
                slug: "test-author",
            }
        },
    },
    sys: {
        id: "1234556"
    }
} as Entry<ArticleType>;


describe("<Article />", () => {
    test("renders summary view correctly", () => {
        const queryClient = new QueryClient();

        render(
            <Router>
                <QueryClientProvider client={queryClient}>
                    <Article contentEntry={mockArticle} />
                </QueryClientProvider>
            </Router>
        );

        expect(screen.queryAllByTestId("coverImage")).toBeTruthy();
        expect(screen.queryAllByTestId("headline")).toBeTruthy();
        expect(screen.queryAllByTestId("date")).toBeTruthy();
        expect(screen.queryAllByTestId("author")).toBeTruthy();

    });

    test("renders detail view correctly", () => {
        const queryClient = new QueryClient();

        render(
            <Router>
                <QueryClientProvider client={queryClient}>
                    <Article detail={true} contentEntry={mockArticle} />
                </QueryClientProvider>
            </Router>
        );
        expect(screen.queryAllByTestId("coverImage")).toBeTruthy();
        expect(screen.queryAllByTestId("headline")).toBeTruthy();



    });
})