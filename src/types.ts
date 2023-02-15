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

// product
export type ProductTypes = {
    oldPrice: number;
    name: string;
    price: number;
    description: string;
    featureImage: Asset;
    slug: string;
    productId: string;
    inStock: boolean;
    productFiles: Asset[]
    nzShippingOnly: boolean;
    publishDate: string;
}

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

export type ProductItems = {
    inStock: boolean;
    slug: string;
    id: string;
    name: string;
    price: number;
    amount: number[];
    image: Asset;
    nzShippingOnly: boolean;
    category: string;
}
