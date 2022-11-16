import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

import type { Image } from '@/shared'

interface ImageContainerProps {
    content: {
        fields: {
            blocks: Block[]
        }
    }
}

type Block = {
    fields: {
        imageRows: number
        image: Image
    }
}

export const ImageContainer = (props: ImageContainerProps) => {
    const { content } = props;
    const navigate = useNavigate();

    return (
        <ImageList gap={8} >
            {content.fields.blocks.map((image: any, index: number) =>
                <ImageListItem rows={image.fields.imageRows} component={CardActionArea} onClick={() => navigate(image.fields.slug)} key={index}>
                    <FloatingText content={image} />
                    {image.fields.image.fields.file.url ?
                        <img
                            src={image.fields.image.fields.file.url}
                            alt={image.fields.image.fields.file.title}
                            loading="lazy"
                        />
                        :
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    }
                </ImageListItem>
            )}
        </ImageList>
    )
}
export default ImageContainer;

const FloatingText = (props: FloatingTextProps) => {
    const { content } = props;

    return (
        <Box sx={{ height: '100%', width: '100%', background: 'rgba(0,0,0,0.10)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1" gutterBottom sx={{ color: 'background.paper' }}>{content.fields.title}</Typography>
            <Typography variant="h5" sx={{ display: { xs: 'none', md: 'flex' }, color: 'background.paper' }}>{content.fields.subheader}</Typography>
        </Box>
    )
}

type FloatingTextProps = {
    content: {
        fields: {
            title: string
            subheader: string
        }
    }
}