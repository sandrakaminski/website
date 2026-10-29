import { useEffect, JSX } from "react";

import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useCartHooks, useStripePrices } from "@/hooks";
import { useCartContext } from "@/views/Cart/cartActions";

type TAmount = {
    subtotal?: number;
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
    const value = sessionStorage.getItem("country") || "";

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
    country: string;
    shippingCosts: number;
    setAmount: (amount: TAmount) => void;
    amount: TAmount;
    setDisable: (disable: boolean) => typeof disable | void;
    handleError: (message: string) => void;
};

type ICartItemPrice = {
    country: string;
    itemPrice: number;
    productId: string;
};

export const CartItemPrice = (props: ICartItemPrice): JSX.Element => {
    const { country, itemPrice, productId } = props;
    const { state } = useCartContext();

    const { currencyTypes, symbols } = useCartHooks();
    const currency = currencyTypes(country);
    const symbol = symbols(country);
    const isNzd = !currency || currency === "NZD";
    const productIds = state.cart.map((item) => item.productId);

    const { data, isFetching, isError } = useStripePrices({
        productIds,
        currency,
    });

    const price = isNzd ? itemPrice : data?.prices[productId];
    const loading = !isNzd && (isFetching || (!data && !isError));

    const theme = useTheme();
    const hideSymbol = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Typography variant="subtitle2">
            {loading || price === undefined ? (
                <Skeleton width={80} />
            ) : (
                `${symbol}${price.toFixed(2)} ${hideSymbol ? "" : currency}`
            )}
        </Typography>
    );
};

/** Cart totals: Contentful NZD locally; Stripe currency_options for other currencies. */
export const CurrencyExchange = (props: CurrencyExchProps): JSX.Element => {
    const {
        country,
        shippingCosts,
        setAmount,
        amount,
        setDisable,
        handleError,
    } = props;
    const { state } = useCartContext();

    const { countriesList, currencyTypes, symbols } = useCartHooks();
    const currency = currencyTypes(country);
    const symbol = symbols(country);
    const isNzd = !currency || currency === "NZD";
    const productIds = state.cart.map((item) => item.productId);
    const countryName =
        countriesList[country as keyof typeof countriesList]?.name ?? country;

    const { data, isFetching, isError } = useStripePrices({
        productIds,
        currency,
    });

    const loading = !isNzd && (isFetching || (!data && !isError));

    useEffect(() => {
        if (isNzd) {
            const subtotal = state.total;
            setAmount({
                subtotal,
                shipping: shippingCosts,
                total: subtotal + shippingCosts,
                currency,
            });
            setDisable(false);
            handleError("");
            return;
        }

        if (isError || !data?.prices) {
            setDisable(true);
            if (isError) {
                handleError(
                    `This product cannot be shipped to ${countryName}. If you would like to purchase, please contact us at info@sandrakaminski.com.`
                );
            }
            return;
        }

        const subtotal = state.cart.reduce((acc, item) => {
            const unit = data.prices[item.productId];
            if (unit === undefined) {
                return acc;
            }
            return acc + unit * item.amount.length;
        }, 0);

        setAmount({
            subtotal,
            shipping: shippingCosts,
            total: subtotal + shippingCosts,
            currency,
        });
        setDisable(false);
        handleError("");
    }, [
        isNzd,
        isError,
        data,
        state.cart,
        state.total,
        shippingCosts,
        currency,
        countryName,
        setAmount,
        setDisable,
        handleError,
    ]);

    const boxStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    };

    const amountSx = {
        ml: "auto",
        textAlign: "right",
        minWidth: "40%",
        display: "flex",
        justifyContent: "flex-end",
    };

    return (
        <Box>
            <Box sx={boxStyle}>
                <Typography variant="body1">
                    {loading ? <Skeleton width={80} /> : "Subtotal"}
                </Typography>
                <Typography variant="subtitle2" sx={amountSx}>
                    {loading ? (
                        <Skeleton width="100%" />
                    ) : (
                        `${symbol}${amount?.subtotal?.toFixed(2)} ${currency}`
                    )}
                </Typography>
            </Box>
            <Box sx={boxStyle}>
                <Typography variant="body1">
                    {loading ? <Skeleton width={80} /> : "Shipping"}
                </Typography>
                <Typography variant="subtitle2" sx={amountSx}>
                    {loading ? (
                        <Skeleton width="100%" />
                    ) : (
                        `${symbol}${amount?.shipping?.toFixed(2)} ${currency}`
                    )}
                </Typography>
            </Box>
            <Box sx={boxStyle}>
                <Typography variant="body1">
                    {loading ? <Skeleton width={80} /> : "Total"}
                </Typography>
                <Typography variant="subtitle2" sx={amountSx}>
                    {loading ? (
                        <Skeleton width="100%" />
                    ) : (
                        `${symbol}${amount?.total?.toFixed(2)} ${currency}`
                    )}
                </Typography>
            </Box>
        </Box>
    );
};
