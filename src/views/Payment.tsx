
import { useStripe, useElements, useCartElementState } from '@stripe/react-stripe-js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Button, Typography, Stack, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const Payment = () => {
    const { state } = useLocation()
    const stripe = useStripe();
    const elements = useElements();
    const CartElement = useCartElementState();
    console.log(CartElement)

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
                <Button variant="outlined" >
                    Buy now
                </Button>
            </Stack>
        </Stack>
    )
}

export default Payment;
