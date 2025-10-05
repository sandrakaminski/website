import { useState, JSX } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RemoveIcon from "@mui/icons-material/Remove";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
import { ActionTypes, useCartContext } from "@/views/Cart/cartActions";

const Cart = (): JSX.Element => {
    const navigate = useNavigate();
    const {
        currencyTypes,
        shippingFee,
        checkProductType,
        handleJapanShipping,
    } = useCartHooks();
    const { state, dispatch } = useCartContext();
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
        handleError("");
    };

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

    const jpShipping = handleJapanShipping({ country, amount });
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

    const errHandler = (code: number) => {
        if (code === 400) {
            handleError(
                "This product is not available in your country. If you would like to purchase, please contact us at info@sandrakaminski.com."
            );
        } else {
            handleError("Error navigating to payment page. Try again later.");
        }
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
            if (!resp.ok) {
                errHandler(resp.status);
            }
            if (resp.ok) {
                const { url } = await resp.json();
                window.location.replace(url);
            }
        } catch {
            handleError("Error navigating to payment page. Try again later.");
        } finally {
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
                    <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
                        <Grid alignItems="stretch" spacing={1} container>
                            <Grid size={{ xs: 12, md: 8, lg: 9 }}>
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
                                                Your Shopping Cart
                                            </Typography>
                                            <Button
                                                endIcon={<DeleteIcon />}
                                                onClick={() =>
                                                    dispatch({
                                                        type: ActionTypes.CLEAR,
                                                    })
                                                }>
                                                Clear cart
                                            </Button>
                                        </Stack>
                                        <Stack sx={{ mt: 2 }}>
                                            {state.cart?.map((item, index) => (
                                                <CartItem
                                                    country={country}
                                                    key={index}
                                                    item={item}
                                                    increase={(id) =>
                                                        dispatch({
                                                            type: ActionTypes.INC,
                                                            id,
                                                        })
                                                    }
                                                    decrease={(id) =>
                                                        dispatch({
                                                            type: ActionTypes.DEC,
                                                            id,
                                                        })
                                                    }
                                                    remove={(id) =>
                                                        dispatch({
                                                            type: ActionTypes.REMOVE,
                                                            id,
                                                        })
                                                    }
                                                />
                                            ))}
                                        </Stack>
                                    </>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                                <Stack
                                    sx={{
                                        height: "100%",
                                        p: 2,
                                        borderTop: {
                                            xs: "1px solid rgba(0, 0, 0, 0.12)",
                                            md: 0,
                                        },
                                        borderLeft: {
                                            md: "1px solid rgba(0, 0, 0, 0.12)",
                                            xs: 0,
                                        },
                                    }}
                                    direction="column"
                                    spacing={1}>
                                    <CurrencyExchange
                                        quantity={quantity}
                                        setDisable={setDisable}
                                        setAmount={setAmount}
                                        amount={amount}
                                        shippingCosts={shippingTotal}
                                        country={country}
                                    />
                                    <CountryDropdown
                                        disabled={nzOnly}
                                        id="country"
                                        setCountry={handleSetCountry}
                                    />

                                    <Button
                                        size="large"
                                        disabled={disable}
                                        variant="contained"
                                        loading={processing}
                                        onClick={handlePurchase}>
                                        Continue to checkout
                                    </Button>

                                    <Typography color="GrayText">
                                        Taxes & shipping calculated at checkout
                                    </Typography>
                                    {error.state && (
                                        <Typography color="error">
                                            {error.message}
                                        </Typography>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Card>
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
    const { item, country } = props;
    const navigate = useNavigate();

    const inStock = (): boolean => {
        return item.inStock;
    };
    useQuery({ queryKey: [item.inStock], queryFn: inStock });

    return (
        <Stack
            sx={{
                py: {
                    xs: 1,
                    md: 2,
                },
                px: { sm: 0, md: 1 },
                justifyContent: "space-between",
            }}
            direction="row"
            justifyContent="start">
            <Stack direction="row">
                <Avatar
                    onClick={() => navigate(`/shop/${item.slug}`)}
                    sx={{
                        cursor: "pointer",
                        height: 100,
                        width: 100,
                        borderRadius: 2,
                    }}
                    variant="square"
                    alt={item.name}
                    src={item.featureImage.fields.file.url}
                />

                <Stack
                    sx={{
                        ml: 2,
                        justifyContent: "space-between",
                    }}>
                    <Typography
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/shop/${item.slug}`)}
                        variant="subtitle2"
                        gutterBottom>
                        {item.name}
                    </Typography>

                    <AmountButtons amount={item} {...props} />
                </Stack>
            </Stack>

            <Grid
                sx={{ display: "flex" }}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="start"
                spacing={{
                    xs: 1,
                    sm: 2,
                    md: 4,
                }}>
                <CartItemPrice
                    itemPrice={item.price}
                    country={country}
                />
            </Grid>
        </Stack>
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
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                bgcolor: "background.default",
                borderRadius: 2,
                width: 100,
            }}>
            <IconButton
                color="primary"
                onClick={() => decrease(amount?.productId)}
                size="small">
                {amount?.amount.length === 1 ? (
                    <DeleteIcon fontSize="inherit" />
                ) : (
                    <RemoveIcon fontSize="inherit" />
                )}
            </IconButton>
            <Typography
                variant="subtitle2"
                sx={{
                    p: 1,
                }}>
                {amount?.amount.length}
            </Typography>
            <IconButton
                color="primary"
                onClick={() => increase(amount?.productId)}
                size="small">
                <AddIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
};
