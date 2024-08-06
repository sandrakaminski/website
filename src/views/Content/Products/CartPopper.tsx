import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";

import { useCartContext } from "@/views/Cart/cartActions";

const CartPopper = (props: { clickEvent: boolean }): JSX.Element => {
    const { clickEvent } = props;

    const { state } = useCartContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const amountTotal = state.amount - 1;

    const openMsg = (): boolean => {
        if (clickEvent) {
            if (amountTotal === 0) {
                setOpen(true);
            }
        }
        return clickEvent;
    };
    useQuery({ queryKey: [clickEvent], queryFn: openMsg });

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleContinue = (): void => {
        navigate("/shop");
        handleClose();
        ReactGA.event({
            category: "Product Detail",
            action: `Continue shopping`,
        });
    };

    const handleCheckout = (): void => {
        navigate("/cart");
        handleClose();
        ReactGA.event({
            category: "Product Detail",
            action: `Quick purchase ${state.cart[0]?.name}`,
        });
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h5">You have selected:</Typography>
                <Stack direction="row" sx={{ mt: 2 }}>
                    <Avatar
                        sx={{ height: 55, width: 55 }}
                        variant="square"
                        alt={state.cart[0]?.name}
                        src={state.cart[0]?.featureImage.fields.file.url}
                    />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1">
                            {state.cart[0]?.name}
                        </Typography>
                        <Typography variant="body1">
                            ${state.cart[0]?.price.toFixed(2)} NZD
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <CardActions>
                <Button onClick={handleCheckout} variant="contained">
                    go to cart
                </Button>
                <Button onClick={handleContinue} variant="outlined">
                    continue shopping
                </Button>
            </CardActions>
        </Dialog>
    );
};
export default CartPopper;
