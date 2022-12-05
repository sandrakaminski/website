import { useState } from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import ReactGA from 'react-ga4';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import CartPopper from './CartPopper';
import type { ProductTypes } from './ProductTypes';
import { LoadingImage } from '@/components/Outline';
import { FeatureFlagger } from '@/Tracker';
import { useCartContext } from '@/views/Cart/cartProvider';

const Summary = (props: ProductTypes) => {
    const { content } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();

    const handleClick = () => {
        navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })
        ReactGA.event({
            category: 'Product',
            action: `View detail for ${content.fields.name}`,
            label: content.fields.name,
        });
    }

    return (
        <Card sx={{ width: '100%' }} >
            <CardActionArea onClick={() => handleClick()} >
                <SoldOutBanner soldOut={!content.fields.inStock} />
                <LoadingImage
                    card
                    src={content?.fields.featureImage.fields.file.url}
                    alt={content.fields.featureImage.fields.title} />
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
                        ${content.fields.price.toFixed(2)} NZD
                    </Typography>
                </Stack>
            </Stack>
            <QuickAdd content={content} />
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
                <Box sx={{ p: 4, background: 'rgba(255,255,255,.80)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="subtitle1">SOLD OUT</Typography>
                </Box>
            }
        </>
    )
}

const QuickAdd = (props: ProductTypes) => {
    const { content } = props;
    const { addToCart } = useCartContext();

    const [clickEvent, setClickEvent] = useState<boolean>(false);

    const handleCart = () => {
        setClickEvent(true);
        addToCart(content.fields.productId, '1', content.fields);
        ReactGA.event({
            category: 'Product',
            action: `Quick add ${content.fields.name} to cart`,
            label: content.fields.name,
        });
    }

    return (
        <FeatureFlagger>
            <Stack alignItems="flex-end" justifyContent="flex-end">
                <Fab size={'medium'} sx={{ position: 'absolute', zIndex: 1, m: 1 }} color="primary" disabled={!content.fields.inStock} onClick={handleCart} >
                    <AddShoppingCartIcon />
                </Fab >
            </Stack >
            <CartPopper clickEvent={clickEvent} />
        </FeatureFlagger>
    )
}