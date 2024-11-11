import React, { useEffect, useState } from "react";


function UserHotelRegisterForm(props) {
    const { setAllFormData, hotelData, setPage } = props
    const [input, setInput] = useState({
        name: '',
        detail: '',
        address: '',
        lat: '',
        lng: '',
        star: 1,
        checkinTime: '',
        checkoutTime: '',
        phone: '',
        webPage: '',
        file : null ,
        facilitiesHotel: {
            isRoomService: false,
            isReception: false,
            isFitness: false,
            isParking: false,
            isEVCharging: false,
            isSwimmingPool: false,
            isRestaurant: false,
            isBreakfast: false,
            isChildren: false,
            isPetFriendly: false,
            isElevator: false,
        }
    })
    const [errMsg, setErrMsg] = useState('')
    useEffect(() => {
        if (hotelData) {
            setInput(prv => ({
                ...prv,
                name: hotelData.name,
                detail: hotelData.detail,
                address: hotelData.address,
                lat: hotelData.lat,
                lng: hotelData.lng,
                star: hotelData.star,
                checkinTime: hotelData.checkinTime,
                checkoutTime: hotelData.checkoutTime,
                phone: hotelData.phone,
                webPage: hotelData.webPage,
                file : hotelData.file,
                facilitiesHotel: {
                    isRoomService: hotelData.facilitiesHotel.isRoomService,
                    isReception: hotelData.facilitiesHotel.isReception,
                    isFitness: hotelData.facilitiesHotel.isFitness,
                    isParking: hotelData.facilitiesHotel.isParking,
                    isEVCharging: hotelData.facilitiesHotel.isEVCharging,
                    isSwimmingPool: hotelData.facilitiesHotel.isSwimmingPool,
                    isRestaurant: hotelData.facilitiesHotel.isRestaurant,
                    isBreakfast: hotelData.facilitiesHotel.isBreakfast,
                    isChildren: hotelData.facilitiesHotel.isChildren,
                    isPetFriendly: hotelData.facilitiesHotel.isPetFriendly,
                    isElevator: hotelData.facilitiesHotel.isElevator,
                }
            }))
        }
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault()
        try{
            if(!input.name || !input.address || !input.detail || !input.lat || !input.lng || !input.star || !input.checkinTime || !input.checkoutTime || !input.phone || !input.webPage || !input.file){
                throw new Error("Please fill all info")
            }
            setAllFormData(prv=>({...prv,hotel : input}))
            setPage(prv=>prv+1)
        }catch(err){
            const errMsg = err.response?.data?.message || err.message
            setErrMsg(errMsg)
        }
    }
    const handleChange = (e) => {
        setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    };

    const hdlCheckBox = (e)=>{
        setInput(prv=>({...prv,facilitiesHotel : {...prv.facilitiesHotel , [e.target.name] : e.target.checked}}))
    }

    const hdlFileChange = (e)=>{
        setInput(prv=>({...prv,file : e.target.files[0]}))
    }

    return (
        <form className="bg-[#fef6e4] p-8 rounded-lg shadow-md max-w-4xl mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-8">
                Hotel Partner Registration
            </h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="flex justify-center col-span-2 relative">
                    <input  type="file" onChange={hdlFileChange} id="input-file" className="hidden"/>
                    <div className="w-[400px] h-[320px] bg-black bg-opacity-75 opacity-0 hover:opacity-100 absolute text-white flex items-center justify-center text-2xl rounded-lg"
                    onClick={()=>document.getElementById('input-file').click()}>Click</div>
                    <img src={ input.file ? URL.createObjectURL(input.file) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
                    className="w-[400px] h-[320px] object-cover rounded-lg"/>
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Hotel Name</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        placeholder="Hotel Name"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Detail</label>
                    <textarea className="w-full p-3 rounded bg-[#fef0d6]"
                    name="detail" value={input.detail}
                    placeholder="detail"
                    onChange={handleChange}
                    rows={input.detail.split('\n').length}>

                    </textarea>
                
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="address"
                        value={input.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">
                        Star
                    </label>
                    <select className="w-full p-3 rounded bg-[#fef0d6] text-amber-500"
                    value={input.star}
                    name="star"
                    onChange={handleChange}>
                        <option value={1}>★</option>
                        <option value={2}>★★</option>
                        <option value={3}>★★★</option>
                        <option value={4}>★★★★</option>
                        <option value={5}>★★★★★</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Check-in Time</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="checkinTime"
                        value={input.checkinTime}
                        onChange={handleChange}
                        placeholder="Check-in Time"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Check-out Time</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="checkoutTime"
                        value={input.checkoutTime}
                        onChange={handleChange}
                        placeholder="Check-out Time"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Web Page</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="webPage"
                        value={input.webPage}
                        onChange={handleChange}
                        placeholder="Web Page"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Lat</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="lat"
                        value={input.lat}
                        onChange={handleChange}
                        placeholder="Lat"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Lng</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        name="lng"
                        value={input.lng}
                        onChange={handleChange}
                        placeholder="Lng"
                    />
                </div>
                <div className="col-span-2 flex">
                    <div className="w-1/4 flex flex-col">
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isRoomService" 
                        value={input.facilitiesHotel.isRoomService}
                        checked={input.facilitiesHotel.isRoomService}/>
                        <p>Room service</p>
                    </label>
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isReception" 
                        value={input.facilitiesHotel.isReception}
                        checked={input.facilitiesHotel.isReception}/>
                        <p>Reception</p>
                    </label>
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isFitness" 
                        value={input.facilitiesHotel.isFitness}
                        checked={input.facilitiesHotel.isFitness}/>
                        <p>Fitness</p>
                    </label>
                    
                    </div>
                    <div className="w-1/4 flex flex-col">
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isEVCharging" 
                        value={input.facilitiesHotel.isEVCharging}
                        checked={input.facilitiesHotel.isEVCharging}/>
                        <p>EVCharging</p>
                    </label>
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isSwimmingPool" 
                        value={input.facilitiesHotel.isSwimmingPool}
                        checked={input.facilitiesHotel.isSwimmingPool}/>
                        <p>Swimming Pool</p>
                    </label>
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isRestaurant" 
                        value={input.facilitiesHotel.isRestaurant}
                        checked={input.facilitiesHotel.isRestaurant}/>
                        <p>Restaurant</p>
                    </label>
                    </div>
                    <div className="w-1/4 flex flex-col">
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isParking" 
                        value={input.facilitiesHotel.isParking}
                        checked={input.facilitiesHotel.isParking}/>
                        <p>Parking</p>
                    </label>
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isBreakfast" 
                        value={input.facilitiesHotel.isBreakfast}
                        checked={input.facilitiesHotel.isBreakfast}/>
                        <p>Breakfast</p>
                    </label>
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isChildren" 
                        value={input.facilitiesHotel.isChildren}
                        checked={input.facilitiesHotel.isChildren}/>
                        <p>Children</p>
                    </label>
                    </div>
                    <div className="w-1/4 flex flex-col">
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isPetFriendly" 
                        value={input.facilitiesHotel.isPetFriendly}
                        checked={input.facilitiesHotel.isPetFriendly}/>
                        <p>Pet Friendly</p>
                    </label>
                    <label className="flex gap-2">
                        <input type="checkbox" onChange={hdlCheckBox} 
                        name="isElevator" 
                        value={input.facilitiesHotel.isElevator}
                        checked={input.facilitiesHotel.isElevator}/>
                        <p>Elevator</p>
                    </label>
                    </div>
                
                </div>

            </div>
            <div className="flex flex-col justify-center mt-8">
                <p className="text-sm text-red-500">{errMsg}</p>
                <div className="flex gap-4">
                <button type="button" className="w-1/4 py-2 px-8 rounded-md bg-gray-200 hover:bg-red-500 hover:text-white"
                onClick={()=>{
                    setAllFormData(prv=>({...prv,hotel : input}))
                    setPage(prv=>prv-1)
                }}>Back</button>
                <button
                    type="submit"
                    className="w-3/4 bg-orange-500 text-white py-2 px-8 rounded-md"
                    >
                    Next
                </button>
                    </div>
            </div>
        </form>
    );
}

export default UserHotelRegisterForm;
