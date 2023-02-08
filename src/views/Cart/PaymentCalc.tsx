import React, { useCallback, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

import { ProductItems } from "@/types";
import { useCartContext } from "@/views/Cart/cartProvider";

type Init = {
    [key: string]: {
        name: string;
        code: number;
    }
}

export const countriesList: Init = {
    AU: { name: "Australia", code: 0 },
    CA: { name: "Canada", code: 1 },
    CL: { name: "Chile", code: 2 },
    FR: { name: "France", code: 3 },
    IT: { name: "Italy", code: 4 },
    JP: { name: "Japan", code: 5 },
    NZ: { name: "New Zealand", code: 6 },
    NO: { name: "Norway", code: 7 },
    TW: { name: "Taiwan", code: 8 },
    GB: { name: "United Kingdom", code: 9 },
    US: { name: "United States", code: 10 },
}

type DropdownProps = {
    setCountry: (country: string) => void;
    value: string;
    label: string;
    id: string;
    disabled?: boolean;
    loading?: boolean;
}

const CountryDropdown = (props: DropdownProps) => {
    const { setCountry, value, label, id, disabled, loading } = props;

    const changeCountry = (e: SelectChangeEvent) => {
        setCountry(e.target.value as string);
    }

    return (
        <>
            {!loading ?
                <FormControl disabled={disabled} size="small" variant="outlined" fullWidth>
                    <InputLabel id={id}>Country</InputLabel>
                    <Select
                        onChange={changeCountry}
                        value={value}
                        labelId="country"
                        id={id}
                        name={id}
                        label={label}
                    >
                        {Object.entries(countriesList).map(([k, v]) =>
                            <MenuItem key={v.code} value={k}>{v.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                : <Skeleton sx={{ py: 2.3 }} variant="rounded" width={'100%'} height={'100%'} />
            }
        </>

    )
}
export default CountryDropdown;

// exact shipping costs
export const shippingCosts = (country: string) => {
    if (country === "AU") return (44.92);
    if (country === "CA") return (46.92);
    if (country === "CL") return (31);
    if (country === "FR") return (34.92);
    if (country === "IT") return (36.92);
    if (country === "JP") return (21);
    if (country === "NZ") return (11);
    if (country === "NO") return (42);
    if (country === "TW") return (13);
    if (country === "GB") return (32.92);
    if (country === "US") return (37.92);
    return 11;
}

// custom shipping price for paper products
export const paperProductShipping = (country: string) => {
    if (country === "NZ") return (5.95);
    return 5.95;
}

// currency symbols
export const symbols = (country: string) => {
    if (country === "AU") return ("$");
    if (country === "CA") return ("$");
    if (country === "CL") return ("$");
    if (country === "FR") return ("€");
    if (country === "IT") return ("€");
    if (country === "JP") return ("¥");
    if (country === "NZ") return ("$");
    if (country === "NO") return ("kr");
    if (country === "TW") return ("NT$");
    if (country === "GB") return ("£");
    if (country === "US") return ("$");
    return "$";
}

// set currency of country
export const currencyTypes = (country: string) => {
    if (country === "AU") return ("AUD");
    if (country === "CA") return ("CAD");
    if (country === "CL") return ("CLP");
    if (country === "FR") return ("EUR");
    if (country === "IT") return ("EUR");
    if (country === "JP") return ("JPY");
    if (country === "NZ") return ("NZD");
    if (country === "NO") return ("NOK");
    if (country === "TW") return ("TWD");
    if (country === "GB") return ("GBP");
    if (country === "US") return ("USD");
    return "NZD";
}

// exact tax rate for each country
export const vat = (country: string) => {
    if (country === "AU") return (0);
    if (country === "CA") return (0.05);
    if (country === "CL") return (0.19);
    if (country === "FR") return (0.22);
    if (country === "IT") return (0.24);
    if (country === "JP") return (0.1);
    if (country === "NZ") return (0.15);
    if (country === "NO") return (0.25);
    if (country === "TW") return (0.05);
    if (country === "GB") return (0.2);
    if (country === "US") return (0);
    return 0.15;
}

// custom code for american pricing 
type AmericanPricingProps = {
    country: string;
    item: ProductItems;
}
export const americanPricing = (props: AmericanPricingProps) => {
    const { country, item } = props;

    var price
    if (item.name === "DREAMING IN PETALS" && country === "US") {
        price = 82.30
    }
    else {
        price = item.price
    }
    return price
}


type ShippingFeeProps = {
    country: string;
    category: string[];
}

// reduces shipping fee for paper products if there is no book in the cart
export const shippingFee = (props: ShippingFeeProps) => {
    const { country, category } = props
    const PaperProductShipping = paperProductShipping(country);
    const shippingCost = shippingCosts(country);

    let shippingFee
    if (category.join(" ") === "Paper Products") {
        shippingFee = PaperProductShipping
    }
    else if (category.includes("Paper Products"), category.includes("Book")) {
        shippingFee = shippingCost
    }
    else {
        shippingFee = shippingCost
    }
    return shippingFee
}

type CheckProductTypeProps = {
    cart: ProductItems[];
    category: any;
}

// removes paper products from shipping fee if there is a book in the cart
export const checkProductType = (props: CheckProductTypeProps) => {
    const { cart, category } = props

    let quantity
    if (category.includes("Paper Products") & category.includes("Book")) {
        quantity = cart.filter((item: ProductItems) => item.category !== "Paper Products").map((item: ProductItems) => item.amount.length).reduce((a: number, b: number) => a + b, 0)
    }
    else {
        quantity = cart.map((item: ProductItems) => item.amount.length).reduce((a: number, b: number) => a + b, 0);
    }
    return quantity
}

type CurrencyExchProps = {
    country: string;
    shippingCosts: number;
    setAmount: (amount: Amount) => typeof amount | void;
    amount: Amount;
    setDisable: (disable: boolean) => typeof disable | void;
}
type Amount = {
    shipping: number;
    total: number;
    currency?: string;
}

const BASE_URL = 'https://api.exchangerate.host/latest';
const init = "NZD";

type CartItem = {
    country: string;
    item: number;
}

export const CartItemPrice = (props: CartItem) => {
    const { country, item, } = props;
    // inital state (NZD)
    const currency = currencyTypes(init);

    const newCurrency = currencyTypes(country);
    const symbol = symbols(country);

    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const handleSetCurrency = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}?base=${currency}&symbols=${newCurrency}&amount=${item}`);
            const data = await response.json();
            setPrice(data?.rates[newCurrency])
            setLoading(false)
        }
        catch {
            setLoading(false)
        }
    }, [currency, item, newCurrency]);

    useEffect(() => {
        handleSetCurrency();
    }, [handleSetCurrency]);

    return (
        <>{loading ? <Skeleton /> : `${symbol}${price.toFixed(2)} ${newCurrency}`}</>
    )
}

// displays the approximate costs 
export const CurrencyExchange = (props: CurrencyExchProps) => {
    const { country, shippingCosts, setAmount, amount, setDisable } = props;
    const { total, cart } = useCartContext();
    const [loading, setLoading] = useState<boolean>(true);
    // console.log(item, price, country)

    const currency = currencyTypes(init);
    const vatCosts = vat(country);
    const newCurrency = currencyTypes(country);
    const symbol = symbols(country);

    // const item = cart.map((item: ProductItems) => item.name).join(" ");
    // var price
    // var shippingCost: number
    // if (item === "DREAMING IN PETALS" && country === "US") {
    //     price = 82.30
    //     shippingCost = 15.04
    // }
    // else {
    //     price = total
    //     shippingCost = shippingCosts
    // }

    const totalCost = total + shippingCosts;
    const vatTotal = vatCosts * amount.total;
    const totalCosts = totalCost.toFixed(2).toString();

    const handleSetCurrency = async () => {
        setLoading(true)
        const respTotal = await fetch(`${BASE_URL}?base=${currency}&symbols=${newCurrency}&amount=${totalCosts}`);
        const respShipping = await fetch(`${BASE_URL}?base=${currency}&symbols=${newCurrency}&amount=${shippingCosts}`);
        const total = await respTotal.json();
        const shipping = await respShipping.json();

        if (respShipping.ok || respTotal.ok) {
            setAmount({ total: total?.rates[newCurrency], shipping: shipping?.rates[newCurrency], currency: newCurrency });
            setLoading(false)
        }

        return [currency, newCurrency, totalCosts, shippingCosts, setAmount]
    }
    const loadRate = useQuery([currency, newCurrency, totalCosts, shippingCosts, setAmount, setDisable], handleSetCurrency, {
        refetchOnWindowFocus: true,
    });


    const checkState = () => {
        if (loadRate.isLoading) {
            setDisable(true)
        }
        else {
            setDisable(false)
        }
        return [loadRate.isLoading, setDisable]
    }
    useQuery([loadRate.isLoading, setDisable], checkState, {
        refetchOnWindowFocus: true,
    })


    return (
        <Box>
            <Typography> {loading ? <Skeleton /> : `VAT/GST: ${symbol}${vatTotal && vatTotal.toFixed(2)} ${newCurrency}`}</Typography>
            <Typography>{loading ? <Skeleton /> : `Shipping: ${symbol}${amount.shipping && amount.shipping.toFixed(2)} ${newCurrency}`} </Typography>
            <Typography> {loading ? <Skeleton /> : `Total: ${symbol}${amount.total && amount.total.toFixed(2)} ${newCurrency}`}</Typography>
        </Box>
    )
}