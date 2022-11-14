import { useState } from 'react';

import Close from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

import CountryDropdown, { CurrencyExchange, ShippingCost } from '@/components/PaymentCalc';
import { useCartContext } from "@/views/Cart/cartProvider";

type Init = {
    [key: string]: string
}

type Error = {
    message: {
        [key: string]: string
    },
    state: {
        [key: string]: boolean
    }
}

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

const init: Init = {
    fullname: '',
    email: '',
    billingAddress: '',
    city: '',
    state: '',
    country: '',
    zip: ''
}

const Shipping = () => {
    const [values, setValues] = useState<Init>(init);
    const [processing, setProcessing] = useState<boolean>(false);
    const [error, setError] = useState<Error>({ message: { emai: '', zip: '' }, state: { emai: false, zip: false } });
    const { cart }: any = useCartContext();
    const navigate = useNavigate();

    if (cart.length === 0) {
        navigate("/")
    }

    const deliveryAddress = {
        city: values.city,
        country: values.country,
        line1: values.billingAddress,
        postal_code: values.zip,
        state: values.state
    }

    const disabledFields = () => {
        if (values.fullname === '' || values.email === '' || values.billingAddress === '' || values.city === '' || values.state === '' || values.country === '' || values.zip === '') {
            return true
        }
        return false
    }


    const handleSubmit = async () => {
        setProcessing(true)
        const res = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                name: values.fullname,
                deliveryAddress: deliveryAddress,
                orderItems: cart.map((item: any) => {
                    return {
                        productId: item.id,
                        quantity: item.amount.length
                    }
                })
            })
        });
        if (!validEmail.test(values.email)) {
            setError({
                message: {
                    email: 'Not a valid email address'
                }, state: {
                    email: true
                }
            })
            setProcessing(false);
        }
        else if (values.country === 'NZ' && values.zip.length > 4) {
            setError({
                message: {
                    zip: 'Not a valid NZ zip code'
                }, state: {
                    zip: true
                }
            })
            setProcessing(false);
        }

        else {
            try {
                const data = await res.json();
                window.location.replace(data.url);
            }
            catch (error: any) {
                setProcessing(false);
                console.log(error);
            }
        }
    };

    return (
        <>
            <Button startIcon={<Close />} color="error" onClick={() => navigate("/cart")}>Cancel</Button>
            {cart &&
                <Grid sx={{ px: 4, py: 10 }} spacing={2} container >
                    <Grid component={Stack} direction="column" justifyContent="space-between" spacing={2} md={6}>
                        <List component={Card}>
                            {cart.map((item: any, index: number) =>
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar variant="square" alt={item.name} src={item.image.fields.file.url} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={item.amount.length} />
                                </ListItem>
                            )}
                        </List>
                        <Typography variant="subtitle1">
                            <CurrencyExchange country={values.country} />
                            {/* Shipping:    ${ShippingCost(values.country)} */}
                        </Typography>
                    </Grid>
                    <Grid md={6}>
                        {cart.length > 0 &&
                            <Grid container spacing={2}>
                                <Grid xs={12} >
                                    <Typography variant="h5">Shipping info</Typography>
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField label="Full name" name="fullname" variant="outlined" required fullWidth
                                        value={values.fullname}
                                        onChange={e => setValues({ ...values, fullname: e.target.value })}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        error={error.state.email}
                                        helperText={error.message.email}
                                        label="Email" name="email" variant="outlined" required fullWidth
                                        value={values.email}
                                        onChange={e => setValues({ ...values, email: e.target.value })}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField label="Billing Address" name="billingAddress" variant="outlined" required fullWidth
                                        value={values.billingAddress}
                                        onChange={e => setValues({ ...values, billingAddress: e.target.value })}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField label="City" name="city" variant="outlined" required fullWidth
                                        value={values.city}
                                        onChange={e => setValues({ ...values, city: e.target.value })}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField label="State/Region" name="state" variant="outlined" required fullWidth
                                        value={values.state}
                                        onChange={e => setValues({ ...values, state: e.target.value })}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <CountryDropdown
                                        value={values.country}
                                        id={"country"}
                                        label={"Country"}
                                        onChange={(e: any) => setValues({ ...values, country: e.target.value })}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        error={error.state.zip}
                                        helperText={error.message.zip}
                                        label="Zip" name="zip" variant="outlined" required fullWidth
                                        value={values.zip}
                                        onChange={e => setValues({ ...values, zip: e.target.value })}
                                    />
                                </Grid>
                                <Grid xs={12} >
                                    <LoadingButton disabled={disabledFields()} size="large" variant={"outlined"} loading={processing} onClick={handleSubmit}>Go to payment </LoadingButton>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid >
            }
        </>
    )
}

export default Shipping;