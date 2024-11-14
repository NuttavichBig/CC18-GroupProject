import React, { useState } from 'react';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import key from '../../assets/key.gif';
const API = import.meta.env.VITE_API;

function ForgetPassword() {
    const [input, setInput] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const navigate = useNavigate();

    const hdlChange = (e) => {
        setInput(e.target.value);
    };

    const hdlConfirm = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${API}/auth/forgot-password`, { email: input });
            setIsModalOpen(true); 
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            setErrMsg(errMsg);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/'); 
    };

    return (
        <div>
            <div className='bg-white relative h-[132px] shadow-md'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5">
                    <div className="mx-auto mt-80">
                        <form
                            className='flex flex-col gap-1 bg-luxury-cream-gradient p-8 rounded-lg shadow-lg relative'
                            onSubmit={hdlConfirm}
                        >
                            <h1 className='text-4xl text-white font-bold absolute -top-10 -left-9 py-2 px-8 rounded-full bg-orange-400'>Forget Password</h1>
                            <div className='flex gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <input
                                        type="text"
                                        placeholder='Your Email'
                                        name='email'
                                        onChange={hdlChange}
                                        value={input}
                                        className='p-2 rounded-md shadow-inner shadow-gray-200 w-[400px]'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='bg-orange-400 px-6 rounded-lg text-white text-lg font-semibold shadow-lg hover:bg-orange-500 active:shadow-inner active:shadow-gray-300'
                                >
                                    Confirm
                                </button>
                            </div>
                            <p className='text-sm text-red-500'>{errMsg}</p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Password Reset Requested</h2>
                        
                        <div className="flex justify-center mb-6">
                            <img
                                src={key}
                                alt="Success Animation"
                                className="w-24 h-24"
                            />
                        </div>

                        <p className="text-gray-700 mb-6 text-center">
                            We've sent an email to {input} with instructions on how to reset your password.
                        </p>
                        <p className="text-gray-600 mb-6 text-sm text-center">
                        Please check your inbox (and spam folder) for the reset link.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-orange-400 text-white text-lg font-semibold rounded-md hover:bg-orange-500 transition"
                            >
                                Got it! Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgetPassword;
