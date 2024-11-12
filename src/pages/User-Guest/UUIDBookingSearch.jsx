import React, { useState } from 'react'
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide'
import Footer from '../../Components/Nav-Footer-Chat/Footer'
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from 'axios'
const API = import.meta.env.VITE_API


function UUIDBookingSearch() {
    const [pageParam, setPageParam] = useState({
        input: '',
        errMsg: '',
        isLoading: false
    })
    const [booking, setBooking] = useState(null)


    const hdlInput = (e) => {
        setPageParam(prv => ({ ...prv, input: e.target.value }))
    }

    const hdlSearch = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.get(`${API}/booking/${pageParam.input}`)
            console.log(result.data)
            setBooking(result.data)
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            setPageParam(prv => ({ ...prv, errMsg }))
        }
    }
    return (
        <div>
            <div className='bg-gray-400 relative h-[100px]'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5">
                    <div className="flex mt-20">
                        <form className='flex bg-orange-light-gradient px-4 py-2 rounded-full items-center justify-center shadow-lg' onSubmit={hdlSearch}>
                            <input type='text' placeholder='UUID' className='py-2.5 px-4 w-80 rounded-l-full text-center shadow-inner shadow-gray-400'
                                onChange={hdlInput} />
                            <button className='bg-orange-dark-gradient rounded-r-full py-2 pl-6 text-white text-lg font-bold pr-10'>search</button>
                        </form>
                    </div>
                    {
                        booking &&
                        <div className='flex w-fit bg-luxury-cream-gradient mt-4 rounded-md shadow-xl'>
                            <div className='flex flex-col w-full p-8'>
                                <div className='flex'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex gap-2 items-baseline'>
                                            <h1 className='text-4xl font-bold'>Booking</h1><p className='text-gray-500'> UUID : {booking.UUID} </p>
                                        </div>
                                        <h2 className='flex bg-blue-100 justify-center p-2 text-2xl font-bold text-white bg-orange-dark-pink-gradient w-full'>Hotel Info</h2>
                                        <div className='flex gap-4 bg-white p-4'>
                                            <div className='p-1 border-2 w-fit border-pink-500 rounded-lg'>
                                                <img src={booking.hotels.img} alt={booking.hotels.name} className='w-[400px] max-h-[320px] object-cover rounded-lg' />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-1'>
                                                    <h3 className='text-2xl font-semibold'>{booking.hotels.name}</h3>
                                                    <p className='text-lg'>{booking.hotels.detail}</p>
                                                    <div className='flex gap-2 mt-8'>
                                                        <h4 className='text-lg underline'>Address</h4><p className='text-lg'>{booking.hotels.address}</p>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <h4 className='text-lg underline'>Web Page</h4><p className='text-lg'>{booking.hotels.webPage}</p>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <h4 className='text-lg underline'>Tel.</h4><p className='text-lg'>{booking.hotels.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h2 className='flex justify-center p-2 text-2xl font-bold text-white bg-orange-dark-gradient w-full'>Room Info</h2>
                                            <div className='flex-row-reverse flex gap-4 w-full  bg-white p-4'>

                                                <div className='p-1 border-2 w-fit border-amber-600 rounded-lg'>
                                                    <img src={booking.bookingRooms[0].rooms.images[0].img} alt={booking.bookingRooms[0].rooms.name} className='w-[400px] max-h-[320px] object-cover rounded-lg' />
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-1'>
                                                        <h3 className='text-2xl font-semibold'>{booking.bookingRooms[0].rooms.name}</h3>
                                                        <p className='text-lg text-end'>{booking.bookingRooms[0].rooms.detail}</p>
                                                        <div className='flex gap-2 mt-8'>
                                                            <p className='text-lg underline'>Price</p><p className='text-lg'>{booking.bookingRooms[0].rooms.price} THB/Day</p>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <p className='text-lg underline'>Type</p><p className='text-lg'>{booking.bookingRooms[0].rooms.type}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='flex flex-col w-full gap-2'>
                                            <h2 className='flex justify-center p-2 text-2xl font-bold text-white bg-orange-dark-pink-gradient w-full'>Booking Info</h2>
                                            <div className='flex justify-center items-start'>
                                                <div className='flex items-start w-full justify-between'>
                                                    <div className='flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg'>
                                                        <h1 className='text-center text-2xl font-bold'>Detail</h1>
                                                        <hr className='border-gray-300' />
                                                        <div className='flex gap-1 text-lg'>
                                                            <h2 className='font-semibold'>Booking Date :</h2>
                                                            <h2>{booking.createdAt.split('', 10)}</h2>
                                                        </div>
                                                        <div className='flex justify-center items-center'>
                                                            <div className='flex bg-white border border-gray-400 py-4 px-8 rounded-lg shadow-lg'>
                                                                <div className='flex flex-col gap-1 text-center'>
                                                                    <p className='font-semibold'>Check-in Date</p>
                                                                    <p className='text-sm'>{booking.checkinDate.split('', 10)}</p>
                                                                </div>
                                                            </div>
                                                            <HiOutlineArrowNarrowRight size={50} color='orange' />
                                                            <div className='flex bg-white border border-gray-400 py-4 px-8 rounded-lg shadow-lg'>
                                                                <div className='flex flex-col gap-1 text-center'>
                                                                    <p className='font-semibold'>Check-out Date</p>
                                                                    <p className='text-sm'>{booking.checkoutDate.split('', 10)}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='flex flex-col gap-1'>

                                                            <div className='flex justify-between'>
                                                                <h1 className='text-xl font-semibold'>Status</h1>
                                                                <p className={`font-bold text-xl ${booking.status === 'CONFIRMED' ? 'text-green-500' : 'text-amber-500'}`}>{booking.status}</p>
                                                            </div>
                                                            <hr className='border-gray-300'></hr>
                                                            <div className='flex justify-between'>
                                                                <h1 className='text-2xl font-semibold'>Total</h1>
                                                                <p className='text-orange-500 font-bold text-2xl'>{booking.totalPrice}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg'>
                                                        <h1 className='text-center text-2xl font-bold'>Contact</h1>
                                                        <hr className='border-gray-300' />
                                                        <div className='flex flex-col gap-2'>

                                                            <div className='flex justify-between items-baseline w-[320px]'>
                                                                <h2 className='text-xl font-semibold'>Name :</h2>
                                                                <h2>{booking.firstName + ' ' + booking.lastName}</h2>
                                                            </div>
                                                            <div className='flex justify-between items-baseline'>
                                                                <h2 className='text-xl font-semibold'>Email :</h2>
                                                                <h2>{booking.email}</h2>
                                                            </div>
                                                            <div className='flex justify-between items-baseline'>
                                                                <h2 className='text-xl font-semibold'>Phone :</h2>
                                                                <h2>{booking.phone}</h2>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <PictureSlide />
            <Footer />
        </div>
    )
}

export default UUIDBookingSearch