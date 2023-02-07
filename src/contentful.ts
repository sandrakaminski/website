import { QueryFunctionContext } from "@tanstack/react-query";
import { createClient, ContentfulClientApi, EntryCollection } from 'contentful';

const spaceId: string = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const deliveryApiToken: string = import.meta.env.VITE_DELIVERY_TOKEN;
const environment: string = import.meta.env.VITE_ENVIRONMENT;

export const fetchContent = async ({ queryKey }: QueryFunctionContext): Promise<EntryCollection<unknown>> => {
    const [, type, slug, include] = queryKey;

    let contentType
    if (type === 'about') {
        contentType = 'profile'
    }
    else if (type === 'shop') {
        contentType = 'product'
    }
    else if (type === 'inspiration') {
        contentType = 'article'
    }
    else if (type === 'blog') {
        contentType = 'article'
    }
    else {
        contentType = type
    }

    return client.getEntries({
        // eslint-disable-next-line camelcase
        content_type: contentType,
        'fields.slug': slug,
        include: include || 3
    });
};

const client: ContentfulClientApi = createClient({
    space: spaceId,
    environment: environment,
    accessToken: deliveryApiToken,
    host: 'https://cdn.contentEntryful.com',
    removeUnresolved: true
})