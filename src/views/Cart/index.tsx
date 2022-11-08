import { useEffect } from "react";

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from "@/views/Cart/cartProvider";

export const Payment = () => {
    const navigate = useNavigate();
    const { cart, clear, total, decrease, increase, remove } = useCartContext();

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
                    <List sx={{ width: '100%' }} >
                        {cart?.map((item: any, index: number) =>
                            <ListItem secondaryAction={<AmountButtons increase={() => increase(item.id)} remove={() => remove(item.id)} amount={item} decrease={() => decrease(item.id)} />} key={index}>
                                <ListItemButton onClick={() => navigate(`/shop/${item.slug}`)}>
                                    <ListItemAvatar>
                                        <Avatar variant="square" alt={item.name} src={item.image.fields.file.url} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={`$${item.price}`} />
                                </ListItemButton>
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
        </Stack >
    )
}

export default Payment;

const AmountButtons = (props: any) => {
    const { decrease, increase, amount, remove } = props;

    useEffect(() => {
        if (amount.amount.length === undefined || amount.amount.length === 0) {
            remove();
        }
    }, [amount.amount.length, remove])

    return (
        <Stack direction="row">
            <IconButton onClick={decrease} size="small">
                <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Typography>{amount.amount.length > 0 ? amount.amount.length : 0}</Typography>
            <IconButton onClick={increase} size="small">
                <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={remove} size="small">
                <DeleteForeverIcon color="error" fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
