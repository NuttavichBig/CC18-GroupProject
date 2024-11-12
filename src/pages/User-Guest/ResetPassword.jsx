import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import axios from 'axios';
const API = import.meta.env.VITE_API


function ResetPassword() {
    const { token } = useParams();
    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
    })
    const [errMsg ,setErrMsg] = useState('')

    const navigate = useNavigate();

    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }
    const hdlConfirm = async(e)=>{
        e.preventDefault();
        try{
            const body = {
                password : input.password,
                confirmPassword  :input.confirmPassword
            }
            console.log(input)
            await axios.patch(`${API}/auth/reset-password`,body,{
                headers :{
                    Authorization : `Bearer ${token}`
                }
            })
            navigate('/')
        }catch(err){
            console.log(err)
            const errMsg = err.response?.data?.message || err.message
            setErrMsg(errMsg)
        }
    }
    
    return (
        <div>
            <div className='bg-gray-400 relative h-[100px]'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5">

                    <div className="mx-auto mt-80">
                        <form className='flex flex-col gap-1 bg-luxury-cream-gradient p-8 rounded-lg shadow-lg relative' onSubmit={hdlConfirm}>
                            <h1 className='text-4xl text-white font-bold absolute -top-10 -left-9 py-2 px-8 rounded-full bg-orange-400'>Reset Password</h1>
                            <div className='flex gap-4'>

                                <div className='flex flex-col gap-2'>
                                    <input type="password" placeholder='password' name='password' onChange={hdlChange} value={input.password}
                                        className='p-2 rounded-md shadow-inner shadow-gray-200 w-[400px]' />
                                    <input type="password" placeholder='confirm password' name='confirmPassword' onChange={hdlChange} value={input.confirmPassword}
                                        className='p-2 rounded-md shadow-inner shadow-gray-200 w-[400px]' />
                                    {/* <button className='bg-orange-400 text-lg text-white py-1 px-6 rounded-full font-semibold absolute -bottom-4 right-8 '>Confirm</button> */}
                                </div>
                                <button className='bg-orange-400 px-6 rounded-lg text-white text-lg font-semibold shadow-lg hover:bg-orange-500 active:shadow-inner active:shadow-gray-300'>Confirm</button>
                            </div>
                            <p className='text-sm text-red-500'>{errMsg}</p>
                        </form>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ResetPassword