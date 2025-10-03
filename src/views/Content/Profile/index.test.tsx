import { JSX } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { Entry } from "contentful";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import Profile, { BlockProps } from ".";
import { ProfileType } from "@/types";

const mockProfile = {
    fields: {
        title: "About Test Profile",
        slug: "test-profile",
        body: "Test body to check it's working",
        name: "Test Name",
        image: {
            fields: {
                file: {
                    url: "https://image.url",
                },
            },
        },
        otherImages: [
            {
                fields: {
                    file: {
                        url: "https://other-images1.url",
                    },
                    description: "Test description",
                },
            },
            {
                fields: {
                    file: {
                        url: "https://other-images2.url",
                    },
                    description: "Test description 2",
                },
            },
        ],
    },
} as Entry<ProfileType>;

vi.mock("@/hooks", () => ({
    useImageSrc: () => ({ load: false }),
}));

const TestProfileComponent = (props: BlockProps): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <Profile {...props} />
            </QueryClientProvider>
        </Router>
    );
};

describe("<Profile />", () => {
    test("renders summary view correctly", async () => {
        const { getByTestId } = render(
            <TestProfileComponent contentEntry={mockProfile} />
        );

        const name = getByTestId("profileName")?.textContent;
        const coverImg = getByTestId("profileImage")?.getAttribute("src");
        const body = getByTestId("profileBody")?.textContent;

        const navigate = screen.findByText("Test Name");
        fireEvent.click(await navigate);

        expect(name).toBe("Test Name");
        expect(coverImg).toBe("https://image.url");
        expect(body).toBe("Test body to check it's working");
    });

    test("renders full view correctly", () => {
        const { getByTestId, getAllByTestId } = render(
            <TestProfileComponent detail={true} contentEntry={mockProfile} />
        );

        const title = getByTestId("title")?.textContent;
        const coverImg = getByTestId("profileImage")?.getAttribute("src");
        const body = getByTestId("body")?.textContent;

        const otherImages = getAllByTestId("otherImages");
        const otherImgDescription = getAllByTestId("otherImgDescription");

        expect(otherImages.length).toBe(2);
        expect(otherImages[0].getAttribute("src")).toBe(
            "https://other-images1.url"
        );
        expect(otherImages[1].getAttribute("src")).toBe(
            "https://other-images2.url"
        );
        expect(otherImgDescription.length).toBe(2);
        expect(otherImgDescription[0].textContent).toBe("Test description");
        expect(otherImgDescription[1].textContent).toBe("Test description 2");

        expect(title).toBe("About Test Profile");
        expect(coverImg).toBe("https://image.url");
        expect(body).toBe("Test body to check it's working");
    });
});
