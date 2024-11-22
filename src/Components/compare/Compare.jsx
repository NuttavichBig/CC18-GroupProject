import React, { useState } from 'react'
import compare from "../../assets/compare.svg"
import useCompareStore from '../../stores/compare-store'
import { useShallow } from 'zustand/shallow'
import { useNavigate } from 'react-router-dom'

export default function Compare() {
    const navigate = useNavigate();
    const { items, clearItem, deleteItem, isOpen, setOpen } = useCompareStore(useShallow(state => ({
        items: state.items,
        clearItem: state.clearItem,
        deleteItem: state.deleteItem,
        isOpen: state.isOpen,
        setOpen: state.setOpen
    })))

    const hdlCompare = () => {
        if (items.length >= 2) {
            navigate('/compare')
        }
    }

    console.log(items)

    return (
        <div className='fixed z-[60] bottom-6 right-28'>
            {
                isOpen ?
                    <div className='px-4 relative py-2 bg-white rounded-lg text-black flex flex-col shadow-lg'>
                         <button className='border-2 border-black flex justify-center items-center absolute -right-1 -top-1 text-black h-6 w-6 rounded-full hover:border-red-500 hover:text-red-500'
                                onClick={() => { setOpen(false) }}>X</button>
                        {items.length > 0 ?
                            <div className='flex flex-col gap-1'>
                                {items.map((item, index) =>
                                    <div key={index} className='flex gap-4 items-center justify-start px-4 py-1 border-b border-gray-300'>
                                        <button onClick={() => deleteItem(index)}
                                            className='text-red-500 rounded-full h-6 w-6 border-red-500 border-2 flex items-center justify-center hover:border-black hover:text-black'>
                                            X
                                        </button>
                                        <img src={item.room.images[0].img} alt="" className='h-12 w-12 object-cover rounded-lg' />
                                        <p className='text-black text-base'>{item.room.name}</p>
                                    </div>
                                )}
                            </div>
                            :
                            <p>Please select at least two room  to compare</p>

                        }
                        <div className='flex gap-2 self-end mt-4'>
                            <button className={`text-white py-1 px-4 rounded-lg ${items.length >= 2 ? 'bg-gradient-to-r from-[#f08a4b] to-[#e05b3c]  hover:from-blue-400 hover:to-blue-700' : 'bg-gray-500'}`}
                                onClick={hdlCompare}
                                disabled={items.length >= 2 ? false : true}>Compare</button>
                            <button className={`  text-white rounded-lg py-1 px-4 ${items.length > 0 ? 'bg-red-500 hover:bg-gray-500' : 'bg-gray-500'}`} disabled={items.length > 0 ? false : true}
                                onClick={() => clearItem()}>Clear All</button>
                        </div>
                    </div>

                    :

                    <div className='bg-white py-3 px-6 flex justify-center items-center rounded-full text-orange-500 font-semibold hover:bg-orange-300 cursor-pointer shadow-lg'
                        onClick={() => { setOpen(true) }}>
                        <img src={compare} alt="compare icon" className='h-8' />
                    </div>
            }


        </div>
    )
}
