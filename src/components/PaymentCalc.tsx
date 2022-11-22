import { useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useCartContext } from "@/views/Cart/cartProvider";

type Init = {
    [key: string]: {
        name: string;
        code: number;
    }
}

const init: Init = {
    AU: { name: "Australia", code: 0 },
    CA: { name: "Canada", code: 1 },
    CL: { name: "Chile", code: 2 },
    FR: { name: "France", code: 3 },
    IT: { name: "Italy", code: 4 },
    NZ: { name: "New Zealand", code: 5 },
    NO: { name: "Norway", code: 6 },
    TW: { name: "Taiwan", code: 7 },
    GB: { name: "United Kingdom", code: 8 },
    US: { name: "United States", code: 9 },

}

type DropdownProps = {
    onChange: any;
    value: string | object;
    label: string;
    id: string;
    disabled?: boolean;
}

const CountryDropdown = (props: DropdownProps) => {
    const { onChange, value, label, id, disabled } = props;

    return (
        <FormControl disabled={disabled} sx={{ mindWidth: 300 }} size="small" variant="outlined" fullWidth>
            <InputLabel id={id}>Country</InputLabel>
            <Select
                onChange={onChange}
                value={value}
                labelId="country"
                id={id}
                name={id}
                label={label}
            >
                {Object.entries(init).map(([k, v]: any) =>
                    <MenuItem key={v.code} value={k}>{v.name}</MenuItem>
                )}
            </Select>
        </FormControl>
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
    if (country === "NZ") return (11);
    if (country === "NO") return (42);
    if (country === "TW") return (13);
    if (country === "GB") return (32.92);
    if (country === "US") return (37.92);
    return 11;
}

// currency symbols
export const symbols = (country: string) => {
    if (country === "AU") return ("$");
    if (country === "CA") return ("$");
    if (country === "CL") return ("$");
    if (country === "FR") return ("€");
    if (country === "IT") return ("€");
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
    if (country === "NZ") return (0.15);
    if (country === "NO") return (0.25);
    if (country === "TW") return (0.05);
    if (country === "GB") return (0.2);
    if (country === "US") return (0);
    return 0.15;
}

interface CurrencyExchProps {
    country: string;
    shippingCosts: any;
    setAmount: any;
    amount: {
        shipping: number;
        total: number;
    };
}

const BASE_URL = 'https://api.exchangerate.host/latest'

// displays the approximate costs 
export const CurrencyExchange = (props: CurrencyExchProps) => {
    const { country, shippingCosts, setAmount, amount } = props;
    const { total } = useCartContext();


    // inital state
    const init = "";
    const currency = currencyTypes(init);

    // custom hooks
    const vatCosts = vat(country);
    const newCurrency = currencyTypes(country);
    const symbol = symbols(country);

    // calculations 
    const totalCost = total + shippingCosts;
    const vatTotal = vatCosts * total;
    const totalCosts = totalCost.toFixed(2).toString();

    // fetches the exchange rate
    useEffect(() => {

        const handleSetCurrency = async () => {
            const respTotal = await fetch(`${BASE_URL}?base=${currency}&symbols=${newCurrency}&amount=${totalCosts}`);
            const respShipping = await fetch(`${BASE_URL}?base=${currency}&symbols=${newCurrency}&amount=${shippingCosts}`);
            
            const total = await respTotal.json();
            const shipping = await respShipping.json();
            setAmount({ total: total && total.rates[newCurrency], shipping: shipping && shipping.rates[newCurrency], currency: newCurrency });
        }
        handleSetCurrency();
    }, [init, country, totalCosts, currency, newCurrency, setAmount, totalCost, shippingCosts, amount.shipping]);

    return (
        <>
            <Typography> {!amount.shipping ? <Skeleton /> : `VAT/GST: ${symbol}${vatTotal.toFixed(2)} ${newCurrency}`}</Typography>
            <Typography>{!amount.shipping ? <Skeleton /> : `Shipping: ${symbol}${amount.shipping.toFixed(2)} ${newCurrency}`} </Typography>
            <Typography> {!amount.total ? <Skeleton /> : `Total: ${symbol}${amount.total.toFixed(2)} ${newCurrency}`}</Typography>
        </>
    )
}