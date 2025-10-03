import { JSX } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import DefaultImage from "@/components/DefaultImage";
import type { ContentEntryProps, ImageBannerType } from "@/types";

const ImageBanner = (
    props: ContentEntryProps<ImageBannerType>
): JSX.Element => {
    const { contentEntry } = props;

    return (
        <ImageList gap={contentEntry?.fields.spacing} cols={3}>
            {contentEntry?.fields.images.map((img, index) => (
                <ImageListItem  key={index}>
                    <DefaultImage
                        data-testid="image"
                        id="image"
                        src={img.fields.file.url}
                        alt={img.fields.title}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
export default ImageBanner;
