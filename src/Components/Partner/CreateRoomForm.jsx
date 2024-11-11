import React, { useEffect, useState } from 'react'

function CreateRoomForm(props) {
    const {setModalControl,confirmCreate} = props
    const [pageParam ,setPageParam] = useState({
        loading : false,
        errMsg : '',
    })
    const [input, setInput] = useState({
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
    })
    const hdlChangeText = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlFileChange = (e) => {
        setInput(prv => {
            const newArr = [...prv.files]
            newArr[+e.target.name] = e.target.files[0]
            return { ...prv, files: newArr }
        })
    }

    const hdlCheck = (e) => {
        setInput(prv => ({ ...prv, facilityRoom: { ...prv.facilityRoom, [e.target.name]: e.target.checked } }))
    }

    const hdlDeleteImg = (e, index) => {
        e.stopPropagation();
        e.preventDefault();
        if (!!input.files[index]) {
            document.getElementById(`input-file-${index}`).value = null
            setInput(prv => {
                const newArr = [...prv.files]
                newArr[index] = null
                return { ...prv, files: newArr }
            })
        }
    }
    const dataMakeConfirm = async()=>{
        try{
            console.log(input)
            setPageParam(prv=>({...prv,loading :true}))
            const body = new FormData()
            body.append('name',input.name)
            body.append('detail',input.detail)
            body.append('price',input.price)
            body.append('size',input.size)
            body.append('type',input.type)
            body.append('recommendPeople',input.recommendPeople)
            body.append('roomAmount',input.roomAmount)
            input.files.forEach((item)=>{
                if(item !== null){
                    body.append('image',item)
                }
            })
            Object.entries(input.facilityRoom).forEach(([key, value]) => {
                body.append(`facilityRoom[${key}]` , value)
            });
            console.log(body)
            await confirmCreate(body)
            setModalControl(prv=>({...prv,isCreate :false}))
        }catch(err){
            console.log(err)
            const errMsg  = err.response?.data?.message || err.message
            setPageParam(prv=>({...prv,errMsg : errMsg}))
        }finally{
            setPageParam(prv=>({...prv,loading : false}))
        }
    }
    return (
        <>
            <div
                onClick={() => setModalControl(prv=>({...prv,isCreate:false}))}
                className="flex items-center justify-center fixed inset-0 bg-[rgba(0,0,0,0.75)] z-50 text-[#543310] w-screen h-screen"
            >
                <div
                    className="bg-[#FFF0D1] rounded-xl shadow-xl p-8 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => setModalControl(prv=>({...prv,isCreate :false}))}
                        className="absolute top-4 right-4 text-3xl font-semibold bg-transparent border-none cursor-pointer"
                    >
                        &times;
                    </button>

                    <div className='flex gap-2'>
                        <input type='file' id='input-file-0' className='hidden' name='0' onChange={hdlFileChange}></input>
                        <input type='file' id='input-file-1' className='hidden' name='1' onChange={hdlFileChange}></input>
                        <input type='file' id='input-file-2' className='hidden' name='2' onChange={hdlFileChange}></input>
                        <input type='file' id='input-file-3' className='hidden' name='3' onChange={hdlFileChange}></input>
                        <input type='file' id='input-file-4' className='hidden' name='4' onChange={hdlFileChange}></input>
                        <div className='relative cursor-pointer' onClick={() => document.getElementById('input-file-0').click()}>
                            <div className='w-72 h-48 absolute bg-black z-10 flex items-center justify-center text-white font-semibold opacity-0 hover:opacity-100'>Click to add Image
                                {
                                    (!!input.files[0]) &&
                                    <div className='h-8 w-8 absolute flex items-center justify-center top-2 right-2 hover:border-red-500 hover:text-red-500 border-white rounded-full border-2 '
                                        onClick={(e) => hdlDeleteImg(e, 0)}>X</div>
                                }
                            </div>
                            <img src={input.files[0] ? URL.createObjectURL(input.files[0]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} className='w-72 h-48 object-cover'></img>
                        </div>
                        <div className='relative cursor-pointer' onClick={() => document.getElementById('input-file-1').click()}>
                            <div className='w-72 h-48 absolute bg-black z-10 flex items-center justify-center text-white font-semibold opacity-0 hover:opacity-100'>Click to add Image
                                {
                                    (!!input.files[1]) &&
                                    <div className='h-8 w-8 absolute flex items-center justify-center top-2 right-2 hover:border-red-500 hover:text-red-500 border-white rounded-full border-2 '
                                        onClick={(e) => hdlDeleteImg(e, 1)}>X</div>
                                }
                            </div>
                            <img src={input.files[1] ? URL.createObjectURL(input.files[1]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} className='w-72 h-48 object-cover'></img>
                        </div>
                        <div className='relative cursor-pointer' onClick={() => document.getElementById('input-file-2').click()}>
                            <div className='w-72 h-48 absolute bg-black z-10 flex items-center justify-center text-white font-semibold opacity-0 hover:opacity-100'>Click to add Image
                                {
                                    (!!input.files[2]) &&
                                    <div className='h-8 w-8 absolute flex items-center justify-center top-2 right-2 hover:border-red-500 hover:text-red-500 border-white rounded-full border-2 '
                                        onClick={(e) => hdlDeleteImg(e, 2)}>X</div>
                                }
                            </div>
                            <img src={input.files[2] ? URL.createObjectURL(input.files[2]) :'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} className='w-72 h-48 object-cover'></img>
                        </div>
                        <div className='relative cursor-pointer' onClick={() => document.getElementById('input-file-3').click()}>
                            <div className='w-72 h-48 absolute bg-black z-10 flex items-center justify-center text-white font-semibold opacity-0 hover:opacity-100'>Click to add Image
                                {
                                    (!!input.files[3]) &&
                                    <div className='h-8 w-8 absolute flex items-center justify-center top-2 right-2 hover:border-red-500 hover:text-red-500 border-white rounded-full border-2 '
                                        onClick={(e) => hdlDeleteImg(e, 3)}>X</div>
                                }
                            </div>
                            <img src={input.files[3] ? URL.createObjectURL(input.files[3]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} className='w-72 h-48 object-cover'></img>
                        </div>
                        <div className='relative cursor-pointer' onClick={() => document.getElementById('input-file-4').click()}>
                            <div className='w-72 h-48 absolute bg-black z-10 flex items-center justify-center text-white font-semibold opacity-0 hover:opacity-100'>Click to add Image
                                {
                                    (!!input.files[4]) &&
                                    <div className='h-8 w-8 absolute flex items-center justify-center top-2 right-2 hover:border-red-500 hover:text-red-500 border-white rounded-full border-2 '
                                        onClick={(e) => hdlDeleteImg(e, 4)}>X</div>
                                }
                            </div>
                            <img src={input.files[4] ? URL.createObjectURL(input.files[4]) : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} className='w-72 h-48 object-cover'></img>
                        </div>

                    </div>
                    <div className='w-full'>
                        <div className='mt-8 text-warm-brown flex justify-between'>
                            <div className=' w-1/2 pr-4 flex flex-col gap-2'>
                                <input type='text' name='name' value={input.name} placeholder='Room name'
                                    className=' text-2xl font-bold p-2 w-full'
                                    onChange={hdlChangeText} />
                                <div className='text-xl font-semibold'>Detail</div>
                                <textarea name="detail" value={input.detail} placeholder='detail'
                                    className='p-2 w-full'
                                    onChange={hdlChangeText}
                                    rows={input.detail.split('\n').length}></textarea>
                                <div className='flex gap-2'><p>Type :</p>
                                    <select onChange={hdlChangeText} name='type'
                                        className='px-2 py-1'>
                                        <option value={'SUITE'}>SUITE</option>
                                        <option value={'DOUBLE'}>DOUBLE</option>
                                        <option value={'MASTER'}>MASTER</option>
                                    </select>
                                </div>
                                <div>Size :
                                    <input type='number' step={0.01} value={input.size} name='size'
                                        className='px-2 py-1'
                                        onChange={hdlChangeText} /> square meter(s)
                                </div>
                                <div >Recommend For :
                                    <input type='number' min={1}
                                        name='recommendPeople' value={input.recommendPeople}
                                        onChange={hdlChangeText}
                                        className='px-2 py-1' /> People(s)
                                </div>
                                <div>Price :
                                    <input type='number' step={0.01} value={input.price} name='price'
                                        className='px-2 py-1'
                                        onChange={hdlChangeText} /> THB
                                </div>
                                <div>Amount :
                                    <input type='number' step={0.01} value={input.roomAmount} name='roomAmount'
                                        className='px-2 py-1'
                                        onChange={hdlChangeText} /> room(s)

                                </div>
                            </div>
                            <div className='w-1/3 pl-4 flex gap-4 justify-end'>
                                <div className='w-1/2 flex flex-col gap-2'>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isAirCondition}
                                            name="isAirCondition" onChange={hdlCheck} />Air Condition
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isBalcony}
                                            name="isBalcony" onChange={hdlCheck} />Balcony
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isBathtub}
                                            name="isBathtub" onChange={hdlCheck} />bathtub
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isPrivateBathroom}
                                            name="isPrivateBathroom" onChange={hdlCheck} />Private Bathroom
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isRefrigerator}
                                            name="isRefrigerator" onChange={hdlCheck} />Refrigerator
                                    </label>

                                </div>
                                <div className='w-1/2 flex flex-col gap-2'>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isShower}
                                            name="isShower" onChange={hdlCheck} />Shower
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isSmoking}
                                            name="isSmoking" onChange={hdlCheck} />Smoking
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isTelevision}
                                            name="isTelevision" onChange={hdlCheck} />Television
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isView} 
                                            name="isView" onChange={hdlCheck} />View
                                    </label>
                                    <label className='flex gap-2 items-center text-center'>
                                        <input type='checkbox' value={input.facilityRoom.isWifi}
                                            name="isWifi" onChange={hdlCheck} />Wifi
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 justify-end'>
                            {pageParam.loading ?
                            <p>Loading ...</p>
                            :
                            <>
                            <p className='text-red-500 text-sm'>{pageParam.errMsg}</p>
                            <button className='py-2 px-8 rounded-xl shadow-xl bg-lime-300 hover:text-white hover:bg-black' onClick={dataMakeConfirm}>Confirm</button>
                            <button className='py-2 px-8 rounded-xl shadow-xl bg-red-400 text-white hover:bg-red-500'
                            onClick={() => setModalControl(prv=>({...prv,isCreate :false}))}>Cancel</button>
                            </>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateRoomForm