import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import slidebarpic from "../../assets/slideright.gif";
import "../../utills/StripeCSS/stripe.css";

export default function CheckoutForm({ dpmCheckerLink }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        const payload = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
        console.log("payload", payload);
        if (payload.error) {
            setMessage(payload.error.message || "An unexpected error occurred.");
        } else if (payload.paymentIntent && payload.paymentIntent.status === "succeeded") {
            console.log("Payment succeeded");
            setMessage("Payment succeeded!");
        }
        setIsLoading(false);
    };

    const handleSlideEnd = async (event, info) => {
        const offset = info.offset.x;
        const sliderWidth = 300;
        if (offset >= sliderWidth * 0.9) {
            await handleSubmit(event); // ใช้ await เพื่อให้การเรียก handleSubmit ทำงานสมบูรณ์ก่อน
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col p-6 bg-[#fef6e4] rounded-lg shadow-md space-y-4"
            onSubmit={handleSubmit}
        >
            <h3 className="text-xl font-bold">Select Payment Method And Pay</h3>

            {/* ฟอร์ม Stripe Payment Element */}
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            {/* การแสดงตัวเลือก Dynamic Payment Methods */}
            <div id="dpm-annotation">
                <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">
                        Preview payment methods by transaction
                    </a>
                </p>
            </div>

            {/* ปุ่ม Slide สำหรับการชำระเงิน */}
            <div className="flex justify-center w-full">
                <div className="relative bg-gray-300 rounded-full h-12 mt-6 w-1/2 mx-auto">
                    <motion.div
                        className="h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold relative z-10"
                        drag="x"
                        dragConstraints={{ left: 0, right: 330 }}
                        onDragEnd={handleSlideEnd}
                        style={{ width: '150px' }}
                        whileTap={{ cursor: 'grabbing' }}
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

            {/* แสดงข้อความแสดงผลลัพธ์ */}
            {message && <div id="payment-message" className="mt-4 text-red-500">{message}</div>}
        </motion.form>
    );
}
