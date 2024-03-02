import { QueryFunctionContext } from "@tanstack/react-query";
import { createClient, ContentfulClientApi, EntryCollection } from "contentful";

const createContentfulClient = (accessToken: string, host: string): ContentfulClientApi => {
    return createClient({
        space: import.meta.env.VITE_SPACE_ID,
        environment: import.meta.env.VITE_ENVIRONMENT,
        accessToken,
        host,
    });
};

const client = createContentfulClient(
    import.meta.env.VITE_DELIVERY_TOKEN,
    "cdn.contentful.com"
);

const preview = createContentfulClient(
    import.meta.env.VITE_PREVIEW_TOKEN,
    "preview.contentful.com"
);

export const fetchContent = async ({ queryKey }: QueryFunctionContext): Promise<EntryCollection<unknown>> => {
    const [name, type, slug, include] = queryKey;

    if (name === "content") {
        return await client.getEntries({
            // eslint-disable-next-line camelcase
            content_type: type,
            'fields.slug': slug,
            include: include || 3
        });
    } else {
        return await preview.getEntries({
            // eslint-disable-next-line camelcase
            content_type: type,
            'fields.slug': slug,
            include: include || 3
        });
    }
};
