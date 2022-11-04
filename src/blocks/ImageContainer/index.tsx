import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageContainer = ({ content }: any) => {

    return (
        <ImageList>
            {content?.fields.blocks.map((image: any, index: number) =>
                <ImageListItem key={index}>
                    <img
                        src={image.fields.image.fields.file.url}
                        alt={image.fields.image.fields.file.url}
                        loading="lazy"
                    />
                </ImageListItem>
            )}
        </ImageList>
    )
}
export default ImageContainer; 