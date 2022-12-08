// consistent image type
export type Image = {
    fields: {
        file: {
            url: string;
            title?: string;
        }
        title: string;
        description?: string;
    }
}

// used for profile/article/product components
export type BlockProps = {
    detail: boolean;
    content: {
        fields: {
            slug: string;
            body: string;
            otherImages: Image[];
            image: Image;
            headline: string;
            author: Author;
            name: string;
            title: string;
            date: string;
            coverImage: Image;
            oldPrice: number;
            price: number;
            description: string;
            featureImage: Image;
            productId: string;
            inStock: boolean;
            productFiles: Image[]
            nzShippingOnly: boolean;
            publishDate: string;
        }
    }
}
type Author = {
    fields: {
        name: string;
        slug: string;
    }
}