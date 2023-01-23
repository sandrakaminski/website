import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from "@tanstack/react-query";
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';

// import { FeatureFlagger } from '@/Tracker';
import { useCartContext } from "@/views/Cart/cartProvider";

type CartPopperProps = {
    clickEvent: boolean;
}

const CartPopper = (props: CartPopperProps) => {
    const { clickEvent } = props;

    const { cart, amount } = useCartContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const amountTotal = amount - 1;

    const openMsg = () => {
        if (clickEvent) {
            if (cart?.length === 1 || amountTotal === 1) {
                setOpen(true)
            }
            if (cart?.length === 0 || amountTotal === 0) {
                setOpen(false)
            }
            if (cart?.length > 1 || amountTotal > 1) {
                setOpen(false)
            }
        }
        return clickEvent
    }
    useQuery([clickEvent], openMsg)

    const handleClose = () => {
        setOpen(false);
    };

    const handleContinue = () => {
        navigate('/shop');
        handleClose();
        ReactGA.event({
            category: 'Product Detail',
            action: `Continue shopping`
        });
    }

    const handleCheckout = () => {
        navigate('/cart');
        handleClose();
        ReactGA.event({
            category: 'Product Detail',
            action: `Quick purchase ${cart[0]?.name}`
        });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h5">You have selected:</Typography>
                <Stack direction="row" sx={{ mt: 2 }} >
                    <Avatar sx={{ height: 55, width: 55 }} variant="square" alt={cart[0]?.name} src={cart[0]?.image.fields.file.url} />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1">{cart[0]?.name}</Typography>
                        <Typography variant="body1">${cart[0]?.price.toFixed(2)} NZD</Typography>
                    </Box>
                </Stack>
            </Box>
            <CardActions>
                <Button onClick={handleCheckout} variant="contained">go to cart</Button>
                <Button onClick={handleContinue} variant="outlined">continue shopping</Button>
            </CardActions>
        </Dialog>
    )
}
export default CartPopper; 