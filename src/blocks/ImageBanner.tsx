import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import type { Image } from '@/shared';

interface ImageContainerProps {
    content: {
        fields: {
            images: Image[];
            spacing: number;
        }
    }
}

const ImageBanner = (props: ImageContainerProps) => {
    const { content } = props;

    return (
        <ImageList gap={content.fields.spacing} cols={3}>
            {content.fields.images.map((img: any, index: number) =>
                <ImageListItem key={index}>
                    <img src={img.fields.file.url} alt={img.fields.file.title} />
                </ImageListItem>
            )}
        </ImageList>
    )
}
export default ImageBanner;
