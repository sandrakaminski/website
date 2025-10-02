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
        const wrapper = render(
            <TestProfileComponent contentEntry={mockProfile} />
        );
        expect(wrapper).toBeTruthy();

        const name =
            wrapper.container.querySelector("#profileName")?.textContent;
        const coverImg = wrapper.container
            .querySelector("#profileImage")
            ?.getAttribute("src");
        const body =
            wrapper.container.querySelector("#profileBody")?.textContent;

        const navigate = screen.findByText("Test Name");
        expect(navigate).toBeTruthy();
        fireEvent.click(await navigate);

        expect(name).toBe("Test Name");
        expect(coverImg).toBe("https://image.url");
        expect(body).toBe("Test body to check it's working");
    });

    test("renders full view correctly", () => {
        const wrapper = render(
            <TestProfileComponent detail={true} contentEntry={mockProfile} />
        );
        expect(wrapper).toBeTruthy();

        const title = wrapper.container.querySelector("#title")?.textContent;
        const coverImg = wrapper.container
            .querySelector("#profileImage")
            ?.getAttribute("src");
        const body = wrapper.container.querySelector("#body")?.textContent;
        const otherImg = wrapper.container
            .querySelector("#otherImages")
            ?.getAttribute("src");
        const otherImgDescription = wrapper.container.querySelector(
            "#otherImgDescription"
        )?.textContent;

        const imgLength =
            wrapper.container.querySelectorAll("#otherImages").length;
        const otherImgDescriptionLength = wrapper.container.querySelectorAll(
            "#otherImgDescription"
        ).length;
        expect(imgLength).toBe(2);
        expect(otherImgDescriptionLength).toBe(2);

        expect(title).toBe("About Test Profile");
        expect(coverImg).toBe("https://image.url");
        expect(body).toBe("Test body to check it's working");
        expect(otherImg).toBe("https://other-images1.url");
        expect(otherImgDescription).toBe("Test description");
    });
});
