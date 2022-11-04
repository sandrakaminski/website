import type { Image } from '../../shared';

export type ArticleType = {
    content: {
        fields: {
            author: Author;
            name: string;
            title: string;
            body: string;
            date: string;
            slug: string;
            coverImage: Image
        }
    }
    sys?: {
        id: string;
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