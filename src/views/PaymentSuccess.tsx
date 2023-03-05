import React from "react";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useCartContext } from "@/views/Cart/cartProvider";

const PaymentSuccess = (): React.ReactElement => {
    const navigate = useNavigate();
    const { clear, cart } = useCartContext();

    useQuery([cart?.length > 0], clear); 

    return (
        <Stack spacing={2} sx={{ my: 10 }} alignItems="center" justifyContent="center">
            <CheckCircleIcon sx={{ fontSize: 100, color: "success.main" }} />
            <Typography variant="h3" align="center" gutterBottom>Payment successful</Typography>
            <Typography color="grayText" align="center"  >  Thank you for your purchase. <br /> Please check your inbox and spam folder for your confirmation email. </Typography>
            <Button size="large" variant="contained" onClick={() => navigate("/shop")} >Return Home</Button>
        </Stack>
    )
}
export default PaymentSuccess;