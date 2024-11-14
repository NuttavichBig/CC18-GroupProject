import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import key from '../../assets/key.gif';
import axios from 'axios';
const API = import.meta.env.VITE_API;

function ResetPassword() {
    const { token } = useParams();
    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errMsg, setErrMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const navigate = useNavigate();

    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }));
    };

    const hdlConfirm = async (e) => {
        e.preventDefault();
        try {
            const body = {
                password: input.password,
                confirmPassword: input.confirmPassword
            };
            await axios.patch(`${API}/auth/reset-password`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsModalOpen(true); 
        } catch (err) {
            console.log(err);
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
                        <form className='flex flex-col gap-1 bg-luxury-cream-gradient p-8 rounded-lg shadow-lg relative' onSubmit={hdlConfirm}>
                            <h1 className='text-4xl text-white font-bold absolute -top-10 -left-9 py-2 px-8 rounded-full bg-orange-400'>Reset Password</h1>
                            <div className='flex gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <input 
                                        type="password" 
                                        placeholder='Password' 
                                        name='password' 
                                        onChange={hdlChange} 
                                        value={input.password}
                                        className='p-2 rounded-md shadow-inner shadow-gray-200 w-[400px]' 
                                    />
                                    <input 
                                        type="password" 
                                        placeholder='Confirm Password' 
                                        name='confirmPassword' 
                                        onChange={hdlChange} 
                                        value={input.confirmPassword}
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
                        <h2 className="text-2xl font-semibold mb-4 text-center">Your password has been reset</h2>
                        
                        <div className="flex justify-center mb-6">
                            <img
                                src={key}
                                alt="Success Animation"
                                className="w-24 h-24"
                            />
                        </div>

                        <p className="text-gray-700 mb-6 text-center">
                        Your password has been successfully reset. You can now log in with your new password.
                        </p>
                        <p className="text-gray-600 mb-6 text-sm text-center">
                            If you didn't request a password reset, please contact support immediately.
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

export default ResetPassword;
