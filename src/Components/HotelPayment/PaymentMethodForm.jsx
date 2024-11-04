// PaymentMethodForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import slidebarpic from '../../assets/slideright.gif';
import QRpic from '../../assets/QRCODE.jpg'

function PaymentMethodForm() {
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');


    const handleSlideEnd = (event, info) => {
        const offset = info.offset.x;
        const sliderWidth = 330; // ตั้งค่าความกว้างของการเลื่อน

        // ตรวจสอบว่าลากไปถึงจุดสุดท้าย
        if (offset >= sliderWidth * 0.99) {
            handleSubmit(event); // ส่งฟอร์มเมื่อถึงจุดสุดท้าย
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Payment Confirmed! Form Submitted.");
    };

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col p-6 bg-[#fef6e4] rounded-lg shadow-md space-y-4"
            onSubmit={handleSubmit}
        >
            <h3 className="text-xl font-bold">How would you like to pay?</h3>
            <div className="flex space-x-4 mb-4">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-lg ${paymentMethod === 'Credit Card' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    onClick={() => setPaymentMethod('Credit Card')}
                >
                    Credit Card
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-lg ${paymentMethod === 'QR Payment' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    onClick={() => setPaymentMethod('QR Payment')}
                >
                    QR Payment
                </button>
            </div>

            {paymentMethod === 'Credit Card' && (
                <div className="space-y-4">
                    <p className="font-bold">Use Another Card</p>

                    <div>
                        <p className="font-medium">Card Number</p>
                        <input type="text" placeholder="Card Number" className="w-full p-2 border rounded-md bg-orange-100" />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex flex-col w-1/2">
                            <p className="font-medium">Valid</p>
                            <input type="text" placeholder="Valid" className="w-full p-2 border rounded-md bg-orange-100" />
                        </div>

                        <div className="flex flex-col w-1/2">
                            <p className="font-medium">CVV/CVN</p>
                            <input type="text" placeholder="CVV/CVN" className="w-full p-2 border rounded-md bg-orange-100" />
                        </div>
                    </div>

                    <div>
                        <p className="font-medium">Name on Card</p>
                        <input type="text" placeholder="Name on Card" className="w-full p-2 border rounded-md bg-orange-100" />
                    </div>
                </div>
            )}
            {paymentMethod === 'QR Payment' && (
                <div className="flex justify-center items-center mb-6 space-x-8">
                    <div className="text-center">
                        <p className="text-lg font-medium mb-4">Scan QR Code</p>
                        <div className="border border-gray-300 p-4 bg-gray-100 rounded-lg">
                            <img src={QRpic} alt="QR Code" className="w-48 h-48" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-left">
                        <h4 className="text-lg font-medium">Payment Details</h4>
                        <p className='ml-5'>Company Name: Hotel Book Ltd.</p>
                        <p className='ml-5'>Email: konkamonfungsuk@gmail.com</p>
                    </div>
                </div>
            )}

            {/* Slide to Pay */}
            <div className="flex justify-center w-full">
                <div className="relative bg-gray-300 rounded-full h-12 mt-6 w-1/2 mx-auto">
                    <motion.div
                        className="h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold relative z-10"
                        drag="x"
                        dragConstraints={{ left: 0, right: 330 }} // ตั้งค่าให้ตรงกับความกว้างการเลื่อนที่ต้องการ
                        onDrag={handleSlideEnd}
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
        </motion.form>
    );
}

export default PaymentMethodForm;
