import { useState, JSX } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

import { ProductItems } from "@/types";
import { useCartContext } from "@/views/Cart/cartProvider";

type Amount = {
    shipping: number;
    total: number;
    currency?: string;
};

type DropdownProps = {
    setCountry: (country: string) => void;
    value: string;
    label: string;
    id: string;
    disabled?: boolean;
    loading?: boolean;
};

export const CountryDropdown = (props: DropdownProps): JSX.Element => {
    const { setCountry, value, label, id, disabled, loading } = props;

    const { countriesList } = useCartHooks();

    const changeCountry = (e: SelectChangeEvent) => {
        setCountry(e.target.value);
    };

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
                        onChange={changeCountry}
                        value={value}
                        labelId="country"
                        id={id}
                        name={id}
                        label={label}>
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
                    width={"100%"}
                    height={"100%"}
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

// const BASE_URL = "https://api.exchangerate.host/latest";
const init = "NZD";

type CartItem = {
    country: string;
    item: {
        price: number;
        name: string;
    };
    flags?: {
        [key: string]: boolean;
    };
};

export const CartItemPrice = (props: CartItem): JSX.Element => {
    const { country, item } = props;

    const { currencyTypes, symbols, exchangeRate } = useCartHooks();
    const currency = currencyTypes(init);
    const newCurrency = currencyTypes(country);
    const symbol = symbols(country);

    const [price, setPrice] = useState<number>(item.price);
    const [loading, setLoading] = useState<boolean>(true);

    // fetches the original price and converts it to the new currency
    const getPrices =  () => {
        const res = exchangeRate(newCurrency, item.price)
        setPrice(res)
        setLoading(false);
    };

    const handleSetCurrency = (): Array<string | number> => {
        setLoading(true);

        getPrices();
        return [currency, newCurrency, item.price];
    };
    useQuery(
        [currency, newCurrency, item.price, location.reload],
        handleSetCurrency
    );

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
    const { total } = useCartContext();
    const [loading, setLoading] = useState<boolean>(true);

    const { currencyTypes, symbols, vat, exchangeRate } = useCartHooks();
    const currency = currencyTypes(init);
    const vatCosts = vat(country);
    const newCurrency = currencyTypes(country);
    const symbol = symbols(country);

    const totalCost = total + shippingCosts;
    const vatTotal = vatCosts * amount.total;
    const totalCosts = totalCost.toFixed(2).toString();

    const handleSetCurrency = () => {
        const shipping = exchangeRate(newCurrency, shippingCosts);
        const newTotal =  exchangeRate(newCurrency, totalCosts);
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

    const loadRate = useQuery(
        [
            currency,
            country,
            newCurrency,
            totalCosts,
            setAmount,
            setDisable,
            location.reload,
        ],
        handlePricing,
        {
            refetchOnWindowFocus: true,
        }
    );

    const checkState = (): Array< boolean | ((disable: boolean) => boolean | void)> => {
        if (loadRate.isLoading) {
            setDisable(true);
        }
        setDisable(false);
        return [loadRate.isLoading, setDisable];
    };

    useQuery([loadRate.isLoading, setDisable], checkState);

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

export const useCartHooks = () => {
    type Init = {
        [key: string]: {
            name: string;
            code: number;
        };
    };

    // list of countries
    const countriesList: Init = {
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
    };

    // standard shipping costs for each country
    const shippingCosts = (country: string): number => {
        if (country === "AU") return 44.92;
        if (country === "CA") return 46.92;
        if (country === "CL") return 31;
        if (country === "FR") return 34.92;
        if (country === "IT") return 36.92;
        if (country === "JP") return 21;
        if (country === "NZ") return 11;
        if (country === "NO") return 42;
        if (country === "TW") return 13;
        if (country === "GB") return 32.92;
        if (country === "US") return 37.92;
        return 11;
    };

    // custom shipping price for paper products
    const paperProductShipping = (country: string): number | undefined => {
        if (country === "NZ") return 5.95;
    };

    // currency symbols
    const symbols = (country: string): string => {
        if (country === "AU") return "$";
        if (country === "CA") return "$";
        if (country === "CL") return "$";
        if (country === "FR") return "€";
        if (country === "IT") return "€";
        if (country === "JP") return "¥";
        if (country === "NZ") return "$";
        if (country === "NO") return "kr";
        if (country === "TW") return "NT$";
        if (country === "GB") return "£";
        if (country === "US") return "$";
        return "$";
    };

    // set currency of country
    const currencyTypes = (country: string): string => {
        if (country === "AU") return "AUD";
        if (country === "CA") return "CAD";
        if (country === "CL") return "CLP";
        if (country === "FR") return "EUR";
        if (country === "IT") return "EUR";
        if (country === "JP") return "JPY";
        if (country === "NZ") return "NZD";
        if (country === "NO") return "NOK";
        if (country === "TW") return "TWD";
        if (country === "GB") return "GBP";
        if (country === "US") return "USD";
        return "NZD";
    };

    // exact tax rate for each country
    const vat = (country: string): number => {
        if (country === "AU") return 0;
        if (country === "CA") return 0.05;
        if (country === "CL") return 0.19;
        if (country === "FR") return 0.22;
        if (country === "IT") return 0.24;
        if (country === "JP") return 0.1;
        if (country === "NZ") return 0.15;
        if (country === "NO") return 0.25;
        if (country === "TW") return 0.05;
        if (country === "GB") return 0.2;
        if (country === "US") return 0;
        return 0.15;
    };

    const exchangeRate = (country: string, price: number): number => {
        if (country === "AUD") return 0.92 * price;
        if (country === "CAD") return 0.82 * price;
        if (country === "CLP") return 532.98 * price;
        if (country === "EUR") return 0.55 * price;
        if (country === "JPY") return 89.50 * price;
        if (country === "NZD") return 1 * price;
        if (country === "NOK") return 6.62 * price;
        if (country === "TWD") return 19.13 * price;
        if (country === "GBP") return 0.48 * price;
        if (country === "USD") return 0.59 * price;
        return 1 * price;
    };

    type AmountProps = {
        country: string;
        amount: Amount;
    };

    // float to int conversion for Japan and Chile
    const handleJapanChileShipping = (props: AmountProps): string | number => {
        const { country, amount } = props;

        let shipping;
        if (!amount.shipping) {
            shipping = "";
        } else {
            if (country === "CL" || country === "JP") {
                shipping = amount.shipping.toFixed(0);
            } else {
                shipping =
                    (amount.shipping.toFixed(2) as unknown as number) * 100;
            }
        }
        return shipping;
    };

    type ShippingFeeProps = {
        country: string;
        category: string[];
    };

    // reduces shipping fee for paper products if there is no book in the cart
    const shippingFee = (props: ShippingFeeProps): number => {
        const { country, category } = props;

        const PaperProductShipping = paperProductShipping(country);
        const shippingCost = shippingCosts(country);

        let shippingFee: number | undefined;
        if (category.join(" ") === "Paper Products") {
            shippingFee = PaperProductShipping;
        } else if (
            (category.includes("Paper Products"), category.includes("Book"))
        ) {
            shippingFee = shippingCost;
        } else {
            shippingFee = shippingCost;
        }
        return shippingFee as number;
    };

    type CheckProductTypeProps = {
        cart: ProductItems[];
        category: string;
    };

    // removes paper products from shipping fee if there is a book in the cart
    const checkProductType = (props: CheckProductTypeProps): number => {
        const { cart, category } = props;

        let quantity;
        if ((category.includes("Paper Products"), category.includes("Book"))) {
            quantity = cart
                .filter(
                    (item: ProductItems) => item.category !== "Paper Products"
                )
                .map((item: ProductItems) => item.amount.length)
                .reduce((a: number, b: number) => a + b, 0);
        } else {
            quantity = cart
                .map((item: ProductItems) => item.amount.length)
                .reduce((a: number, b: number) => a + b, 0);
        }
        return quantity;
    };

    return {
        countriesList,
        shippingCosts,
        symbols,
        currencyTypes,
        vat,
        paperProductShipping,
        handleJapanChileShipping,
        shippingFee,
        checkProductType,
        exchangeRate
    };
};
