import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from 'vitest';

import Resource, { ResourceProps } from './Resource';
import type { ResourceType } from '@/types';

const mockResource = {
    fields: {
        flexDirection: "Column",
        files: [
            {
                fields: {
                    file: {
                        url: "https://file.url",
                    },
                    title: "Test file title"
                }
            },
            {
                fields: {
                    file: {
                        url: "https://file2.url",
                    },
                    title: "Test file 2 title"
                }
            }
        ]
    }
} as ResourceType;

const mockResourceFlex = {
    fields: {
        flexDirection: "Flex",
        files: [
            {
                fields: {
                    file: {
                        url: "https://file.url",
                    },
                    title: "Test file title"
                }
            },
            {
                fields: {
                    file: {
                        url: "https://file2.url",
                    },
                    title: "Test file 2 title"
                }
            }
        ]
    }
} as ResourceType;

const TestResourceComponent = (props: ResourceProps) => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <Resource {...props} />
            </QueryClientProvider>
        </Router>
    )
}

describe("<Resource />", () => {
    test("Flex resource correctly", () => {
        const { container } = render(<TestResourceComponent resource={mockResourceFlex} />);
        expect(container).toBeTruthy();

        const file = container.querySelector("#resourceItem")?.getAttribute("href");
        expect(file).toBe("https://file.url");

        const fileTitle = container.querySelector("#resourceItem")?.textContent;
        expect(fileTitle).toBe("Test file title");

        const fileArr = container.querySelectorAll("#resourceItem");
        expect(fileArr.length).toBe(2);
    });

    test("Column resource correctly", () => {
        const { container } = render(<TestResourceComponent resource={mockResource} />);
        expect(container).toBeTruthy();

        const file = container.querySelector("#resourceItem")?.getAttribute("href");
        expect(file).toBe("https://file.url");

        const fileTitle = container.querySelector("#resourceItem")?.textContent;
        expect(fileTitle).toBe("Test file title");

        const fileArr = container.querySelectorAll("#resourceItem");
        expect(fileArr.length).toBe(2);
    });
})