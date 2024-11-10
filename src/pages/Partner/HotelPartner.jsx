import React, { useEffect, useState } from "react";
import usePartnerStore from "../../stores/partner-store";
import axios from "axios";
import RoomUpdateForm from "../../Components/Partner/RoomUpdateForm";
import { useShallow } from "zustand/shallow";
import CreateRoomForm from "../../Components/Partner/CreateRoomForm";
const API = import.meta.env.VITE_API
export default function HotelPartner() {
  const {hotel,updateRoom,creteNewRoom} = usePartnerStore(useShallow(state=>({
    hotel : state.hotel,
    updateRoom  : state.updateRoom,
    creteNewRoom : state.creteNewRoom
  })))
  const [rooms, setRooms] = useState([])
  const [modalControl , setModalControl] = useState({
    active : null,
    isOpen : false,
    isCreate : false,
  })
  useEffect(() => {
    getHotelDetail()
  }, [])

  const getHotelDetail = async () => {
    const result = await axios.get(`${API}/hotel/${hotel.id}`)
    setRooms(result.data.rooms)
  }

  const confirmUpdate = async(input)=>{
      if(modalControl.active){
        await updateRoom(modalControl.active.id,input)
        await getHotelDetail()
      }
  }

  const confirmCreate = async(input)=>{
    await creteNewRoom(input)
    await getHotelDetail()
  }
  return (
    <>
    {modalControl.isCreate && <CreateRoomForm setModalControl={setModalControl} confirmCreate={confirmCreate}/>}
    {modalControl.isOpen && <RoomUpdateForm setModalControl={setModalControl} info={modalControl.active} confirmUpdate={confirmUpdate}/>}
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center  shadow-lg">
          ROOM
        </p>
        <button className="self-center w-full text-center bg-orange-dark-gradient text-white p-3 mt-4 rounded-lg text-xl font-semibold hover:scale-[0.975] transition-all "
        onClick={()=>setModalControl(prv=>({...prv,isOpen: false ,isCreate : true}))}>Add New Room</button>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">No.</th>
              <th className="border-collapse border p-2">NAME</th>
              <th className="border-collapse border p-2">TYPE</th>
              <th className="border-collapse border p-2">PRICE</th>
              <th className="border-collapse border p-2">AMOUNT</th>
              <th className="border-collapse border p-2">STATUS</th>
              <th className="border-collapse border p-2">DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((item, index) =>
              <tr key={index} className="bg-[#F8F4E1]">
                <td className="border-collapse border p-2">{index + 1}</td>
                <td className="border-collapse border p-2">{item.name}</td>
                <td className="border-collapse border p-2">{item.type}</td>
                <td className="border-collapse border p-2">{item.price}</td>
                <td className="border-collapse border p-2">{item.roomAmount}</td>
                <td className="border-collapse border p-2">{item.status}</td>
                <td className="border-collapse border p-2">
                  <button className="py-1 px-4 rounded-xl border border-[#543310] font-bold bg-white"
                  onClick={()=>setModalControl(prv=>({...prv,isOpen : true,active : item,isCreate : false}))}>Edit</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
