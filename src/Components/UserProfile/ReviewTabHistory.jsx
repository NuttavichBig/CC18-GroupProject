import React, { useEffect, useState } from 'react';
import dropdownIcon from '../../assets/drop-down-arrow-icon_Mypurchase.gif';
import axios from 'axios';
import useUserStore from '../../stores/user-store';
const API = import.meta.env.VITE_API

function ReviewTabHistory() {
    const [selectedHotelIndexes, setSelectedHotelIndexes] = useState([]);
    const [hotelReviewList, setHotelReviewList] = useState([])
    const [edit, setEdit] = useState({
        editIndex: null,
        input: {
            content: '',
            rating: null,
            file: null,
            deleteImg: false
        }
    })

    useEffect(() => {
        getHotel()
    }, [])
    useEffect(() => {

    }, [edit.editIndex])


    const token = useUserStore(state => state.token)

    const getHotel = async () => {
        const result = await axios.get(`${API}/review?limit=30`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(result.data)
        setHotelReviewList(result.data.data)
    }

    const updateHotel = async () => {
        const body = new FormData()
        body.append('content', edit.input.content)
        body.append('rating', edit.input.rating)
        if (edit.input.file) {
            body.append('img', edit.input.file)
        }
        if (edit.input.deleteImg) {
            body.append('deleteImg', edit.input.deleteImg)
        }
        const result = await axios.patch(`${API}/review/${hotelReviewList[edit.editIndex].id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let newArr = [...hotelReviewList]
        newArr[edit.editIndex] = result.data.review
        setHotelReviewList(newArr)
        setEdit({
            editIndex: null,
            input: {
                content: '',
                rating: null,
                file: null,
                deleteImg: false
            }
        })
    }

    const hdlDeleteReview = async (index) => {
        try {

            const reviewId = hotelReviewList[index].id
            await axios.delete(`${API}/review/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let newArr = [...hotelReviewList]
            newArr.splice(index, 1)
            setHotelReviewList(newArr)
        } catch (err) {
            console.log(err.message)
        }
    }

    const hdlEditButton = async (index) => {
        try {
            setEdit({
                editIndex: index,
                input: {
                    content: hotelReviewList[index].content,
                    rating: hotelReviewList[index].rating,
                    file: null,
                    deleteImg: false
                }
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const hdlChangeInput = (e) => {
        setEdit({
            ...edit, input: {
                ...edit.input,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleToggleDetails = (index) => {
        setSelectedHotelIndexes(prevIndexes =>
            prevIndexes.includes(index)
                ? prevIndexes.filter(i => i !== index) 
                : [...prevIndexes, index] 
        );
    };


    const renderStars = (rating) => {
        const fullStars = "★".repeat(rating);
        const emptyStars = "★".repeat(5 - rating);

        return (
            <div className="flex">
                <span className="text-yellow-500">{fullStars}</span>
                <span className="text-gray-300">{emptyStars}</span>
            </div>
        );
    };

    const hdlFileChange = (e) => {
        setEdit(prv => ({ ...prv, input: { ...prv.input, file: e.target.files[0] } }))
    }

    const hdlClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEdit(prv => ({ ...prv, input: { ...prv.input, file: null, deleteImg: true } }))
        document.getElementById('input-file').value = ''
    }

    console.log(edit)
    return (
        <div className="max-w-4xl mx-auto p-8 rounded-lg space-y-4">
            {hotelReviewList.map((review, index) => (
                <div key={index} className="p-4 bg-[#FFF8EC] rounded-lg shadow-lg mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={review.hotel.img}
                                alt={review.hotel.name}
                                className="w-24 h-24 rounded-lg object-cover mr-4"
                            />
                            <div className="text-left">
                                <p className="text-lg font-medium">{review.hotel.name}</p>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">Rating:</span>
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleToggleDetails(index)}>
                            <img
                                src={dropdownIcon}
                                alt="Toggle Details"
                                className={`w-12 h-12 transform ${selectedHotelIndexes.includes(index) ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>
                    {selectedHotelIndexes.includes(index) && (
                        edit.editIndex !== index ?
                            <div className="mt-4 p-4 bg-[#FFE6C4] rounded-lg shadow-md">
                                <p className="font-semibold">Review</p>
                                <div className="mt-2 p-3 bg-[#FFF3D6] rounded-lg shadow-inner">
                                    <p className="text-gray-700">{review.content}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {review.img &&
                                        <img src={review.img} alt={`Review pic`} className="w-full h-40 object-cover rounded-lg" />
                                    }
                                </div>
                                <div className="flex justify-end mt-4 gap-4">
                                    <button
                                        className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-orange-600 transition duration-200 ease-in-out flex items-center"
                                        onClick={() => hdlEditButton(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 font-semibold rounded-xl shadow-md hover:bg-red-600 transition duration-200 ease-in-out flex items-center"
                                        onClick={() => hdlDeleteReview(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="mt-4 p-4 bg-[#FFE6C4] rounded-lg shadow-md">
                                <div className='flex gap-4 items-center'>
                                    <p className="font-semibold">Review</p>
                                    <div className='flex gap-1'>
                                        <span className={`${edit.input.rating >= 1 ? 'text-yellow-500' : 'text-gray-300'} text-xl hover:cursor-pointer`}
                                            onClick={() => setEdit({ ...edit, input: { ...edit.input, rating: 1 } })}>★</span>
                                        <span className={`${edit.input.rating >= 2 ? 'text-yellow-500' : 'text-gray-300'} text-xl hover:cursor-pointer`}
                                            onClick={() => setEdit({ ...edit, input: { ...edit.input, rating: 2 } })}>★</span>
                                        <span className={`${edit.input.rating >= 3 ? 'text-yellow-500' : 'text-gray-300'} text-xl hover:cursor-pointer`}
                                            onClick={() => setEdit({ ...edit, input: { ...edit.input, rating: 3 } })}>★</span>
                                        <span className={`${edit.input.rating >= 4 ? 'text-yellow-500' : 'text-gray-300'} text-xl hover:cursor-pointer`}
                                            onClick={() => setEdit({ ...edit, input: { ...edit.input, rating: 4 } })}>★</span>
                                        <span className={`${edit.input.rating >= 5 ? 'text-yellow-500' : 'text-gray-300'} text-xl hover:cursor-pointer`}
                                            onClick={() => setEdit({ ...edit, input: { ...edit.input, rating: 5 } })}>★</span>
                                    </div>
                                </div>
                                <div className="mt-2 p-3 bg-[#FFF3D6] rounded-lg shadow-inner">
                                    {/* <p className="text-gray-700">{review.content}</p> */}
                                    <textarea name="content"
                                        className='text-gray-700 w-full'
                                        value={edit.input.content}
                                        onChange={hdlChangeInput}
                                        rows={edit.input.content.split('\n').length}></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <input type='file' id='input-file' className='hidden' onChange={hdlFileChange} />
                                    {
                                        (review.img && edit.input.deleteImg === false) ?
                                            <>
                                                <img src={review.img} alt={`Review pic`} className="w-full h-40 object-cover rounded-lg cursor-pointer" onClick={() => document.getElementById('input-file').click()} />
                                                <div className='relative'>

                                                    <p className='text-white absolute border rounded-full w-10 h-10 -left-14 text-center flex items-center justify-center border-white text-2xl hover:bg-red-500 hover:cursor-pointer'
                                                        onClick={hdlClose}>X</p>
                                                </div>
                                            </>
                                            :
                                            edit.input.file ?
                                                <>
                                                    <img src={URL.createObjectURL(edit.input.file)} alt={`Review pic`} className="w-full h-40 object-cover rounded-lg cursor-pointer" onClick={() => document.getElementById('input-file').click()} />
                                                    <div className='relative'>

                                                        <p className='text-white absolute border rounded-full w-10 h-10 -left-14 text-center flex items-center justify-center border-white text-2xl hover:bg-red-500 hover:cursor-pointer'
                                                            onClick={hdlClose}>X</p>
                                                    </div>
                                                </>
                                                :
                                                <div className='w-full h-40 rounded-lg bg-slate-100 cursor-pointer flex items-center justify-center text-2xl' onClick={() => document.getElementById('input-file').click()}>Click to add Image</div>

                                    }
                                </div>
                                <div className="flex justify-end mt-4 gap-4">
                                    <button
                                        className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-orange-600 transition duration-200 ease-in-out flex items-center"
                                        onClick={updateHotel}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 font-semibold rounded-xl shadow-md hover:bg-red-600 transition duration-200 ease-in-out flex items-center"
                                        onClick={() => setEdit({ ...edit, editIndex: null })}
                                    >
                                        Cancle
                                    </button>
                                </div>
                            </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ReviewTabHistory;
