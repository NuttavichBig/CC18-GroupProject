import React, { useEffect, useMemo, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion, useAnimation } from "framer-motion";
import slidebarpic from "../../assets/slideright.gif";
import "../../utills/StripeCSS/stripe.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useBookingStore from "../../stores/booking-store";
import PaymentFormLoading from '../Loading/PaymentsendFormLoading'
import { useShallow } from "zustand/shallow";

export default function CheckoutForm({ dpmCheckerLink }) {
    const stripe = useStripe()
    const elements = useElements()
    const [pageParams , setPageParams] = useState({
        errMsg : '',
        // isLoading : false,
        // stripe : useStripe(),
        // elements : useElements()
    })
    const [isSubmit ,setIsSubmit] = useState(false)
    const navigate = useNavigate();
    const controls = useAnimation();
    const { id, clientSecret,setResponseBooking } = useBookingStore(useShallow(state => ({
        id: state.id,
        clientSecret: state.clientSecret,
        setResponseBooking : state.setResponseBooking
    })))
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('submit')
            if (!pageParams.isLoading) {
                        await stripeCall();

            }
        } catch (error) {
            console.log(error)
            const errMsg = error?.response?.data?.message || error.message
            setPageParams(prv=>({...prv, errMsg : errMsg}));
        }finally{
            controls.start({ x: 0 });
            setPageParams(prv=>({...prv,isLoading : false}))
        }
    };
    const stripeCall = async ()=>{
        if(!stripe || !elements){
            throw new Error("Stripe or Elements not loaded")
        }
        const paymentIntentStatus = await stripe.retrievePaymentIntent(clientSecret)
        if (paymentIntentStatus.paymentIntent.status === 'succeeded') {
            throw new Error('Payment already completed.')
        }
        const payload = await stripe.confirmPayment({
            elements : elements,
            redirect: "if_required",
        });
        console.log('payload', payload)
        if (payload.error) {
            throw new Error('An unexpected error occurred')
        } else if (payload.paymentIntent && payload.paymentIntent.status === "succeeded") {
            console.log("Payment succeeded");
            setPageParams(prv=>({...prv,errMsg : '',isLoading : true}))
            const result= await axios.post("http://localhost:8000/payment/payment-success", { stripeId: payload.paymentIntent.id, bookingId: id })
            const booking = result.data
            setResponseBooking(booking)
            navigate('/bookinghotel-detail-payment-method-summary');
        }
    }
    let debounceTimeout;
    const handleSlideEnd = async (event, info) => {
        const offset = info.offset.x;
        const sliderWidth = 300;
        if (offset >= sliderWidth * 0.8 ) {
            if(isSubmit)return;
            console.log('you')
            setIsSubmit(true)
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(async () => {
            await handleSubmit(event); // Call submit function only once after debounce
        }, 300);
        }else if(offset <= sliderWidth * 0.25){
            setIsSubmit(false)
            
        }
    };


    if (pageParams.isLoading) {
        return <PaymentFormLoading />;
    }

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col p-6 bg-[#fef6e4] rounded-lg shadow-md space-y-4"
            onSubmit={handleSubmit}
        >
            <h3 className="text-xl font-bold mb-5">Select Payment Method And Pay</h3>

            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            <div id="dpm-annotation">
                <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">
                        Preview payment methods by transaction
                    </a>
                </p>
            </div>

            <div className="flex justify-center w-full">
                <div className="relative bg-gray-300 rounded-full h-12 mt-6 w-1/2 mx-auto">
                    <motion.div
                        className="h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold relative z-10"
                        drag="x"
                        dragConstraints={{ left: 0, right: 300 }}
                        onDrag={handleSlideEnd}
                        style={{ width: '150px' }}
                        whileTap={{ cursor: 'grabbing' }}
                        animate={controls}
                    >
                        Slide to Pay
                        <img
                            src={slidebarpic}
                            alt="slide button"
                            className="absolute top-20 transform -translate-y-1/2 right-4"
                        />
                    </motion.div>
                </div>
            </div>

            {pageParams.errMsg && <div id="payment-message" className="mt-4 text-red-500">{pageParams.errMsg}</div>}
        </motion.form>
    );
}