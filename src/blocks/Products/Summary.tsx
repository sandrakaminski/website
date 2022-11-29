// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
// import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import ReactGA from 'react-ga4';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import type { ProductTypes } from './ProductTypes';
// import { useCartContext } from '@/views/Cart/cartProvider';

const Summary = ({ content }: ProductTypes) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();
    // const { addToCart } = useCartContext();

    // const handleCart = () => {
    //     addToCart(content.fields.productId, '1', content.fields)
    // }

    const handleClick = () => {
        navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })
        ReactGA.event({
            category: 'Product',
            action: 'View Product',
            label: content.fields.name,
        });
    }

    return (
        <Card>
            <CardActionArea onClick={() => handleClick()} >
                <SoldOutBanner soldOut={!content.fields.inStock} />
                <CardMedia loading="lazy" component="img" sx={{ height: { xs: '90vh', sm: '60vw', md: '36vw', xl: 600 }, width: { xs: 'auto', sm: '100%' } }} src={content?.fields.featureImage.fields.file.url} alt={content.fields.featureImage.fields.title} />
            </CardActionArea>
            <Stack sx={{ p: 2 }} alignItems="center" direction="column" justifyContent="center" spacing={1} >
                <Typography variant="subtitle1" >{`${content.fields.name}`}</Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    {content.fields.oldPrice &&
                        <Typography color="grayText" sx={{ textDecoration: 'line-through' }} variant="body1" >
                            ${content.fields.oldPrice.toFixed(2)}
                        </Typography>
                    }
                    <Typography variant="body1" >
                        ${content.fields.price.toFixed(2)}
                    </Typography>
                </Stack>
                {/* <Box sx={{ justifyContent: 'flex-end' }}>
                        <IconButton sx={{ position: 'relative' }} disabled={!content.fields.inStock} color="inherit" onClick={handleCart}>
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Box> */}
            </Stack>
        </Card>
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
                <Box sx={{ p: 4, background: 'rgba(255,255,255,.90)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 12 }} variant="subtitle1">SOLD OUT</Typography>
                </Box>
            }
        </>
    )
}