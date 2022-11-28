import { useEffect, useState, useCallback } from "react";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RemoveIcon from '@mui/icons-material/Remove';
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

import Notifier from "@/components/Notifier";
import CountryDropdown, { CurrencyExchange, shippingCosts, currencyTypes, countriesList } from '@/components/PaymentCalc';
import type { Image } from '@/shared';
import { useCartContext } from "@/views/Cart/cartProvider";

type Items = {
    inStock: boolean;
    slug: string;
    id: string;
    name: string;
    price: number;
    amount: number[];
    image: Image;
    nzShippingOnly: boolean;
}

type OrderItems = {
    id: string;
    amount: number[];
}

type Prices = {
    shipping: any;
    total: any;
}

type IpItems = {
    countryName: string;
    countryCode: string;
}

const Cart = () => {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState<boolean>(false);
    const [nzOnly, setNzOnly] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [disable, setDisable] = useState<boolean>(true);
    const [country, setCountry] = useState<string>("");
    const [loadVals, setLoadVals] = useState<IpItems>({
        countryName: "",
        countryCode: "",
    });
    const [amount, setAmount] = useState<Prices>({
        shipping: 0,
        total: 0
    });

    const { cart, clear, decrease, increase, remove } = useCartContext();
    const shippingCost = shippingCosts(country);
    const cartQuantity = cart.map((item: Items) => item.amount.length).reduce((a: number, b: number) => a + b, 0);
    const shippingTotal = shippingCost * cartQuantity;
    const currency = currencyTypes(country).toLowerCase();

    const handleSetCountry = (val: string) => {
        localStorage.setItem("country", val);
        setCountry(val);
    }

    const getData = useCallback(async () => {
        try {
            const res = await axios.get('http://geolocation-db.com/json/');
            const { country_name, country_code } = res.data;
            setLoadVals({
                countryName: country_name,
                countryCode: country_code,
            });
            if (countriesList[country_code] === undefined) {
                setError(true);
                handleSetCountry("NZ");
                setLoading(false);
            }
            handleSetCountry(country_code);
            setLoading(false);
        }
        catch {
            handleSetCountry("NZ");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cart.length === 0) {
            localStorage.removeItem("country");
        }
        else if (cart && cart.map((item: Items) => item.nzShippingOnly).includes(true)) {
            handleSetCountry("NZ");
            setLoading(false);
            setNzOnly(true);
        }
        else {
            const memorisedCountry: string = localStorage.getItem("country") || "";
            setNzOnly(false);
            if (memorisedCountry === "") {
                getData();
            }
            else {
                setCountry(memorisedCountry);
                setLoading(false);
            }
        }
    }, [cart, country, getData]);

    // this is to keep shipping prices consistent between Chile/Japan and everywhere else
    let shipping;
    if (!amount.shipping) {
        shipping = '';
    }
    else {
        if (country === "CL" || country === "JP") {
            shipping = amount.shipping.toFixed(0)
        }
        else {
            shipping = amount.shipping.toFixed(2) * 100
        }
    }

    const data = {
        country: country,
        currency: currency,
        shipping: parseInt(shipping),
        orderItems: cart?.map((item: OrderItems) => {
            return {
                productId: item.id,
                quantity: item.amount.length
            }
        })
    }

    const handlePurchase = async () => {
        setProcessing(true)
        const resp = await fetch(`/.netlify/functions/payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (resp.ok) {
            const { url } = await resp.json();
            window.location.replace(url);
        }
        else {
            setProcessing(false);
        }
    }

    return (
        <Box sx={{ my: 4 }}>
            {cart && cart.length === 0 ?
                <Stack sx={{ mt: 10 }} justifyContent="space-between" alignItems="center" spacing={2} >
                    <ProductionQuantityLimitsIcon sx={{ fontSize: 100 }} />
                    <Typography variant="h3" align="center" gutterBottom>Shopping cart</Typography>
                    <Typography gutterBottom color="grayText" variant="h5" >You have nothing in your shopping cart.</Typography>
                    <Button variant="outlined" onClick={() => navigate("/shop")} >
                        Shop now
                    </Button>
                </Stack >
                :
                <>
                    <Grid alignItems="stretch" spacing={1} container >
                        <Grid xs={12} md={8} >
                            <Card sx={{ p: 2, minHeight: 250 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <Typography variant="h4" >Shopping cart</Typography>
                                    <Button endIcon={<CloseIcon />} onClick={clear}>Clear cart</Button>
                                </Stack>
                                <Stack sx={{ mt: 4 }} >
                                    {cart.map((item: Items, index: number) =>
                                        <CartItem key={index} item={item} increase={increase} decrease={decrease} remove={remove} />
                                    )}
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid xs={12} md={4} >
                            <Stack component={Card} sx={{ height: '100%', p: 2 }} direction="column" justifyContent="space-between" spacing={2} >
                                <Stack spacing={1}>
                                    <Typography variant="h4" >Order summary</Typography>
                                    <CurrencyExchange setDisable={setDisable} setAmount={setAmount} amount={amount} shippingCosts={shippingTotal} country={country} />
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography gutterBottom color="grayText" variant="caption">Country of delivery</Typography>
                                    <ButtonGroup size="small">
                                        <CountryDropdown loading={loading} disabled={nzOnly} label={"Country"} id={"country"} value={country} onChange={(e: any) => handleSetCountry(e.target.value)} />
                                        <LoadingButton size="small" sx={{ width: 200, ml: 1 }} disabled={disable} variant="outlined" loading={processing} onClick={handlePurchase}>Buy now</LoadingButton>
                                    </ButtonGroup>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Notifier open={error} message={`We don't currently offer shipping to ${loadVals.countryName}`} />
                </>
            }
        </Box>
    )
}

export default Cart;

type CartItemProps = {
    item: Items
    increase: Function;
    decrease: Function
    remove: Function
}

const CartItem = (props: CartItemProps) => {
    const { item, remove } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (item.inStock !== true)
            remove(item.id)
    }, [item.inStock, remove, item.id])

    return (
        <Grid sx={{ my: 0.5, px: 1 }} spacing={2} container direction="row" justifyContent="space-between" alignItems="center" >
            <Grid onClick={() => navigate(`/shop/${item.slug}`)} component={ListItemButton}  >
                <Avatar sx={{ height: 55, width: 55 }} variant="square" alt={item.name} src={item.image.fields.file.url} />
                <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body1">${item.price} NZD</Typography>
                </Box>
            </Grid>
            <Grid >
                <Stack direction="row" justifyContent={{ xs: 'space-between', sm: "flex-end" }} alignItems="center" spacing={4}>
                    <AmountButtons amount={item} {...props} />
                    <Button startIcon={<CloseIcon fontSize="inherit" />} color="error" onClick={() => remove(item.id)} >
                        Remove
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

type AmountButtonsProps = {
    increase: Function;
    decrease: Function;
    remove: Function;
    amount: {
        amount: number[]
        id: string
    }
}

const AmountButtons = (props: AmountButtonsProps) => {
    const { decrease, increase, amount, remove } = props;

    useEffect(() => {
        if (amount?.amount.length === undefined || amount?.amount.length === 0) {
            remove(amount.id);
        }
    }, [amount?.amount.length, amount.id, remove])

    return (
        <Stack direction="row" justifyContent="center" alignItems="center"    >
            <IconButton onClick={() => decrease(amount?.id)} size="small">
                <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Chip variant="outlined" label={amount?.amount.length} />
            <IconButton onClick={() => increase(amount?.id)} size="small">
                <AddIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
