import { useEffect, useState, useRef } from 'react';

import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

import { useLocation } from 'react-router-dom';

export const Payment = () => {
    const { state } = useLocation();

    const total = state.quantity * state.data.fields.price

    console.log()

    return (
        <div>
            {state.data.fields.name}  <br />
            {state.quantity} <br />
            ${state.data.fields.price} <br />
            Total
            <br />
            ${total}
            <h1>Payment</h1>
        </div>
    )
}
export default Payment;