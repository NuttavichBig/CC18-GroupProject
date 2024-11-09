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
        <form onSubmit={handleSubmit} className="bg-luxury-cream-gradient p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-warm-brown">Traveler Details :</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-warm-brown">Name :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                </div>
                <div>
                    <label className="block text-warm-brown">Last Name :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                </div>
                <div>
                    <label className="block text-warm-brown">Title :</label>
                    <select className="w-full p-2 mt-1 rounded bg-cream-gradient border border-orange-light text-warm-brown">
                        <option>drop down select</option>
                    </select>
                </div>
                <div>
                    <label className="block text-warm-brown">Email :</label>
                    <input type="email" className="w-full p-2 mt-1 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                </div>
                <div>
                    <label className="block text-warm-brown">Phone :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                </div>
                <div>
                    <label className="block text-warm-brown">Date of Birth:</label>
                    <div className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="DD" className="w-full p-2 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                        <input type="text" placeholder="MM" className="w-full p-2 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                        <input type="text" placeholder="YYYY" className="w-full p-2 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                    </div>
                </div>
                <div>
                    <label className="block text-warm-brown">Nationality :</label>
                    <select className="w-full p-2 mt-1 rounded bg-cream-gradient border border-orange-light text-warm-brown">
                        <option>drop down select</option>
                    </select>
                </div>
                <div>
                    <label className="block text-warm-brown">Promotion Code :</label>
                    <input type="text" className="w-full p-2 mt-1 rounded bg-cream-gradient border border-orange-light text-warm-brown" />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-warm-brown">Total Price</p>
                <div className="text-right">
                    <p className="text-xl font-bold text-orange-500">THB 3,890.00</p>
                    <p className="text-sm text-gray-500 line-through">THB 5,186.67</p>
                </div>
            </div>
            <button type="submit" className="flex justify-center items-center m-auto w-[150px] mt-6 bg-orange-dark-gradient text-white py-2 rounded-full shadow-lg transition-ease hover:scale-105">
                Continue to Pay
            </button>
        </form>
    );
};

export default TravelerDetailForm;
