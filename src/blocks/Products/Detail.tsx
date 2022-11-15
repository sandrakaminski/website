import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
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

    const handleCart = () => {
        addToCart(content.fields.productId, '1', content.fields)
    }

    return (
        <>
            <Trail current={content.fields.name} />
            <Grid container spacing={2} justifyContent="center"  >
                <Grid xs={12} md={6}>
                    <Typography sx={{ my: 4 }} align="center" gutterBottom variant="h2">
                        {content.fields.name}
                    </Typography>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Typography >
                            ${content.fields.price}
                        </Typography>

                        <Button disabled={!content.fields.inStock} onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant={"outlined"}>
                            {!content.fields.inStock ? "Sold out" : "Add to Cart"}
                        </Button>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <ReactMarkdown components={Markdown} >{content.fields.description}</ReactMarkdown>
                </Grid>
                <Grid xs={12} md={6}>
                    {content.fields.featureImage &&
                        <CardMedia
                            loading="lazy"
                            component="img"
                            src={content?.fields.featureImage.fields.file.url}
                            alt={content.fields.featureImage.fields.title}
                        />
                    }
                </Grid>
            </Grid >
        </>
    );
}
export default Detail;