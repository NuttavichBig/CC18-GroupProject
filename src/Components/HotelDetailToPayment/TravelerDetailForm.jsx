import React from 'react';
import { useNavigate } from 'react-router-dom';

const TravelerDetailForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");


        navigate('/bookinghotel-detail-payment-method');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#fef6e4] p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Traveler Details :</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700">Title :</label>
                    <select className="w-full p-2 mt-1 rounded bg-[#fef0d6]">
                        <option>drop down select</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Last Name :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
                </div>
                <div>
                    <label className="block text-gray-700">Name :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
                </div>
                <div>
                    <label className="block text-gray-700">Email :</label>
                    <input type="email" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
                </div>
                <div>
                    <label className="block text-gray-700">Phone :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
                </div>
                <div>
                    <label className="block text-gray-700">Date of Birth:</label>
                    <div className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="DD" className="w-full p-2 rounded bg-[#fef0d6]" />
                        <input type="text" placeholder="MM" className="w-full p-2 rounded bg-[#fef0d6]" />
                        <input type="text" placeholder="YYYY" className="w-full p-2 rounded bg-[#fef0d6]" />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700">Nationality :</label>
                    <select className="w-full p-2 mt-1 rounded bg-[#fef0d6]">
                        <option>drop down select</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Promotion Code :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold">Total Price</p>
                <div className="text-right">
                    <p className="text-xl font-bold text-orange-500">THB 3,890.00</p>
                    <p className="text-sm text-gray-500 line-through">THB 5,186.67</p>
                </div>
            </div>
            <button type="submit" className="flex justify-center items-center m-auto w-[150px] mt-6 bg-orange-500 text-white py-2 rounded">
                Continue to Pay
            </button>
        </form>
    );
};

export default TravelerDetailForm;
