import { useEffect } from "react";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from "@/views/Cart/cartProvider";

const Cart = () => {
    const navigate = useNavigate();
    const { cart, clear, total, decrease, increase, remove }: any = useCartContext();

    return (
        <Box sx={{ my: 4 }}>
            {cart?.length === 0 ?
                <Stack alignItems="center" direction="column" spacing={2} >
                    <Stack sx={{ height: 400, mt: 4 }} spacing={2}>
                        <Typography variant="h3" align="center" gutterBottom>Shopping cart</Typography>
                        <Typography gutterBottom color="grayText" variant="h5" >You have nothing in your shopping cart.</Typography>
                        <Button variant="outlined" onClick={() => navigate("/shop")} >
                            Shop now
                        </Button>
                    </Stack>
                </Stack >
                :
                <>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="h4" >Shopping cart</Typography>
                        <Button endIcon={<CloseIcon />} onClick={clear}>Clear cart</Button>
                    </Stack>
                    <List sx={{ width: '100%' }} >
                        {cart?.map((item: any, index: number) =>
                            <ListItem secondaryAction={
                                <AmountButtons increase={() => increase(item.id)} remove={() => remove(item.id)} amount={item} decrease={() => decrease(item.id)} />
                            } key={index}>
                                <ListItemButton sx={{ maxWidth: "90%" }} onClick={() => navigate(`/shop/${item.slug}`)}>
                                    <ListItemAvatar>
                                        <Avatar variant="square" alt={item.name} src={item.image.fields.file.url} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={`$${item.price}`} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Stack alignItems="flex-end" direction="column" spacing={2} >
                        <Typography variant="subtitle1">Total: ${total}</Typography>
                        <Button variant="outlined" onClick={() => navigate("/payment")} >
                            Buy now
                        </Button>
                    </Stack>
                </>
            }
        </Box>

    )
}

export default Cart;

const AmountButtons = (props: any) => {
    const { decrease, increase, amount, remove } = props;

    useEffect(() => {
        if (amount.amount.length === undefined || amount.amount.length === 0) {
            remove();
        }
    }, [amount.amount.length, remove])

    return (
        <Stack direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <IconButton onClick={decrease} size="small">
                <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Chip variant="outlined" label={amount.amount.length} />
            <IconButton onClick={increase} size="small">
                <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={remove} size="small">
                <CloseIcon color="error" fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
