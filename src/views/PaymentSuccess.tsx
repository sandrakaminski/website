import { useEffect } from "react";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { useCartContext } from "@/views/Cart/cartProvider";

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
    const { clear, cart } = useCartContext();
    useEffect(() => {
        if (cart?.length > 0) {
            clear()
        }
    }, [clear, cart, navigate]);

    return (
        <Stack spacing={2} sx={{ mt: 10 }} alignItems="center" justifyContent="center">
            <CheckCircleIcon sx={{ fontSize: 100, color: "success.main" }} />
            <Typography variant="h3" align="center" gutterBottom>Payment success</Typography>
            <Typography gutterBottom color="grayText" variant="h5" >Thank you for your purchase.</Typography>
            <Button variant="outlined" onClick={() => navigate("/shop")} >Return Home</Button>
        </Stack>
    )
}
export default PaymentSuccess;