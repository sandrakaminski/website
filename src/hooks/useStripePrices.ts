import { useQuery } from "@tanstack/react-query";

export type StripePricesResponse = {
    prices: Record<string, number>;
};

type UseStripePricesArgs = {
    productIds: string[];
    currency: string;
};

/** Fetches Stripe currency_options. Skips the network for NZD (use Contentful). */
export const useStripePrices = ({
    productIds,
    currency,
}: UseStripePricesArgs) => {
    const sortedIds = [...productIds].sort();
    const isNzd = !currency || currency.toUpperCase() === "NZD";

    return useQuery({
        queryKey: ["stripe-prices", currency, sortedIds],
        enabled: !isNzd && sortedIds.length > 0,
        queryFn: async (): Promise<StripePricesResponse> => {
            const resp = await fetch("/.netlify/functions/prices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currency: currency.toLowerCase(),
                    productIds: sortedIds,
                }),
            });
            if (!resp.ok) {
                throw new Error("Failed to fetch Stripe prices");
            }
            return resp.json();
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};
