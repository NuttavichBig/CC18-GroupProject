import React, { useState } from 'react'
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide'
import Footer from '../../Components/Nav-Footer-Chat/Footer'
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage'
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain'
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
                    <SearchBoxMain handleSearch={() => { }} />

                    <div className="flex mt-8">
                        <form className='flex bg-orange-light-gradient px-4 py-2 rounded-full items-center justify-center shadow-lg' onSubmit={hdlSearch}>
                            <input type='text' placeholder='UUID' className='py-2.5 px-4 w-80 rounded-l-full text-center shadow-inner shadow-gray-400'
                                onChange={hdlInput} />
                            <button className='bg-orange-dark-gradient rounded-r-full py-2 pl-6 text-white text-lg font-bold pr-10'>search</button>
                        </form>
                    </div>
                    {
                        booking &&
                        <div className='flex w-fit bg-luxury-cream-gradient mt-4 rounded-md shadow-xl'>
                            <div className='flex flex-col p-8'>
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
                                            <h2 className='flex bg-blue-100 justify-center p-2 text-2xl font-bold text-white bg-orange-dark-gradient w-full'>Room Info</h2>
                                            <div className='flex-row-reverse flex gap-4 justify-end w-full  bg-white p-4'>

                                                <div className='p-1 border-2 w-fit border-amber-600 rounded-lg'>
                                                    <img src={booking.bookingRooms[0].rooms.images[0].img} alt={booking.bookingRooms[0].rooms.name} className='w-[400px] max-h-[320px] object-cover rounded-lg' />
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-1 items-end'>
                                                        <h3 className='text-2xl font-semibold'>{booking.bookingRooms[0].rooms.name}</h3>
                                                        <p className='text-lg text-end'>{booking.bookingRooms[0].rooms.detail}</p>
                                                        <div className='flex gap-2 mt-8'>
                                                            <p className='text-lg'>{booking.bookingRooms[0].rooms.price} THB/Day</p>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <p className='text-lg'>{booking.bookingRooms[0].rooms.type} Room</p>
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