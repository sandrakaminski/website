import type { Image } from "@/shared";

export type ProductTypes = {
    content: {
        fields: {
            name: string;
            price: number;
            description: string;
            featureImage: Image;
            slug: string;
            productId: string;
        }
    }
}
export default ProductTypes;