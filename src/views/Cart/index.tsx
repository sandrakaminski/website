import { Button, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from "@/views/Cart/cartProvider";

export const Payment = () => {
    const navigate = useNavigate();
    // const stripe = useStripe();
    // const elements = useElements();
    const { cart, clear, total } = useCartContext();

    console.log(cart)

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} >
            {cart?.length === 0 ?
                <Typography variant="h4" >Your cart is empty</Typography>
                :
                <>
                    <Typography variant="h4" >Your cart</Typography>
                    <List sx={{ width: '50%' }} >
                        {cart?.map((item: any, index: number) =>
                            <ListItem secondaryAction={item.amount.length > 0 ? item.amount.length : 0} onClick={() => navigate(`/shop/${item.slug}`)} component={ListItemButton} key={index}>
                                <ListItemAvatar>
                                    <Avatar variant="square" alt={item.name} src={item.image.fields.file.url} />
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={`$${item.price}`} />
                            </ListItem>
                        )}
                    </List>
                    <Button onClick={clear}>Clear cart</Button>
                    <Typography variant="h4">Total: ${total}</Typography>
                </>
            }

            <Stack spacing={2} sx={{ minHeight: 300 }}>
                <Button variant="outlined" onClick={() => navigate("/shop")} >
                    Buy now
                </Button>
            </Stack>
        </Stack>
    )
}

export default Payment;
