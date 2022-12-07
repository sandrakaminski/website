import type { Image } from '@/types';

export type Content = {
    content: {
        fields: {
            ctaLabel?: string;
            ctaSlug?: string;
            body: string;
            image: Image;
            headline: string;
            sectionType: string;
            resources: ResourceType[];
        }
    }
}

export type ResourceType = {
    fields: {
        flexDirection: string;
        headline: string;
        description: string;
        link: string;
        files: Image[];
    }
}