import React, { useEffect, useState } from "react";
import usePartnerStore from "../../stores/partner-store";
import axios from "axios";
import RoomUpdateForm from "../../Components/Partner/RoomUpdateForm";
import { useShallow } from "zustand/shallow";
import CreateRoomForm from "../../Components/Partner/CreateRoomForm";

const API = import.meta.env.VITE_API;

export default function HotelPartner() {
  const { hotel, updateRoom, creteNewRoom } = usePartnerStore(
    useShallow((state) => ({
      hotel: state.hotel,
      updateRoom: state.updateRoom,
      creteNewRoom: state.creteNewRoom,
    }))
  );
  const [rooms, setRooms] = useState([]);
  const [modalControl, setModalControl] = useState({
    active: null,
    isOpen: false,
    isCreate: false,
  });

  useEffect(() => {
    getHotelDetail();
  }, []);

  const getHotelDetail = async () => {
    const result = await axios.get(`${API}/hotel/${hotel.id}`);
    setRooms(result.data.rooms);
  };

  const confirmUpdate = async (input) => {
    if (modalControl.active) {
      await updateRoom(modalControl.active.id, input);
      await getHotelDetail();
    }
  };

  const confirmCreate = async (input) => {
    await creteNewRoom(input);
    await getHotelDetail();
  };

  return (
    <>
      {modalControl.isCreate && (
        <CreateRoomForm
          setModalControl={setModalControl}
          confirmCreate={confirmCreate}
        />
      )}
      {modalControl.isOpen && (
        <RoomUpdateForm
          setModalControl={setModalControl}
          info={modalControl.active}
          confirmUpdate={confirmUpdate}
        />
      )}
      <div className="w-full text-[#543310]">
        <p className="bg-orange-400 text-3xl font-bold rounded-lg p-4 text-center text-white shadow-md">
          ROOM
        </p>
        <button
          className="self-center w-full text-center bg-orange-500 text-white p-3 mt-4 rounded-lg text-xl font-semibold transition-transform transform hover:scale-95"
          onClick={() =>
            setModalControl((prv) => ({
              ...prv,
              isOpen: false,
              isCreate: true,
            }))
          }
        >
          Add New Room
        </button>
        <table className="text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-orange-400 text-white">
              {["No.", "NAME", "TYPE", "PRICE", "AMOUNT", "STATUS", "DETAIL"].map((heading, index) => (
                <th key={index} className="border border-orange-300 p-2 font-semibold uppercase tracking-wide text-sm">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((item, index) => (
              <tr key={index} className="odd:bg-orange-100 even:bg-orange-50">
                <td className="border border-orange-300 p-2">{index + 1}</td>
                <td className="border border-orange-300 p-2">{item.name}</td>
                <td className="border border-orange-300 p-2">{item.type}</td>
                <td className="border border-orange-300 p-2">{item.price}</td>
                <td className="border border-orange-300 p-2">{item.roomAmount}</td>
                <td className="border border-orange-300 p-2">{item.status}</td>
                <td className="border border-orange-300 p-2">
                  <button
                    className="py-1 px-4 rounded-lg border border-orange-400 font-semibold text-orange-500 bg-white transition-transform transform hover:scale-95"
                    onClick={() =>
                      setModalControl((prv) => ({
                        ...prv,
                        isOpen: true,
                        active: item,
                        isCreate: false,
                      }))
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
