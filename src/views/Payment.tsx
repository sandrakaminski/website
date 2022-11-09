import { forwardRef, useState, useImperativeHandle } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

import CountryDropdown, { CurrencyExchange, CountryCurrency } from '@/components/CountryDropdown';
import { useCartContext } from "@/views/Cart/cartProvider";

const Payment = () => {
    const key: string = import.meta.env.VITE_STRIPE_TEST_KEY;
    const stripePromise = loadStripe(key);

    return (
        <Elements stripe={stripePromise}>
            <ReqPayment />
        </Elements>
    )
}

export default Payment;

type Init = {
    [key: string]: string
}

type Error = {
    state: boolean,
    message: string | undefined
}

const init: Init = {
    fullname: '',
    email: '',
    billingAddress: '',
    city: '',
    state: '',
    country: '',
    zip: ''
}

const ReqPayment = () => {
    const [values, setValues] = useState<Init>(init);
    const [processing, setProcessing] = useState<boolean>(false);
    const [subErr, setSubErr] = useState<Error>({
        state: false,
        message: ''
    });
    const [exchangeRate, setExchangeRate] = useState<number>(0);
    const [success, setSuccess] = useState<boolean>(false);

    const { cart }: any = useCartContext();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        const cardElement: any = elements.getElement(CardCvcElement);

        if (!cardElement) {
            setSubErr({ state: true, message: "No card" });
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: values.email,
                name: values.fullname,
                address: {
                    city: values.city,
                    country: values.country,
                    line1: values.billingAddress,
                    postal_code: values.zip,
                    state: values.state
                }
            }
        });
        if (error) {
            setSubErr({ state: true, message: error.message });
            setProcessing(false);
            return
        }
        try {
            const cost = Math.round(exchangeRate * 100).toString().replace(".", "");
            const symbol: any = CountryCurrency(values.country).toString();
            const res = await fetch('http://localhost:8080', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer sk_test_cI1qmNHPKOVmrN7aEShwJZU500Oalhs92e`
                },
                body: JSON.stringify({
                    type: 'card',
                    amount: cost,
                    currency: symbol.toString(),
                })
            })
            const data = await res.json();

            await stripe.confirmCardPayment(data.client_secret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: values.email,
                        name: values.fullname,
                        address: {
                            city: values.city,
                            country: values.country,
                            line1: values.billingAddress,
                            postal_code: values.zip,
                            state: values.state
                        }
                    },
                }
            })
        }
        catch (error: any) {
            setSubErr({ state: true, message: error.message });
            setProcessing(false);
        }
        setProcessing(false);
        setSuccess(true);
    };

    return (
        <>
            {cart &&
                <Grid container spacing={2}>
                    <Grid xs={12} >
                        {cart.map((item: any, index: number) =>
                            <p key={index}>{item.name}</p>
                        )}
                        <CurrencyExchange exchangeRate={exchangeRate} setExchangeRate={setExchangeRate} country={values.country} />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField label="Full name" name="fullname" variant="outlined" required fullWidth
                            value={values.fullname}
                            onChange={e => setValues({ ...values, fullname: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField label="Email" name="email" variant="outlined" required fullWidth
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
                    <Grid xs={12} sm={6}>
                        <TextField label="City" name="city" variant="outlined" required fullWidth
                            value={values.city}
                            onChange={e => setValues({ ...values, city: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField label="State/Region" name="state" variant="outlined" required fullWidth
                            value={values.state}
                            onChange={e => setValues({ ...values, state: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <CountryDropdown
                            value={values.country}
                            id={"country"}
                            label={"Country"}
                            onChange={(e: any) => setValues({ ...values, country: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField label="Zip" name="zip" variant="outlined" required fullWidth
                            value={values.zip}
                            onChange={e => setValues({ ...values, zip: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField label="Card number" name="ccnumber" variant="outlined" required fullWidth
                            InputProps={{
                                inputComponent: StripeElement,
                                inputProps: { component: CardNumberElement }
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={3}>
                        <TextField label="Expiry date" name="ccexp" variant="outlined" required fullWidth
                            InputProps={{
                                inputComponent: StripeElement,
                                inputProps: { component: CardExpiryElement }
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={3}>
                        <TextField label="CVC" name="cvc" variant="outlined" required fullWidth
                            InputProps={{
                                inputComponent: StripeElement,
                                inputProps: { component: CardCvcElement },
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <LoadingButton loading={processing} onClick={handleSubmit}>Pay </LoadingButton>
                </Grid>
            }
            {success && <p>Payment successful</p>}
            {subErr.state && <p>{subErr.message}</p>}
        </>
    )
}

// wrap Stripe Element for Material UI look & feel while surfacing all interactions
const StripeElement = forwardRef((props: any, ref: any) => {
    const { component: Component, ...rest } = props;

    useImperativeHandle(ref, () => ({
        focus: () => ref.current.focus
    }));

    return (
        <Component onReady={(component: any) => (ref.current = component)} {...rest} />
    );
})