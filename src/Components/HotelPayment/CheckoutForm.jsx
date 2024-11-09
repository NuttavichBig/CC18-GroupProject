import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion, useAnimation } from "framer-motion";
import slidebarpic from "../../assets/slideright.gif";
import "../../utills/StripeCSS/stripe.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useBookingStore from "../../stores/booking-store";
import PaymentFormLoading from '../Loading/PaymentsendFormLoading'

export default function CheckoutForm({ dpmCheckerLink }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const controls = useAnimation();
    const id = useBookingStore(state=>state.id)
    console.log(id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            const payload = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });
            console.log('payload', payload)
            if (payload.error) {
                setMessage(payload.error.message || "An unexpected error occurred.");
                controls.start({ x: 0 });

            } else if (payload.paymentIntent && payload.paymentIntent.status === "succeeded") {
                console.log("Payment succeeded");
                setMessage("Payment succeeded!");
                await axios.post("http://localhost:8000/payment/payment-success",{stripeId:payload.paymentIntent.id , bookingId: id })
                setIsLoading(true);

                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/bookinghotel-detail-payment-method-summary');
                }, 2000);
            }
        } catch (error) {
            console.error("Payment error:", error);
            setMessage("An unexpected error occurred.");

        }
    };

    const handleSlideEnd = async (event, info) => {
        const offset = info.offset.x;
        const sliderWidth = 300;
        if (offset >= sliderWidth * 0.8) {
            await handleSubmit(event);
        }
    };


    if (isLoading) {
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

            {message && <div id="payment-message" className="mt-4 text-red-500">{message}</div>}
        </motion.form>
    );
}





//code ลากแล้วปล่อย
// import React, { useState } from "react";
// import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { motion, useAnimation } from "framer-motion";
// import slidebarpic from "../../assets/slideright.gif";
// import "../../utills/StripeCSS/stripe.css";
// import { useNavigate } from "react-router-dom";

// export default function CheckoutForm({ dpmCheckerLink }) {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [message, setMessage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const controls = useAnimation();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) return;

//         setIsLoading(true);
//         const payload = await stripe.confirmPayment({
//             elements,
//             redirect: "if_required",
//         });
//         console.log("payload", payload);
//         if (payload.error) {
//             setMessage(payload.error.message || "An unexpected error occurred.");
//             controls.start({ x: 0 }); // หากเกิดข้อผิดพลาด ให้เลื่อนกลับไปที่จุดเริ่มต้น
//         } else if (payload.paymentIntent && payload.paymentIntent.status === "succeeded") {
//             console.log("Payment succeeded");
//             setMessage("Payment succeeded!");
//             navigate('/bookinghotel-detail-payment-method-summary');
//         }
//         setIsLoading(false);
//     };

//     const handleSlideEnd = async (event, info) => {
//         const offset = info.offset.x;
//         const sliderWidth = 300;
//         if (offset >= sliderWidth * 0.8) {
//             await handleSubmit(event);
//         }
//         // else {
//         //     controls.start({ x: 0 }); // หากเลื่อนไปไม่ถึงสุด ให้เลื่อนกลับไปที่จุดเริ่มต้น
//         // }
//     };

//     return (
//         <motion.form
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col p-6 bg-[#fef6e4] rounded-lg shadow-md space-y-4"
//             onSubmit={handleSubmit}
//         >
//             <h3 className="text-xl font-bold mb-5">Select Payment Method And Pay</h3>

//             <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

//             <div id="dpm-annotation">
//                 <p>
//                     Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
//                     <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">
//                         Preview payment methods by transaction
//                     </a>
//                 </p>
//             </div>

//             <div className="flex justify-center w-full">
//                 <div className="relative bg-gray-300 rounded-full h-12 mt-6 w-1/2 mx-auto">
//                     <motion.div
//                         className="h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold relative z-10"
//                         drag="x"
//                         dragConstraints={{ left: 0, right: 300 }}
//                         onDragEnd={handleSlideEnd}
//                         style={{ width: '150px' }}
//                         whileTap={{ cursor: 'grabbing' }}
//                         animate={controls} // ใช้ animate controls เพื่อควบคุมตำแหน่ง
//                     >
//                         Slide to Pay
//                         <img
//                             src={slidebarpic}
//                             alt="slide button"
//                             className="absolute top-20 transform -translate-y-1/2 right-4"
//                         />
//                     </motion.div>
//                 </div>
//             </div>

//             {message && <div id="payment-message" className="mt-4 text-red-500">{message}</div>}
//         </motion.form>
//     );
// }




