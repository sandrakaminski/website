import type { Image } from "../types";

export type ProductTypes = {
    content: {
        fields: {
            oldPrice: number;
            name: string;
            price: number;
            description: string;
            featureImage: Image;
            slug: string;
            productId: string;
            inStock: boolean;
            productFiles: Image[]
            nzShippingOnly: boolean;
            publishDate: string;
        }
    }
}


export default ProductTypes;