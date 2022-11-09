import { forwardRef, useState, useImperativeHandle } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

import CountryDropdown from '@/components/CountryDropdown';
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
    const { cart, total }: any = useCartContext();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        const cardElement: any = elements.getElement(CardCvcElement);

        if (!cardElement) {
            console.log("No card")
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
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
            },
        });
        if (error) {
            console.log('error', error);
            setProcessing(false);
            return
        }
        try {
            const res = await fetch('http://localhost:8080', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer sk_test_cI1qmNHPKOVmrN7aEShwJZU500Oalhs92e`
                },
                body: JSON.stringify({
                    amount: total,
                    currency: 'NZD',
                    name: values.fullname,
                })
            })
            const data = await res.json();
            console.log("Test", data);

            const response = await stripe.confirmCardPayment(data.client_secret, {
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
            console.log("RESPONSE", response)
        }
        catch (error) {
            console.log(error);
        }

        console.log('PaymentMethod', paymentMethod);
        setProcessing(false);
    };

    return (
        <>
            {cart &&
                <Stack spacing={2}>
                    {cart.map((item: any, index: number) =>
                        <p key={index}>{item.name}</p>
                    )}
                    Amout to pay: ${total}
                    <TextField label="Full name" name="fullname" variant="outlined" required fullWidth
                        value={values.fullname}
                        onChange={e => setValues({ ...values, fullname: e.target.value })}
                    />
                    <TextField label="Email" name="email" variant="outlined" required fullWidth
                        value={values.email}
                        onChange={e => setValues({ ...values, email: e.target.value })}
                    />
                    <TextField label="Billing Address" name="billingAddress" variant="outlined" required fullWidth
                        value={values.billingAddress}
                        onChange={e => setValues({ ...values, billingAddress: e.target.value })}
                    />
                    <TextField label="City" name="city" variant="outlined" required fullWidth
                        value={values.city}
                        onChange={e => setValues({ ...values, city: e.target.value })}
                    />
                    <TextField label="State/Region" name="state" variant="outlined" required fullWidth
                        value={values.state}
                        onChange={e => setValues({ ...values, state: e.target.value })}
                    />
                    <CountryDropdown
                        value={values.country}
                        id={"country"}
                        label={"Country"}
                        onChange={(e: any) => setValues({ ...values, country: e.target.value })}
                    />
                    <TextField label="Zip" name="zip" variant="outlined" required fullWidth
                        value={values.zip}
                        onChange={e => setValues({ ...values, zip: e.target.value })}
                    />
                    <TextField label="Card number" name="ccnumber" variant="outlined" required fullWidth
                        InputProps={{
                            inputComponent: StripeElement,
                            inputProps: { component: CardNumberElement }
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField label="Expiry date" name="ccexp" variant="outlined" required fullWidth
                        InputProps={{
                            inputComponent: StripeElement,
                            inputProps: { component: CardExpiryElement }
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField label="CVC" name="cvc" variant="outlined" required fullWidth
                        InputProps={{
                            inputComponent: StripeElement,
                            inputProps: { component: CardCvcElement },
                        }}
                        InputLabelProps={{ shrink: true }}
                    />

                    <LoadingButton loading={processing} onClick={handleSubmit}>Pay </LoadingButton>
                </Stack>
            }
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