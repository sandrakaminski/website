import { QueryFunctionContext } from "@tanstack/react-query";
import { createClient, ContentfulClientApi, EntryCollection } from 'contentful';

const client: ContentfulClientApi = createClient({
    space: import.meta.env.VITE_SPACE_ID,
    environment: import.meta.env.VITE_ENVIRONMENT,
    accessToken: import.meta.env.VITE_DELIVERY_TOKEN,
    host: 'cdn.contentful.com',
    removeUnresolved: true
})

const preview: ContentfulClientApi = createClient({
    space: import.meta.env.VITE_SPACE_ID,
    environment: import.meta.env.VITE_ENVIRONMENT,
    accessToken: import.meta.env.VITE_PREVIEW_TOKEN,
    host: 'preview.contentful.com',
    // removeUnresolved: true
})

export const fetchContent = async ({ queryKey }: QueryFunctionContext): Promise<EntryCollection<unknown>> => {
    const [name, type, slug, include] = queryKey;

    if (name === 'content') {
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
