import React from 'react'

function CreateRoomRegisterForm(props) {
    const { room, setRooms, index } = props
    const hdlTextChange = (e) => {
        setRooms(prv => {
            const newArr = [...prv]
            newArr[index] = { ...prv[index], [e.target.name]: e.target.value }
            return newArr
        })
    }

    const hdlFileChange = (e, idx) => {
        setRooms(prv => {
            const newArr = [...prv]
            newArr[index].files[idx] = e.target.files[0]
            return newArr
        })
    }

    const hdlDeleteFile = (e, idx) => {
        e.stopPropagation()
        e.preventDefault()
        document.getElementById(`input-file-${idx}-${index}`).value = null
        setRooms(prv => {
            const newArr = [...prv]
            newArr[index].files[idx] = null
            return newArr
        })
    }

    const hdlCheckBox = (e)=>{
        setRooms(prv=>{
            const newArr = [...prv]
            newArr[index].facilityRoom[e.target.name] = e.target.checked
            return newArr
        })
    }
    console.log(room)
    return (
        <div className="grid grid-cols-5 gap-6 border p-4 rounded-lg border-amber-500">
            <div className='col-span-3'>
                <label className="block text-gray-700 mb-2">Room Name</label>
                <input type="text" name='name' value={room.name} onChange={hdlTextChange} placeholder='Room Name'
                    className="w-full p-3 rounded bg-[#fef0d6]" />
            </div>
            <div className='col-span-2'>
                <label className="block text-gray-700 mb-2">Type</label>
                <select name='type' value={room.type} onChange={hdlTextChange} className="w-full p-3 rounded bg-[#fef0d6]">
                    <option value={'SUITE'}>SUITE</option>
                    <option value={'DOUBLE'}>DOUBLE</option>
                    <option value={'MASTER'}>MASTER</option>
                </select>
            </div>
            <div className='col-span-1 relative'>
                <input type="file" className='hidden' id={`input-file-0-${index}`} onChange={(e) => hdlFileChange(e, 0)} />
                <div className='bg-black bg-opacity-50 absolute w-full h-full text-white text-lg flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer'
                    onClick={() => document.getElementById(`input-file-0-${index}`).click()}>Click</div>
                {room.files[0] &&
                    <div className='flex items-center justify-center absolute top-1.5 right-1.5 border border-white text-white rounded-full w-6 h-6 hover:text-red-500 hover:border-red-500 cursor-pointer'
                        onClick={(e) => hdlDeleteFile(e, 0)}>X</div>
                }
                <img src={room.files[0] ? URL.createObjectURL(room.files[0]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt=""
                    className='object-cover w-full h-[100px]' />
            </div>
            <div className='col-span-1 relative'>
                <input type="file" className='hidden' id={`input-file-1-${index}`} onChange={(e) => hdlFileChange(e, 1)} />
                <div className='bg-black bg-opacity-50 absolute w-full h-full text-white text-lg flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer'
                    onClick={() => document.getElementById(`input-file-1-${index}`).click()}>Click</div>
                {room.files[1] &&
                    <div className='flex items-center justify-center absolute top-1.5 right-1.5 border border-white text-white rounded-full w-6 h-6 hover:text-red-500 hover:border-red-500 cursor-pointer'
                        onClick={(e) => hdlDeleteFile(e, 1)}>X</div>
                }
                <img src={room.files[1] ? URL.createObjectURL(room.files[1]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt=""
                    className='object-cover w-full h-[100px]' />
            </div>
            <div className='col-span-1 relative'>
                <input type="file" className='hidden' id={`input-file-2-${index}`} onChange={(e) => hdlFileChange(e, 2)} />
                <div className='bg-black bg-opacity-50 absolute w-full h-full text-white text-lg flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer'
                    onClick={() => document.getElementById(`input-file-2-${index}`).click()}>Click</div>
                {room.files[2] &&
                    <div className='flex items-center justify-center absolute top-1.5 right-1.5 border border-white text-white rounded-full w-6 h-6 hover:text-red-500 hover:border-red-500 cursor-pointer'
                        onClick={(e) => hdlDeleteFile(e, 2)}>X</div>
                }
                <img src={room.files[2] ? URL.createObjectURL(room.files[2]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt=""
                    className='object-cover w-full h-[100px]' />
            </div>
            <div className='col-span-1 relative'>
                <input type="file" className='hidden' id={`input-file-3-${index}`} onChange={(e) => hdlFileChange(e, 3)} />
                <div className='bg-black bg-opacity-50 absolute w-full h-full text-white text-lg flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer'
                    onClick={() => document.getElementById(`input-file-3-${index}`).click()}>Click</div>
                {room.files[3] &&
                    <div className='flex items-center justify-center absolute top-1.5 right-1.5 border border-white text-white rounded-full w-6 h-6 hover:text-red-500 hover:border-red-500 cursor-pointer'
                        onClick={(e) => hdlDeleteFile(e, 3)}>X</div>
                }
                <img src={room.files[3] ? URL.createObjectURL(room.files[3]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt=""
                    className='object-cover w-full h-[100px]' />
            </div>
            <div className='col-span-1 relative'>
                <input type="file" className='hidden' id={`input-file-4-${index}`} onChange={(e) => hdlFileChange(e, 4)} />
                <div className='bg-black bg-opacity-50 absolute w-full h-full text-white text-lg flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer'
                    onClick={() => document.getElementById(`input-file-4-${index}`).click()}>Click</div>
                {room.files[4] &&
                    <div className='flex items-center justify-center absolute top-1.5 right-1.5 border border-white text-white rounded-full w-6 h-6 hover:text-red-500 hover:border-red-500 cursor-pointer'
                        onClick={(e) => hdlDeleteFile(e, 4)}>X</div>
                }
                <img src={room.files[4] ? URL.createObjectURL(room.files[4]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt=""
                    className='object-cover w-full h-[100px]' />
            </div>
            <div className='col-span-5'>
                <label className="block text-gray-700 mb-2">Detail</label>
                <textarea className="w-full p-3 rounded bg-[#fef0d6]"
                    name="detail" value={room.detail}
                    placeholder="detail"
                    onChange={hdlTextChange}
                    rows={room.detail.split('\n').length}>

                </textarea>
            </div>
            <div className='col-span-2'>
            <label className="block text-gray-700 mb-2">Price</label>
                <input type="number" step={0.01} name='price' value={room.price} onChange={hdlTextChange} placeholder='Price'
                    className="w-full p-3 rounded bg-[#fef0d6]" />
            </div>
            <div className='col-span-1'>
            <label className="block text-gray-700 mb-2">Amount</label>
                <input type="number" name='roomAmount' value={room.roomAmount} onChange={hdlTextChange} placeholder='Amount'
                    className="w-full p-3 rounded bg-[#fef0d6]" />
            </div>
            <div className='col-span-1'>
            <label className="block text-gray-700 mb-2">Size</label>
                <input type="number" step={0.01} name='size' value={room.size} onChange={hdlTextChange} placeholder='Size (m x m)'
                    className="w-full p-3 rounded bg-[#fef0d6]" />
            </div>
            <div className='col-span-1'>
            <label className="block text-gray-700 mb-2">Guest</label>
                <input type="number" name='recommendPeople' value={room.recommendPeople} onChange={hdlTextChange} placeholder='Guest'
                    className="w-full p-3 rounded bg-[#fef0d6]" />
            </div>
            <div className='col-span-1'>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isAirCondition} checked={room.facilityRoom.isAirCondition}
                    name='isAirCondition' onChange={hdlCheckBox}/>
                    Air Condition
                </label>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isBalcony} checked={room.facilityRoom.isBalcony}
                    name='isBalcony' onChange={hdlCheckBox}/>
                    Balcony
                </label>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isSmoking} checked={room.facilityRoom.isSmoking}
                    name='isSmoking' onChange={hdlCheckBox}/>
                    Smoking
                </label>
            </div>
 
            <div className='col-span-1'>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isRefrigerator} checked={room.facilityRoom.isRefrigerator}
                    name='isRefrigerator' onChange={hdlCheckBox}/>
                    Refrigerator
                </label>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isShower} checked={room.facilityRoom.isShower}
                    name='isShower' onChange={hdlCheckBox}/>
                    Shower
                </label>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isTelevision} checked={room.facilityRoom.isTelevision}
                    name='isTelevision' onChange={hdlCheckBox}/>
                    Television
                </label>
            </div>
            <div className='col-span-1'>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isView} checked={room.facilityRoom.isView}
                    name='isView' onChange={hdlCheckBox}/>
                    View
                </label>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isWifi} checked={room.facilityRoom.isWifi}
                    name='isWifi' onChange={hdlCheckBox}/>
                    Wifi
                </label>
            </div>

            <div className='col-span-2'>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isBathtub} checked={room.facilityRoom.isBathtub}
                    name='isBathtub' onChange={hdlCheckBox}/>
                    Bathtub
                </label>
                <label className='flex gap-2'>
                    <input type="checkbox" value={room.facilityRoom.isPrivateBathroom} checked={room.facilityRoom.isPrivateBathroom}
                    name='isPrivateBathroom' onChange={hdlCheckBox}/>
                    Private Bathroom
                </label>
            </div>
        </div>
    )
}

export default CreateRoomRegisterForm