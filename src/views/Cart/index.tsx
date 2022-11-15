import { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

import CountryDropdown, { CurrencyExchange, shippingID } from '@/components/PaymentCalc';
import { useCartContext } from "@/views/Cart/cartProvider";

const Cart = () => {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState<boolean>(false);
    const [country, setCountry] = useState<string>("");
    const { cart, clear, decrease, increase, remove }: any = useCartContext();
    const Shipping = shippingID(country);

    const handlePurchase = async () => {
        setProcessing(true)
        const res = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_STRIPE_TEST_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: country,
                shippingId: Shipping,
                orderItems: cart?.map((item: any) => {
                    return {
                        productId: item.id,
                        quantity: item.amount.length
                    }
                })
            })
        });
        try {
            const data = await res.json();
            window.location.replace(data.url);
        }
        catch (error: any) {
            setProcessing(false);
            console.log(error);
        }
    }

    return (
        <Box sx={{ my: 4 }}>
            {cart && cart.length === 0 ?
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

                    <Stack sx={{ mt: 4 }} >
                        {cart && cart.map((item: any, index: number) =>
                            <Grid sx={{ my: 1 }} spacing={2} container direction="row" justifyContent="space-between" alignItems="center" key={index}>
                                <Grid onClick={() => navigate(`/shop/${item.slug}`)} component={ListItemButton} xs={12} sm={8}  >
                                    <Avatar sx={{ height: 55, width: 55 }} variant="square" alt={item.name} src={item.image.fields.file.url} />
                                    <Box sx={{ ml: 2 }}>
                                        <Typography variant="subtitle1">{item.name}</Typography>
                                        <Typography variant="body1">${item.price}</Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={12} sm={4} >
                                    <Stack direction="row" justifyContent={{ xs: 'space-between', sm: "flex-end" }} alignItems="center" spacing={4}>
                                        <AmountButtons increase={() => increase(item.id)} remove={() => remove(item.id)} amount={item} decrease={() => decrease(item.id)} />
                                        <Button startIcon={<CloseIcon fontSize="inherit" />} color="error" onClick={() => remove(item.id)} >
                                            Remove
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        )}
                    </Stack>

                    <Divider sx={{ my: 2 }} />
                    <Stack alignItems="flex-end" spacing={2} >
                        <CurrencyExchange country={country} />
                        <CountryDropdown label={"Country"} id={"country"} value={country} onChange={(e: any) => setCountry(e.target.value)} />
                        <LoadingButton size="large" disabled={!country} variant="outlined" loading={processing} onClick={handlePurchase}>Buy now </LoadingButton>
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
        </Stack>
    );
}
