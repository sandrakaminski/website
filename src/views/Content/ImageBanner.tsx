import { JSX } from "react";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Asset } from "contentful";

import type { ContentEntryProps, ImageBannerType } from '@/types';

const ImageBanner = (props: ContentEntryProps<ImageBannerType>): JSX.Element => {
    const { contentEntry } = props;

    return (
        <ImageList gap={contentEntry?.fields.spacing} cols={3}>
            {contentEntry?.fields.images.map((img: Asset, index: number) =>
                <ImageListItem key={index}>
                    <img id="image" src={img.fields.file.url} alt={img.fields.title} />
                </ImageListItem>
            )}
        </ImageList>
    )
}
export default ImageBanner;