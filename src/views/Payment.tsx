
import { Button, Typography, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import { useStripe, useElements, useCartElementState } from '@stripe/react-stripe-js';

// import { useLocation } from 'react-router-dom';

export const Payment = () => {
    // const { state } = useLocation()
    // const stripe = useStripe();
    // const elements = useElements();
    // const CartElement = useCartElementState();


    const handlePayment = async () => {
        try {
            const resp = await fetch("https://localhost:4242/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Zach" })
            })
            const data = resp.json()
            return data
        }
        catch (e) {
            console.log("error", e)
        }

    }

    // const total = state?.quantity * state?.data.fields.price

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} >
            <List>
                <ListItem>
                    <Typography> Product</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="h4">Total: $</Typography>
                </ListItem>
            </List>
            <Stack spacing={2}>
                <Button onClick={() => handlePayment} variant="outlined" >
                    Buy now
                </Button>
            </Stack>
        </Stack>
    )
}

export default Payment;
