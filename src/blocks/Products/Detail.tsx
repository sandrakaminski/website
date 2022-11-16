import { useState } from 'react';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import ReactMarkdown from 'react-markdown';

import type { ProductTypes } from './ProductTypes';
import Trail from '@/components/Trail';
import { Markdown } from '@/shared';
import { useCartContext } from "@/views/Cart/cartProvider";

export const Detail = (props: ProductTypes) => {
    const { content } = props;
    const { addToCart }: any = useCartContext();

    const [image, setImage] = useState<string>(content.fields.featureImage.fields.file.url);

    const handleCart = () => {
        addToCart(content.fields.productId, '1', content.fields)
    }

    const handleSetImage = (img: any) => {
        setImage(img.fields.file.url)
    }

    return (
        <>
            <Trail current={content.fields.name} />
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 10 }}  >
                <Grid xs={12} md={5}>
                    <Stack spacing={4} justifyContent="center" alignItems="center">
                        <Typography align="center" gutterBottom variant="h2">
                            {content.fields.name}
                        </Typography>
                        <Typography gutterBottom variant="h4" >
                            ${content.fields.price}
                        </Typography>
                        <ReactMarkdown components={Markdown} >{content.fields.description}</ReactMarkdown>
                        <Button size="large" disabled={!content.fields.inStock} onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant={"outlined"}>
                            {!content.fields.inStock ? "Sold out" : "Add to Cart"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid xs={12} md={7}>
                    {content.fields.featureImage &&
                        <CardMedia
                            sx={{ height: 800 }}
                            loading="lazy"
                            component="img"
                            src={image}
                            alt={"Feature image"}
                        />
                    }
                    {content.fields.productFiles &&
                        <Grid justifyContent="center" container >
                            {content.fields.productFiles.map((image: any, index: number) =>
                                <Grid key={index}  >
                                    <Avatar onClick={() => handleSetImage(image)} component={CardActionArea} sx={{ width: 50, height: 80 }} variant="square" src={image.fields.file.url} alt={image.fields.title} />
                                </Grid>
                            )}
                        </Grid>
                    }
                </Grid>
            </Grid >
        </>
    );
}
export default Detail;