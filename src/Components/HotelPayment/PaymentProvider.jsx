// // PaymentProvider.js
// import React, { useState, useEffect } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51QHdYyBU681vIFBkL7FTVXhlWjLIlvdVbeCAUK4UC8hTsHqUtxMvbb72EQVxIF9sUdU8aJQn3oeDgv17crnmXikJ006cLmV8Fz");

// export default function PaymentProvider({ children }) {
//     const [clientSecret, setClientSecret] = useState("");

//     useEffect(() => {
//         const fetchClientSecret = async () => {
//             try {
//                 const res = await axios.post("http://localhost:8000/payment/create-payment-intent", {});
//                 setClientSecret(res.data.clientSecret);
//             } catch (error) {
//                 console.error("Error fetching client secret:", error);
//             }
//         };

//         fetchClientSecret();
//     }, []);

//     const appearance = {
//         theme: 'stripe', // หรือ 'flat', 'night', 'none' ฯลฯ
//         variables: {
//             colorPrimary: '#FFA500', // กำหนดสีหลักเป็นสีส้ม
//             colorBackground: '#fffaf0', // สีพื้นหลังแบบอ่อน
//             colorText: '#333333', // สีข้อความ
//             borderRadius: '10px', // กำหนดขอบมุม
//             spacingUnit: '10px', // ระยะห่างระหว่างองค์ประกอบ
//             fontSizeBase: '16px' // ขนาดฟอนต์
//         },
//         rules: {
//             '.Input': {
//                 border: '1px solid #FFA500', // กรอบสีส้มสำหรับฟิลด์ input
//                 padding: '10px' // เพิ่ม padding
//             },
//             '.Tab, .Label': {
//                 color: '#333333', // กำหนดสีข้อความในแท็บและ label
//                 fontSize: '16px' // ขนาดฟอนต์ในแท็บและ label
//             },
//             '.Tab--selected': {
//                 backgroundColor: '#fffaf0', // สีพื้นหลังเมื่อแท็บถูกเลือก
//                 borderColor: '#FFA500' // สีกรอบเมื่อแท็บถูกเลือก
//             }
//         }
//     };

//     const loader = 'auto';

//     return (
//         <>
//             {clientSecret && (
//                 <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
//                     {children}
//                 </Elements>
//             )}
//         </>
//     );
// }



// PaymentProvider.js
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import LoadingRainbow from "../Loading/LoadingRainbow";
import useHotelStore from "../../stores/hotel-store";
import useBookingStore from "../../stores/booking-store";
import { useShallow } from "zustand/shallow";

const stripePromise = loadStripe("pk_test_51QHdYyBU681vIFBkL7FTVXhlWjLIlvdVbeCAUK4UC8hTsHqUtxMvbb72EQVxIF9sUdU8aJQn3oeDgv17crnmXikJ006cLmV8Fz");

export default function PaymentProvider({ children }) {
    const {clientSecret , setClientSecret} =  useBookingStore(useShallow(state=>({
        clientSecret  :state.clientSecret,
        setClientSecret  :state.setClientSecret
    })))

    const summary = useHotelStore(state=>state.summary)
    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const res = await axios.post("http://localhost:8000/payment/create-payment-intent", {totalPrice: summary});
                setClientSecret(res.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };

        fetchClientSecret();
    }, []);

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#FFA500',
            colorBackground: '#fffaf0',
            colorText: '#333333',
            borderRadius: '10px',
            spacingUnit: '10px',
            fontSizeBase: '16px'
        },
        rules: {
            '.Input': {
                border: '1px solid #FFA500',
                padding: '10px'
            },
            '.Tab, .Label': {
                color: '#333333',
                fontSize: '16px'
            },
            '.Tab--selected': {
                backgroundColor: '#fffaf0',
                borderColor: '#FFA500'
            }
        }
    };

    const loader = 'auto';

    // ถ้า clientSecret ยังไม่มี ให้แสดง LoadingBooking
    if (!clientSecret) {
        return <LoadingRainbow />;
    }

    return (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
            {children}
        </Elements>
    );
}
