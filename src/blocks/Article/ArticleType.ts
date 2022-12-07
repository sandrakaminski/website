import type { Image } from '@/types';

export type ArticleType = {
    content: {
        fields: {
            headline: string;
            author: Author;
            name: string
            body: string;
            date: string;
            slug: string;
            coverImage: Image
        }
    }
}
type Author = {
    fields: {
        name: string;
        slug: string;
        image?: Image;
    }
}
export default ArticleType;