import React, { useEffect, useState } from "react";
import CreateRoomRegisterForm from "./CreateRoomRegisterForm";
import axios from "axios";
import useUserStore from "../../stores/user-store";
import Swal from "sweetalert2";
import FormErrorIcon from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'
import LoadingRoomPartnerRegisterForm from "../Loading/LoadingRoomPartnerRegisterForm";
import { FaArrowLeftLong } from "react-icons/fa6";

const API = import.meta.env.VITE_API

function RoomPartnerRegisterForm(props) {
    const { setAllFormData, setPage, allFormData } = props
    const token = useUserStore(state => state.token)
    const [rooms, setRooms] = useState(null)
    const [pageParam, setPageParam] = useState({
        isLoading: false,
        errMsg: '',
    })
    const defaultObject = {
        name: '',
        detail: '',
        price: '',
        size: '',
        type: '',
        recommendPeople: '',
        roomAmount: '',
        files: [null, null, null, null, null],
        facilityRoom: {
            isAirCondition: false,
            isBalcony: false,
            isBathtub: false,
            isPrivateBathroom: false,
            isRefrigerator: false,
            isShower: false,
            isSmoking: false,
            isTelevision: false,
            isView: false,
            isWifi: false,
        }
    }

    useEffect(() => {
        if (allFormData.room) {
            setRooms(allFormData.room)
        } else {
            setRooms([defaultObject])
        }
    }, [])

    const addNewRoom = () => {
        setRooms(prv => ([...prv, defaultObject]))
    }

    const deleteRoom = (index) => {
        setRooms(prv => {
            const newArr = [...prv]
            newArr.splice(index, 1)
            return newArr
        })
    }

    const handleDataConfirm = async () => {
        try {
            setPageParam(prv => ({ ...prv, isLoading: true }))
            if (rooms.length < 1) {
                throw new Error('Should have at least 1 room')
            }
            rooms.forEach((room, index) => {
                if (!room.name.trim() || !room.detail.trim() || !room.price || !room.size || !room.type || !room.recommendPeople || !room.roomAmount) {
                    throw new Error('Please fill all info')
                }
                const image = room.files.filter(el => el !== null)
                if (image.length < 1) {
                    throw new Error('Please upload at least 1 image')
                }
            })
            await createAllData()
            setPageParam(prv => ({ ...prv, errMsg: 'Update Completed' }))

            //alert success
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Register Success</span>
         </div>`,
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                background: "#ffffff",
                didOpen: (toast) => {
                    const progressBar = toast.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.backgroundColor = "green";
                    }
                    toast.addEventListener("click", Swal.close);
                },
            });


            setPage(prv => prv + 1)

        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            setPageParam(prv => ({ ...prv, errMsg }))
            //alert error
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="${FormErrorIcon}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                background: "#ffffff",
                didOpen: (toast) => {
                    const progressBar = toast.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.backgroundColor = "#f44336";
                    }
                    toast.addEventListener("click", Swal.close);
                },
            });
        } finally {
            setPageParam(prv => ({ ...prv, isLoading: false }))
        }
    }

    const createAllData = async () => {
        const partner = await axios.post(`${API}/partner`, allFormData.partner, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(partner)

        const bodyHotel = new FormData()
        bodyHotel.append('name', allFormData.hotel.name)
        bodyHotel.append('detail', allFormData.hotel.detail)
        bodyHotel.append('address', allFormData.hotel.address)
        bodyHotel.append('phone', allFormData.hotel.phone)
        bodyHotel.append('checkinTime', allFormData.hotel.checkinTime)
        bodyHotel.append('checkoutTime', allFormData.hotel.checkoutTime)
        bodyHotel.append('lat', allFormData.hotel.lat)
        bodyHotel.append('lng', allFormData.hotel.lng)
        bodyHotel.append('star', allFormData.hotel.star)
        bodyHotel.append('webPage', allFormData.hotel.webPage)
        Object.entries(allFormData.hotel.facilitiesHotel).forEach(([key, value]) => {
            bodyHotel.append(`facilitiesHotel[${key}]`, value)
        });
        if (allFormData.hotel.file) {
            bodyHotel.append('img', allFormData.hotel.file)
        }
        const hotel = await axios.post(`${API}/hotel`, bodyHotel, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(hotel)

        rooms.forEach(async (room, index) => {
            const bodyRoom = new FormData()
            bodyRoom.append('name', room.name)
            bodyRoom.append('detail', room.detail)
            bodyRoom.append('type', room.type)
            bodyRoom.append('price', room.price)
            bodyRoom.append('recommendPeople', room.recommendPeople)
            bodyRoom.append('size', room.size)
            bodyRoom.append('roomAmount', room.roomAmount)
            Object.entries(room.facilityRoom).forEach(([key, value]) => {
                bodyRoom.append(`facilityRoom[${key}]`, value)
            });
            const roomData = await axios.post(`${API}/room`, bodyRoom, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(roomData)
        })
    }

    return (
        <div className="relative bg-cream-gradient text-[#543310] p-8 rounded-lg shadow-md max-w-4xl mx-auto">

            {pageParam.isLoading ? (

                <LoadingRoomPartnerRegisterForm />
            ) : (
                <>
                    <div className="p-2 absolute cursor-pointer"
                        onClick={() => {
                            setAllFormData((prv) => ({ ...prv, room: rooms }));
                            setPage((prv) => prv - 1);
                        }}>
                        <FaArrowLeftLong size={25} color="gray" />
                    </div>
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Hotel Partner Registration
                    </h2>
                    <hr className="border-[#543310]" />
                    <h2 className="text-2xl font-semibold text-center my-4">
                        Please add room in your hotel
                    </h2>
                    <div className="flex flex-col gap-4">
                        {rooms &&
                            rooms.map((item, index) => (
                                <div className="flex flex-col gap-2" key={index}>
                                    <div className="flex gap-2">
                                        <p className="text-xl font-bold">Room {index + 1}</p>
                                        {index > 0 && (
                                            <button
                                                className="py-0.5 px-4 bg-red-500 text-white shadow-md rounded-lg hover:bg-black active:translate-y-1"
                                                onClick={() => deleteRoom(index)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <CreateRoomRegisterForm
                                        room={item}
                                        setRooms={setRooms}
                                        index={index}
                                    />
                                </div>
                            ))}
                    </div>
                    <button
                        className="py-2 bg-blue-500 w-full text-xl text-white font-semibold rounded-lg shadow-lg hover:bg-orange-400 active:translate-y-1 my-4"
                        onClick={addNewRoom}
                    >
                        Add new room
                    </button>
                    <p className="text-red-500 text-sm">{pageParam.errMsg}</p>
                    <div className="flex gap-4 justify-center">
                        <button
                            className="w-full bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-102 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
                            onClick={handleDataConfirm}
                        >
                            CONFIRM
                        </button>
                    </div>
                </>
            )}
        </div>
    );

}

export default RoomPartnerRegisterForm;
