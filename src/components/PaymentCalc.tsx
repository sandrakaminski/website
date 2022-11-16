import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
        <FormControl sx={{ mindWidth: 300 }} size="small" variant="outlined" fullWidth>
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

export const ShippingCost = (country: string) => {
    if (country === "AU") return (44.92);
    if (country === "CA") return (46.92);
    if (country === "CL") return (31);
    if (country === "FR") return (34.92);
    if (country === "IT") return (36.92);
    if (country === "NZ") return (11);
    if (country === "NO") return (42);
    if (country === "TW") return (13);
    if (country === "UK") return (32.92);
    if (country === "US") return (37.92);
    return 11;
}

export const vat = (country: string) => {
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

export const shippingID = (country: string) => {
    if (country === "AU") return ('shr_1M4BkqDGuX6bhMKwcWA0yMaU');
    if (country === "CA") return ('shr_1M4BlKDGuX6bhMKwDn4GXKNn');
    if (country === "CL") return ('shr_1M4BlhDGuX6bhMKw20OPqjBv');
    if (country === "FR") return ('shr_1M4BmEDGuX6bhMKwncJvI9VH');
    if (country === "IT") return ('shr_1M4BmWDGuX6bhMKwtbNrjVGq');
    if (country === "NZ") return ('shr_1M4EZiDGuX6bhMKwvSJ4wYJB');
    if (country === "NO") return ('shr_1M4BmpDGuX6bhMKwtFumnpAg');
    if (country === "TW") return ('shr_1M4Bn9DGuX6bhMKwPFLp9Pj8');
    if (country === "UK") return ('shr_1M4DN5DGuX6bhMKwFNrZfJux');
    if (country === "US") return ('shr_1M4BnvDGuX6bhMKw9z8KmU0e');
    return 'shr_1M4EZiDGuX6bhMKwvSJ4wYJB'
}

interface CurrencyExchProps {
    country: string;
}

export const CurrencyExchange = (props: CurrencyExchProps) => {
    const { country } = props;
    const { total } = useCartContext();
    const shippingCosts = ShippingCost(country);
    const vatCosts = vat(country);

    const totalCost = total + shippingCosts
    const vatTotal = vatCosts * total
    const totalCosts = totalCost

    return (
        <>
            <Typography> {`VAT/GST: $${vatTotal.toFixed(2)} NZD`}</Typography>
            <Typography>{`Shipping: $${shippingCosts.toFixed(2)} NZD`} </Typography>
            <Typography> {`Total: $${totalCosts.toFixed(2)} NZD`}</Typography>
        </>
    )
}