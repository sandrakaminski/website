/* eslint-disable camelcase */
import React, { useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';

import CountryDropdown, { CurrencyExchange, currencyTypes, countriesList, CartItemPrice, shippingFee, checkProductType, handleJapanChileShipping } from './PaymentCalc';
import { CartSkeleton } from "@/components/Outline";
import { ProductItems } from "@/types";
import { useCartContext } from "@/views/Cart/cartProvider";

type OrderItems = {
    id: string;
    amount: number[];
}

type Prices = {
    shipping: number extends number ? number : string;
    total: number;
}

const Cart = () => {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState<boolean>(false);
    const [nzOnly, setNzOnly] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [disable, setDisable] = useState<boolean>(true);
    const [country, setCountry] = useState<string>("");
    const [amount, setAmount] = useState<Prices>({
        shipping: 0,
        total: 0
    });

    const { cart, clear, decrease, increase, remove } = useCartContext();
    const category = cart.map((item: ProductItems) => item.category);

    // removes them from shipping fee if there is a book in the cart
    const quantity = checkProductType({ cart, category });
    const shippingTotal = shippingFee({ country, category }) * quantity;
    const currency = currencyTypes(country).toLowerCase();

    const handleSetCountry = (val: string) => {
        localStorage.setItem("country", val);
        setCountry(val);
    }

    const getData = async () => {
        try {
            const res = await axios.get('http://geolocation-db.com/json/');
            const { country_code } = res.data;
            if (countriesList[country_code] === undefined) {
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
    };

    const trigger = () => {
        if (cart.length === 0) {
            localStorage.removeItem("country");
        }
        else if (cart && cart.map((item: ProductItems) => item.nzShippingOnly).includes(true)) {
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
        return [cart, country]
    };
    useQuery([cart, country], trigger, {
        refetchOnWindowFocus: false,
    })

    const data = {
        country: country,
        currency: currency,
        shipping: parseInt(handleJapanChileShipping({ country, amount }) as string),
        orderItems: cart?.map((item: OrderItems) => {
            return {
                productId: item.id,
                quantity: item.amount.length
            }
        })
    }

    const handlePurchase = async () => {
        setProcessing(true);
        ReactGA.event({
            category: 'Purchase',
            action: `New checkout session for person from ${country}`,
            label: 'Purchase',
        });
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
                    <Typography gutterBottom color="grayText" variant="subtitle1" >You have nothing in your shopping cart.</Typography>
                    <Button size="large" variant="contained" onClick={() => navigate("/shop")} >
                        Shop now
                    </Button>
                </Stack >
                :
                <Grid alignItems="stretch" spacing={1} container>
                    <Grid xs={12} md={8} >
                        <Card sx={{ p: 2, minHeight: 250 }}>
                            {loading ?
                                <CartSkeleton />
                                :
                                <>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                        <Typography variant="h4" >Shopping cart</Typography>
                                        <Button endIcon={<CloseIcon />} onClick={clear}>Clear cart</Button>
                                    </Stack>
                                    <Stack sx={{ mt: 4 }} >
                                        {cart?.map((item: ProductItems, index: number) =>
                                            <CartItem country={country} key={index} item={item} increase={increase} decrease={decrease} remove={remove} />
                                        )}
                                        <Typography variant="caption" color="grayText">*VAT/GST Included in product price</Typography>
                                    </Stack>
                                </>
                            }
                        </Card>
                    </Grid>
                    <Grid xs={12} md={4} >
                        <Stack component={Card} sx={{ height: '100%', p: 2 }} direction="column" justifyContent="space-between" spacing={1} >
                            <CurrencyExchange setDisable={setDisable} setAmount={setAmount} amount={amount} shippingCosts={shippingTotal} country={country} />
                            <ButtonGroup size="small">
                                <CountryDropdown loading={loading} disabled={nzOnly} label={"Country"} id={"country"} value={country} setCountry={handleSetCountry} />
                                <LoadingButton size="small" sx={{ width: 200, ml: 1 }} disabled={disable} variant="contained" loading={processing} onClick={handlePurchase}>Buy now</LoadingButton>
                            </ButtonGroup>
                        </Stack>
                    </Grid>
                </Grid>
            }
        </Box>
    )
}

export default Cart;

type CartItemProps = {
    item: ProductItems;
    remove: (id: string) => void;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    country: string;
}

const CartItem = (props: CartItemProps) => {
    const { item, remove, country } = props;
    const navigate = useNavigate();

    const inStock = () => {
        item.inStock === true ? "In stock" : "Out of stock";
        return item.inStock;
    }
    useQuery([item.inStock], inStock)


    return (
        <Grid sx={{ my: 0.5, px: 1 }} spacing={2} container direction="row" justifyContent="space-between" alignItems="center" >
            <Grid onClick={() => navigate(`/shop/${item.slug}`)} component={ListItemButton}  >
                <Avatar sx={{ height: 55, width: 55 }} variant="square" alt={item.name} src={item.image.fields.file.url} />
                <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <CartItemPrice item={item.price} country={country} />
                </Box>
            </Grid>
            <Grid container direction="row" justifyContent={{ xs: 'space-between', sm: "flex-end" }} alignItems="center" spacing={4}>
                <AmountButtons amount={item} {...props} />
                <Button startIcon={<DeleteIcon fontSize="inherit" />} color="error" onClick={() => remove(item.id)} >
                    Remove
                </Button>
            </Grid>
        </Grid>
    )
}

type AmountButtonsProps = {
    increase: (id: string) => void
    decrease: (id: string) => void;
    remove: (id: string) => void;
    amount: {
        amount: number[]
        id: string
    }
}

const AmountButtons = (props: AmountButtonsProps) => {
    const { decrease, increase, amount, remove } = props;

    const changeAmount = () => {
        if (amount?.amount.length === undefined || amount?.amount.length === 0) {
            remove(amount.id);
        }
        return amount?.amount.length;
    }
    useQuery([amount, amount?.id], changeAmount, {
        refetchOnWindowFocus: false,
    })

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