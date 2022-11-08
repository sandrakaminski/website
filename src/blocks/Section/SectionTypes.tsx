import type { Image } from '@/shared';

export type Content = {
    content: {
        fields: {
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