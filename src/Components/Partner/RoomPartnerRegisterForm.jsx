import React, { useEffect, useState } from "react";
import CreateRoomRegisterForm from "./CreateRoomRegisterForm";


function RoomPartnerRegisterForm(props) {
    const { setAllFormData, setPage, allFormData } = props
    const [rooms, setRooms] = useState(null)
    const [pageParam , setPageParam] = useState({
        isLoading : false,
        errMsg : '',
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

    const handleDataConfirm = async()=>{
        try{

        }catch(err){
            const errMsg = err.response?.data?.message || err.message
            setPageParam(prv=>({...prv,errMsg}))
        }
    }

    return (
        <div className="bg-[#fef6e4] p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-4">
                Hotel Partner Registration
            </h2>
            <hr className="border-black" />
            <h2 className="text-2xl font-semibold text-center my-4">
                Please add room in your hotel
            </h2>
            <div className="flex flex-col gap-4">
                {rooms && rooms?.map((item, index) => <div className="flex flex-col gap-2" key={index} >
                    <div className="flex gap-2" >
                        <p className="text-xl font-bold">Room {index + 1}</p>
                        {index > 0 &&
                            <button className="py-0.5 px-4 bg-red-500 text-white shadow-md rounded-lg hover:bg-black active:translate-y-1"
                                onClick={() => deleteRoom(index)}>Delete</button>}
                    </div>
                    <CreateRoomRegisterForm room={item} setRooms={setRooms} index={index} />
                </div>
                )}
            </div>
            <button className="py-2 bg-blue-500 w-full text-xl text-white font-semibold shadow-lg hover:bg-amber-500 active:translate-y-1 my-4"
                onClick={addNewRoom}>Add new room</button>
            <div className="flex gap-4">
                <button type="button" className="w-1/4 py-2 px-8 rounded-md bg-gray-200 hover:bg-red-500 hover:text-white"
                onClick={()=>{
                    setAllFormData(prv=>({...prv,room : rooms}))
                    setPage(prv=>prv-1)
                }}>Back</button>
                <button
                    className="w-3/4 bg-orange-500 text-white py-2 px-8 rounded-md hover:bg-black"
                >
                    Confirm
                </button>
            </div>

        </div>
    );
}

export default RoomPartnerRegisterForm;
