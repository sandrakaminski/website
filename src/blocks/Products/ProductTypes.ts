import type { Image } from "@/shared";

export type ProductTypes = {
    content: {
        fields: {
            name: string;
            price: number;
            description: string;
            featureImage: Image;
            slug: string;
        }
    }
}
export default ProductTypes;