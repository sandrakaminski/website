import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import type { ProductTypes } from './ProductTypes';
import { useCartContext } from '@/views/Cart/cartProvider';

export const Summary = ({ content }: ProductTypes) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();
    const { addToCart } = useCartContext();

    const handleCart = () => {
        addToCart(content.fields.productId, '1', content.fields)
    }

    return (
        <Grid xs={12} sm={6} >
            <Card>
                <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })} >
                    <SoldOutBanner soldOut={!content.fields.inStock} />
                    <CardMedia loading="lazy" component="img" sx={{ height: { xs: 'auto', sm: '60vw', lg: '100vh' } }} src={content?.fields.featureImage.fields.file.url} alt={content.fields.featureImage.fields.title} />
                </CardActionArea>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ p: 1 }}>
                    <Box>
                        <Typography variant="button" sx={{ fontSize: 10 }}>{`${content.fields.name}`}</Typography>
                        {/* <Typography >{`$${content.fields.price.toFixed(2)}`}</Typography> */}
                    </Box>
                    <IconButton disabled={!content.fields.inStock} color="inherit" onClick={handleCart}>
                        <AddShoppingCartIcon />
                    </IconButton>
                </Stack>
            </Card>
        </Grid>
    );
}
export default Summary;

type SoldOutType = {
    soldOut: boolean
}

const SoldOutBanner = (props: SoldOutType) => {
    const { soldOut } = props;

    return (
        <>
            {soldOut &&
                <Box sx={{ p: 2, background: 'rgba(255,255,255,.75)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 12 }} variant="subtitle1">SOLD OUT</Typography>
                </Box>
            }
        </>
    )
}