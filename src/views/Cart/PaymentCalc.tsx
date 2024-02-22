import { useState, JSX, useEffect } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

import { useCartHooks } from "@/hooks";
import { useCartContext } from "@/views/Cart/cartProvider";

type Amount = {
    shipping: number;
    total: number;
    currency?: string;
};

type DropdownProps = {
    setCountry: (country: string) => void;
    id: string;
    disabled?: boolean;
    loading?: boolean;
};

export const CountryDropdown = (props: DropdownProps): JSX.Element => {
    const { setCountry, id, disabled, loading } = props;

    const { countriesList } = useCartHooks();
    const value = localStorage.getItem("country") || "";

    return (
        <>
            {!loading ? (
                <FormControl
                    disabled={disabled}
                    size="small"
                    variant="outlined"
                    fullWidth>
                    <InputLabel id={id}>Country</InputLabel>
                    <Select
                        onChange={(e) => setCountry(e.target.value)}
                        value={value}
                        labelId="country"
                        id={id}
                        name={id}
                        label="Country">
                        {Object.entries(countriesList).map(([k, v]) => (
                            <MenuItem key={v.code} value={k}>
                                {v.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <Skeleton
                    sx={{ py: 2.3 }}
                    variant="rounded"
                    width="100%"
                    height="100%"
                />
            )}
        </>
    );
};

type CurrencyExchProps = {
    quantity: number;
    country: string;
    shippingCosts: number;
    setAmount: (amount: Amount) => void;
    amount: Amount;
    setDisable: (disable: boolean) => typeof disable | void;
};

const init = "NZD";

type ICartItemPrice = {
    country: string;
    itemPrice: number;
};

export const CartItemPrice = (props: ICartItemPrice): JSX.Element => {
    const { country, itemPrice } = props;

    const { currencyTypes, symbols, exchangeRate } = useCartHooks();
    const newCurrency = currencyTypes(country);
    const symbol = symbols(country);

    const [price, setPrice] = useState<number>(itemPrice);
    const [loading, setLoading] = useState<boolean>(true);

    // fetches the original price and converts it to the new currency
    useEffect(() => {
        const res = exchangeRate(newCurrency, itemPrice);
        setPrice(res);
        setLoading(false);
    }, [country, itemPrice, exchangeRate, newCurrency]);

    return (
        <Typography>
            {loading ? (
                <Skeleton />
            ) : (
                `${symbol}${price.toFixed(2)} ${newCurrency}`
            )}
        </Typography>
    );
};

// displays the approximate costs
export const CurrencyExchange = (props: CurrencyExchProps): JSX.Element => {
    const { country, shippingCosts, setAmount, amount, setDisable } = props;
    const { state } = useCartContext();
    const [loading, setLoading] = useState<boolean>(true);

    const { currencyTypes, symbols, vat, exchangeRate } = useCartHooks();
    const currency = currencyTypes(init);
    const vatCosts = vat(country);
    const newCurrency = currencyTypes(country);
    const symbol = symbols(country);

    const totalCost = state.total + shippingCosts;
    const vatTotal = vatCosts * amount.total;
    const totalCosts = totalCost.toFixed(2);

    const handleSetCurrency = () => {
        const shipping = exchangeRate(newCurrency, shippingCosts);
        const newTotal = exchangeRate(newCurrency, Number(totalCosts));
        setAmount({
            total: newTotal,
            shipping: shipping,
            currency: newCurrency,
        });
        setLoading(false);
        // try {
        //     const respTotal = await fetch(
        //         `${BASE_URL}?base=${currency}&symbols=${newCurrency}&amount=${totalCosts}`
        //     );
        //     const respShipping = await fetch(
        //         `${BASE_URL}?base=${currency}&symbols=${newCurrency}&amount=${shippingCosts}`
        //     );
        //     const total = await respTotal.json();
        //     const shipping = await respShipping.json();

        //     setAmount({
        //         total: total?.rates[newCurrency],
        //         shipping: shipping?.rates[newCurrency],
        //         currency: newCurrency,
        //     });
        //     setLoading(false);
        // } catch {
        //     setLoading(false);
        // }
    };

    const handlePricing = () => {
        setLoading(true);
        handleSetCurrency();
        return [
            currency,
            country,
            newCurrency,
            totalCosts,
            setAmount,
            setDisable,
            location.reload,
        ];
    };

    const loadRate = useQuery({
        queryKey: [
            currency,
            country,
            newCurrency,
            totalCosts,
            setAmount,
            setDisable,
            location.reload,
        ],
        queryFn: handlePricing,
        refetchOnWindowFocus: true,
    });

    const checkState = (): (
        | boolean
        | ((disable: boolean) => boolean | void)
    )[] => {
        if (loadRate.isLoading) {
            setDisable(true);
        }
        setDisable(false);
        return [loadRate.isLoading, setDisable];
    };

    useQuery({
        queryKey: [loadRate.isLoading, setDisable],
        queryFn: checkState,
    });

    return (
        <Box>
            <Typography gutterBottom variant="h4">
                {loading ? <Skeleton variant="rounded" /> : "Order summary"}
            </Typography>
            <Typography>
                {" "}
                {loading ? (
                    <Skeleton />
                ) : (
                    `VAT/GST: ${symbol}${vatTotal?.toFixed(2)} ${newCurrency}`
                )}
            </Typography>
            <Typography>
                {loading ? (
                    <Skeleton />
                ) : (
                    `Shipping: ${symbol}${amount?.shipping?.toFixed(
                        2
                    )} ${newCurrency}`
                )}{" "}
            </Typography>
            <Typography>
                {" "}
                {loading ? (
                    <Skeleton />
                ) : (
                    `Total: ${symbol}${amount?.total?.toFixed(
                        2
                    )} ${newCurrency}`
                )}
            </Typography>
        </Box>
    );
};
