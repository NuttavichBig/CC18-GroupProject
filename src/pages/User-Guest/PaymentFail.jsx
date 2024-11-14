import React from 'react'
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage'
import Footer from '../../Components/Nav-Footer-Chat/Footer'
import { Link } from 'react-router-dom'
import cancelImg from '../../assets/cancle.png'

function PaymentFail() {
  return (

    <div>
    <div className="text-[#543310]">
      <HeaderUserPage />
    </div>
    <div className="flex justify-center items-start mt-[200px] w-1/2 mx-auto">
      <div className="mx-auto px-[50px] py-10">
      <div className='flex flex-col gap-4 p-20'>
        <div className='flex gap-4'>

            <img src={cancelImg} alt="cancel" className='w-20 h-20'/>
            <h2 className='text-3xl font-bold text-red-500'>You Booking has been time's out, Please make a new booking</h2>
        </div>
            <div className='flex flex-col gap-2'>
            <Link to={'/'} className='bg-gray-400 text-white w-1/3 rounded-full self-center text-center py-2 mt-4 hover:bg-blue-500'>Back to main page</Link>
            </div>

        </div>


      </div>
    </div>
    <Footer />
  </div>
  )
}

export default PaymentFail