import { useCallback, useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
    UK: { name: "United Kingdom", code: 8 },
    US: { name: "United States", code: 9 },
}

type DropdownProps = {
    onChange: any;
    value: string | object;
    label: string;
    id: string;
}

const CountryDropdown = (props: DropdownProps) => {
    const { onChange, value, label, id } = props;

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id={id}>Country</InputLabel>
            <Select
                onChange={onChange}
                value={value}
                labelId="country"
                id={id}
                name={id}
                label={label}
                defaultValue={init.NZ}
            >
                {Object.entries(init).map(([k, v]: any) =>
                    <MenuItem key={v.code} value={k}>{v.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}
export default CountryDropdown;


const CountryCurrency = (country: string) => {
    if (country === "AU") return "AUD";
    if (country === "CA") return "CAD";
    if (country === "CL") return "CLP";
    if (country === "FR") return "EUR";
    if (country === "IT") return "EUR";
    if (country === "NZ") return "NZD";
    if (country === "NO") return "NOK";
    if (country === "TW") return "TWD";
    if (country === "UK") return "GBP";
    if (country === "US") return "USD";
    return "NZD";
}

const CountryCurrencySymbol = (country: string) => {
    if (country === "AU") return "$";
    if (country === "CA") return "$";
    if (country === "CL") return "$";
    if (country === "FR") return "€";
    if (country === "IT") return "€";
    if (country === "NZ") return "$";
    if (country === "NO") return "kr";
    if (country === "TW") return "NT$";
    if (country === "UK") return "£";
    if (country === "US") return "$";
    return "$";
}

export const Shipping = (country: string) => {
    if (country === "AU") return (44.92);
    if (country === "CA") return (46.92);
    if (country === "CL") return (31);
    if (country === "FR") return (36.92);
    if (country === "IT") return (36.92);
    if (country === "NZ") return (11);
    if (country === "NO") return (42);
    if (country === "TW") return (13);
    if (country === "UK") return (10);
    if (country === "US") return (37.92);
    return 11;
}

const Vat = (country: string) => {
    if (country === "AU") return (0);
    if (country === "CA") return (0.05);
    if (country === "CL") return (0.19);
    if (country === "FR") return (0.22);
    if (country === "IT") return (0.24);
    if (country === "NZ") return (0.15);
    if (country === "NO") return (0.25);
    if (country === "TW") return (0.05);
    if (country === "UK") return (0.2);
    if (country === "US") return (0);
    return 0.15;
}

const BASE_URL = 'https://api.exchangerate.host/latest'

interface CurrencyExchProps {
    country: string;
}

export const CurrencyExchange = (props: CurrencyExchProps) => {
    const { country } = props;
    const { total } = useCartContext();
    const symbol = CountryCurrencySymbol(country)
    const type = CountryCurrency(country)

    const [exchangeRate, setExchangeRate] = useState<Number>(0);
    const cost = total.toString();
    const [prev, setPrev] = useState<string>('');

    const previous: string = prev;
    const lastCountry = useCallback(() => {
        setPrev(previous)
    }, [previous])


    const getExchangeRate = useCallback(async () => {
        const response = await fetch(`${BASE_URL}?base=${CountryCurrency(prev)}&symbols=${CountryCurrency(country)}&amount=${cost}`);
        const data = await response.json();
        setExchangeRate(data.rates[CountryCurrency(country)]);
    }, [prev, country, cost])

    useEffect(() => {
        getExchangeRate();
        lastCountry();
    }, [country, cost, getExchangeRate, lastCountry])


    return (exchangeRate &&
        <>
            {`Approximate cost in your country: ${symbol}${exchangeRate} ${type}`}
        </>
    )
}