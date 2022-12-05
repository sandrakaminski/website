import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

import LoadingImage from '@/components/LoadingImage';
import type { Image } from '@/shared'

interface ImageContainerProps {
    content: {
        fields: {
            blocks: Block[];
        };
    };
}

type Block = {
    fields: {
        imageRows: number;
        image: Image;
        title: string;
        subheader: string;
        slug: string;
    };
};

const ImageContainer = (props: ImageContainerProps) => {
    const { content } = props;
    const navigate = useNavigate();

    return (
        <ImageList gap={8} >
            {content.fields.blocks.map((img: Block, index: number) =>
                <ImageListItem sx={{ img: { minHeight: 500 } }} rows={img.fields.imageRows} component={CardActionArea} onClick={() => navigate(img.fields.slug)} key={index}>
                    <FloatingText content={img} />
                    <LoadingImage
                        sx={{ height: '100%' }}
                        skeletonheight={600}
                        src={img.fields.image.fields.file.url}
                        alt={`image ${index}`}
                    />
                </ImageListItem>
            )}
        </ImageList>
    )
}
export default ImageContainer;

type FloatingTextProps = {
    content: {
        fields: {
            title: string;
            subheader: string;
        };
    };
};

const FloatingText = (props: FloatingTextProps) => {
    const { content } = props;

    return (
        <Box sx={{ height: '100%', width: '100%', background: 'rgba(0,0,0,0.10)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h2" gutterBottom sx={{ color: 'background.paper' }}>{content.fields.title}</Typography>
            <Typography variant="body1" sx={{ display: { xs: 'none', md: 'flex' }, color: 'background.paper' }}>{content.fields.subheader}</Typography>
        </Box>
    )
}
