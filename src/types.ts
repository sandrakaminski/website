import { Asset, Entry, Sys } from "contentful";

export type MenuEntry = {
    references: Entry<MenuItemEntry>[]
};

export type MenuItemEntry = {
    name: string;
    slug: string;
}

export type AssemblyEntry = {
    references: Entry<AssemblyEntry | ProductTypes | ImageBannerType | Content | ProfileType | ImageContainerProps | ArticleType>[]
    layout: string;
};

export type AnyEntry = AssemblyEntry | ProductTypes | ImageBannerType | Content | ProfileType | ImageContainerProps | ArticleType

export type ContentEntryProps<T> = {
    contentEntry: Entry<T>;
    detail?: boolean;
    sys?: Sys;
}

// image banner
export type ImageBannerType = {
    images: Asset[];
    spacing: number;
}

// section 
export type Content = {
    ctaLabel?: string;
    ctaSlug?: string;
    body: string;
    image: Asset;
    headline: string;
    sectionType: string;
    resources: ResourceType[];
}

export type ResourceType = Entry<{
    flexDirection: string;
    headline: string;
    description: string;
    link: string;
    files: Asset[];
}>

// profile 
export type ProfileType = {
    slug?: string;
    title: string;
    name: string;
    headline: string;
    body: string;
    otherImages: Asset[];
    image: Asset
}

// image container
export type ImageContainerProps = {
    blocks: Entry<{
        imageRows: number;
        image: Asset;
        title: string;
        subheader: string;
        slug: string;
    }>[];
}

export type ImageItem = Entry<{
    imageRows: number;
    image: Asset;
    title: string;
    subheader: string;
    slug: string;
}>

// article 
export type ArticleType = {
    headline: string;
    author: Entry<{
        name: string;
        slug: string;
    }>;
    name: string
    body: string;
    date: string;
    slug: string;
    coverImage: Asset
}

// works in the scope of the product in the cart
export type ProductTypes = {
    inStock: boolean;
    newProduct?: boolean;
    slug: string;
    productId: string;
    name: string;
    price: number;
    amount: number[];
    featureImage: Asset;
    nzShippingOnly: boolean;
    category: string;
    max: number;
    oldPrice: number;
    description: string;
    productFiles: Asset[]
    publishDate: string;
}

// state that is used in the cart
export type CartState = {
    cart: ProductTypes[];
    amount: number;
    total: number;
};