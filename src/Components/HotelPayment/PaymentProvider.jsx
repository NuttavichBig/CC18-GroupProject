// PaymentProvider.js
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QHdYyBU681vIFBkL7FTVXhlWjLIlvdVbeCAUK4UC8hTsHqUtxMvbb72EQVxIF9sUdU8aJQn3oeDgv17crnmXikJ006cLmV8Fz");

export default function PaymentProvider({ children }) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const res = await axios.post("http://localhost:8000/payment/create-payment-intent");
                setClientSecret(res.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };

        fetchClientSecret();
    }, []);

    const appearance = { theme: 'stripe' };
    const loader = 'auto';

    return (
        <>
            {clientSecret && (
                <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                    {children}
                </Elements>
            )}
        </>
    );
}
