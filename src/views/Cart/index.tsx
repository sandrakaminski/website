// import { useState } from 'react';

import { Button, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
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
                <Stack spacing={2}>
                    <Typography sx={{ height: 300 }} variant="h4" >Your cart is empty</Typography>
                    <Button variant="outlined" onClick={() => navigate("/shop")} >
                        Shop now
                    </Button>
                </Stack>
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
                    <Button variant="outlined" onClick={() => navigate("/shop")} >
                        Buy now
                    </Button>
                </>
            }
        </Stack>
    )
}

export default Payment;


// <FormControl size="small" sx={{ minWidth: 200 }}>
//     <InputLabel id="quantity">Quantity</InputLabel>
//     <Select onChange={handleChange} label="Quantity" >
//         {num.map((item: any, index: number) =>
//             <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
//         )}
//     </Select>
// </FormControl>