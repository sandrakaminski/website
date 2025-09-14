import { useState, JSX } from "react";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RemoveIcon from "@mui/icons-material/Remove";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";

import {
    CountryDropdown,
    CurrencyExchange,
    CartItemPrice,
} from "./PaymentCalc";
import { CartSkeleton } from "@/components/Outline";
import { useCartHooks, useErrorHandler } from "@/hooks";
import { ProductTypes } from "@/types";
import { useCartContext } from "@/views/Cart/cartActions";

const Cart = (): JSX.Element => {
    const navigate = useNavigate();
    const {
        currencyTypes,
        shippingFee,
        checkProductType,
        handleJapanChileShipping,
    } = useCartHooks();
    const { state, clear, decrease, increase, remove } = useCartContext();
    const { error, handleError } = useErrorHandler();

    const [processing, setProcessing] = useState<boolean>(false);
    const [nzOnly, setNzOnly] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [disable, setDisable] = useState<boolean>(true);
    const [country, setCountry] = useState<string>("");
    const [amount, setAmount] = useState<{
        shipping: number;
        total: number;
    }>({
        shipping: 0,
        total: 0,
    });

    const category = state.cart.map((item) => item.category);
    const quantity = checkProductType({
        cart: state.cart as ProductTypes[],
        category: category,
    });
    const shippingTotal = shippingFee({ country, category, quantity });
    const currency = currencyTypes(country).toLowerCase();

    const handleSetCountry = (val: string): void => {
        sessionStorage.setItem("country", val);
        setCountry(val);
    };

    //  const getData = async (): Promise<void> => {
    // try {
    //     const res = await fetch("https://geolocation-db.com/json/");
    //     const body = await res.json();
    //     if (!countriesList[body.country_code]) {
    //         handleSetCountry("NZ");
    //         setLoading(false);
    //     }
    //     handleSetCountry(body.country_code);
    //     setLoading(false);
    // } catch {
    //     handleSetCountry("NZ");
    //     setLoading(false);
    // }
    // };

    const trigger = () => {
        if (state.cart.length === 0) {
            sessionStorage.removeItem("country");
        } else if (
            state.cart?.map((item) => item.nzShippingOnly).includes(true)
        ) {
            handleSetCountry("NZ");
            setLoading(false);
            setNzOnly(true);
        } else {
            const memorizedCountry = sessionStorage.getItem("country") || "";
            setNzOnly(false);
            if (memorizedCountry === "") {
                handleSetCountry("NZ");
            } else {
                setCountry(memorizedCountry);
                setLoading(false);
            }
        }
        return [state.cart, country];
    };
    useQuery({ queryKey: [state.cart, country], queryFn: trigger });

    const jpShipping = handleJapanChileShipping({ country, amount });
    const data = {
        country: country,
        currency: currency,
        shipping: parseInt(jpShipping),
        orderItems: state.cart?.map((item) => {
            return {
                productId: item.productId,
                quantity: item.amount.length,
            };
        }),
    };

    const handlePurchase = async (): Promise<void> => {
        setProcessing(true);
        try {
            ReactGA.event({
                category: "Purchase",
                action: `New checkout session for person from ${country}`,
                label: "Purchase",
            });
            const resp = await fetch(`/.netlify/functions/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (resp.ok) {
                const { url } = await resp.json();
                window.location.replace(url);
            } else {
                throw new Error(
                    "Error navigating to payment page. Try again later."
                );
            }
        } catch (err) {
            handleError("Error navigating to payment page. Try again later.");
            setProcessing(false);
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ mt: 4, minHeight: `calc(100vh - 290px)` }}>
                {state.cart && state.cart.length === 0 ? (
                    <Stack
                        sx={{ mt: 10 }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>
                        <ProductionQuantityLimitsIcon sx={{ fontSize: 100 }} />
                        <Typography variant="h3" align="center" gutterBottom>
                            Shopping cart
                        </Typography>
                        <Typography
                            gutterBottom
                            color="grayText"
                            variant="subtitle1">
                            You have nothing in your shopping cart.
                        </Typography>
                        <Button
                            size="large"
                            variant="contained"
                            onClick={() => navigate("/shop")}>
                            Shop now
                        </Button>
                    </Stack>
                ) : (
                    <Grid alignItems="stretch" spacing={1} container>
                        <Grid xs={12} md={8}>
                            <Card
                                variant="outlined"
                                sx={{ p: 2, minHeight: 250 }}>
                                {loading ? (
                                    <CartSkeleton />
                                ) : (
                                    <>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={2}>
                                            <Typography variant="h4">
                                                Shopping cart
                                            </Typography>
                                            <Button
                                                endIcon={<CloseIcon />}
                                                onClick={clear}>
                                                Clear cart
                                            </Button>
                                        </Stack>
                                        <Stack sx={{ mt: 4 }}>
                                            {state.cart?.map((item, index) => (
                                                <CartItem
                                                    country={country}
                                                    key={Number(index)}
                                                    item={item as ProductTypes}
                                                    increase={increase}
                                                    decrease={decrease}
                                                    remove={remove}
                                                />
                                            ))}
                                            <Typography
                                                variant="caption"
                                                color="grayText">
                                                *VAT/GST Included in product
                                                price
                                            </Typography>
                                        </Stack>
                                    </>
                                )}
                            </Card>
                        </Grid>
                        <Grid xs={12} md={4}>
                            <Stack
                                variant="outlined"
                                component={Card}
                                sx={{ height: "100%", p: 2 }}
                                direction="column"
                                justifyContent="space-between"
                                spacing={1}>
                                <CurrencyExchange
                                    quantity={quantity}
                                    setDisable={setDisable}
                                    setAmount={setAmount}
                                    amount={amount}
                                    shippingCosts={shippingTotal}
                                    country={country}
                                />
                                <ButtonGroup size="small">
                                    <CountryDropdown
                                        // loading={loading}
                                        disabled={nzOnly}
                                        id="country"
                                        setCountry={handleSetCountry}
                                    />
                                    <LoadingButton
                                        size="small"
                                        sx={{ width: 200, ml: 1 }}
                                        disabled={disable}
                                        variant="contained"
                                        loading={processing}
                                        onClick={handlePurchase}>
                                        Buy now
                                    </LoadingButton>
                                </ButtonGroup>
                                {error.state && (
                                    <Typography color="error">
                                        {error.message}
                                    </Typography>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default Cart;

type CartItemProps = {
    item: ProductTypes;
    remove: (id: string) => void;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    country: string;
};

const CartItem = (props: CartItemProps): JSX.Element => {
    const { item, remove, country } = props;
    const navigate = useNavigate();

    const inStock = (): boolean => {
        item.inStock ? "In stock" : "Out of stock";
        return item.inStock;
    };
    useQuery({ queryKey: [item.inStock], queryFn: inStock });

    return (
        <Grid
            sx={{ my: 0.5, px: 1 }}
            spacing={2}
            container
            direction="row"
            justifyContent="space-between">
            <Grid alignItems="flex-start" container>
                <Avatar
                    component={Button}
                    onClick={() => navigate(`/shop/${item.slug}`)}
                    sx={{ height: 100, width: 75 }}
                    variant="square"
                    alt={item.name}
                    src={item.featureImage.fields.file.url}
                />
                <Stack justifyContent="space-between" sx={{ ml: 2 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <CartItemPrice itemPrice={item.price} country={country} />
                    <Box
                        sx={{
                            display: { xs: "flex", sm: "none" },
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <AmountButtons amount={item} {...props} />
                        <Button
                            startIcon={<DeleteIcon fontSize="inherit" />}
                            color="error"
                            onClick={() => remove(item.productId)}>
                            Remove
                        </Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid
                sx={{ display: { xs: "none", sm: "flex" } }}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={4}>
                <AmountButtons amount={item} {...props} />
                <Button
                    startIcon={<DeleteIcon fontSize="inherit" />}
                    color="error"
                    onClick={() => remove(item.productId)}>
                    Remove
                </Button>
            </Grid>
        </Grid>
    );
};

type AmountButtonsProps = {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    remove: (id: string) => void;
    amount: {
        amount: number[];
        productId: string;
    };
};

const AmountButtons = (props: AmountButtonsProps): JSX.Element => {
    const { decrease, increase, amount, remove } = props;

    const changeAmount = (): number => {
        if (
            amount?.amount.length === undefined ||
            amount?.amount.length === 0
        ) {
            remove(amount.productId);
        }
        return amount?.amount.length;
    };
    useQuery({
        queryKey: [amount, amount?.productId],
        queryFn: changeAmount,
        refetchOnWindowFocus: false,
    });

    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <IconButton
                onClick={() => decrease(amount?.productId)}
                size="small">
                <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Chip variant="outlined" label={amount?.amount.length} />
            <IconButton
                onClick={() => increase(amount?.productId)}
                size="small">
                <AddIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
};
