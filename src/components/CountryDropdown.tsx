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


export const CountryCurrency = (country: string) => {
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

const BASE_URL = 'https://api.exchangerate.host/latest'

interface CurrencyExchProps {
    country: string;
    exchangeRate: number;
    setExchangeRate: any;
}


export const CurrencyExchange = (props: CurrencyExchProps) => {
    const { country, exchangeRate, setExchangeRate } = props;
    const { total } = useCartContext()

    const cost = total.toString()
    // const [exchangeRate, setExchangeRate] = useState();
    const [prev, setPrev] = useState('');

    const previous: string = prev;
    const lastCountry = useCallback(() => {
        setPrev(previous)
    }, [previous])

    const getExchangeRate = useCallback(async () => {
        const response = await fetch(`${BASE_URL}?base=${CountryCurrency(prev)}&symbols=${CountryCurrency(country)}&amount=${cost}`);
        const data = await response.json();
        setExchangeRate(data.rates[CountryCurrency(country)]);
    }, [prev, country, cost, setExchangeRate])

    useEffect(() => {
        getExchangeRate();
        lastCountry();
    }, [country, cost, getExchangeRate, lastCountry])

    const symbol = CountryCurrencySymbol(country)
    const type = CountryCurrency(country)

    return (
        <>
            Amout to pay: {symbol}{exchangeRate} {type}
        </>
    )

}