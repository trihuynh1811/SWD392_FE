import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_51OsHZUGbEbQ0nPlDmozfqb0YVCLTp9jIhOZKwxbIDfYoQOR8yz5lyJdjTtRKN4mkOJVi2LDHAw86ksdapAFb3wUn00lnJawmvD";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}
