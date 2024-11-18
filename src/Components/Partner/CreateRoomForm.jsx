import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'
import LoadingspinnerOrangeCircle from "../Loading/LoadingspinnerOrangeCircle";

function CreateRoomForm(props) {
  const { setModalControl, confirmCreate } = props;
  const [pageParam, setPageParam] = useState({
    loading: false,
    errMsg: "",
  });
  const [input, setInput] = useState({
    name: "",
    detail: "",
    price: "",
    size: "",
    type: "",
    recommendPeople: "",
    roomAmount: "",
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
    },
  });

  const hdlChangeText = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput((prv) => {
      const newArr = [...prv.files];
      newArr[+e.target.name] = e.target.files[0];
      return { ...prv, files: newArr };
    });
  };

  const hdlCheck = (e) => {
    setInput((prv) => ({
      ...prv,
      facilityRoom: { ...prv.facilityRoom, [e.target.name]: e.target.checked },
    }));
  };

  const hdlDeleteImg = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    if (input.files[index]) {
      document.getElementById(`input-file-${index}`).value = null;
      setInput((prv) => {
        const newArr = [...prv.files];
        newArr[index] = null;
        return { ...prv, files: newArr };
      });
    }
  };

  const dataMakeConfirm = async () => {
    try {
      setPageParam((prv) => ({ ...prv, loading: true }));
      const body = new FormData();
      body.append("name", input.name);
      body.append("detail", input.detail);
      body.append("price", input.price);
      body.append("size", input.size);
      body.append("type", input.type);
      body.append("recommendPeople", input.recommendPeople);
      body.append("roomAmount", input.roomAmount);
      input.files.forEach((item) => {
        if (item !== null) {
          body.append("image", item);
        }
      });
      Object.entries(input.facilityRoom).forEach(([key, value]) => {
        body.append(`facilityRoom[${key}]`, value);
      });
      await confirmCreate(body);
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Create Room Success</span>
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
      setModalControl((prv) => ({ ...prv, isCreate: false }));
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setPageParam((prv) => ({ ...prv, errMsg }));
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorAlert}" alt="Error Animation" class="w-10 h-10" />
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
      setPageParam((prv) => ({ ...prv, loading: false }));
    }
  };

  return (
    <>
      <div
        onClick={() => setModalControl((prv) => ({ ...prv, isCreate: false }))}
        className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FFF0D1] shadow-xl p-8 w-[80%] max-w-4xl relative h-[80vh] overflow-y-auto"
        >
          <button
            onClick={() =>
              setModalControl((prv) => ({ ...prv, isCreate: false }))
            }
            className="absolute top-0 right-2 text-3xl font-semibold text-gray-600 hover:text-gray-800"
            >
            &times;
          </button>

          <div className="flex flex-col gap-8">
            {/* Image Upload Section */}
            <div className="flex gap-4 overflow-x-auto">
              {input.files.map((file, index) => (
                <div
                  key={index}
                  className="relative w-48 h-32 rounded-lg overflow-hidden cursor-pointer border border-gray-300 shadow-sm"
                  onClick={() =>
                    document.getElementById(`input-file-${index}`).click()
                  }
                >
                  <input
                    type="file"
                    id={`input-file-${index}`}
                    className="hidden"
                    name={index.toString()}
                    onChange={hdlFileChange}
                  />
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                    }
                    alt={`Room image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {file && (
                    <button
                      className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1"
                      onClick={(e) => hdlDeleteImg(e, index)}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-8">
              {/* Room Details Section */}
              <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Room Details
                </h3>

                {/* Room Name Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    placeholder="Room Name"
                    onChange={hdlChangeText}
                    className="w-full text-base font-semibold p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
                  />
                </div>

                {/* Room Detail Text Area */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Details
                  </label>
                  <textarea
                    name="detail"
                    value={input.detail}
                    placeholder="Enter room details..."
                    onChange={hdlChangeText}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 text-base placeholder-gray-400"
                  ></textarea>
                </div>

                {/* Grid for Room Type, Size, Recommend For, Price, and Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Type",
                      name: "type",
                      type: "select",
                      options: ["SUITE", "DOUBLE", "MASTER"],
                    },
                    { label: "Size", name: "size", unit: "sqm" },
                    {
                      label: "Recommend For",
                      name: "recommendPeople",
                      unit: "People",
                    },
                    { label: "Price", name: "price", unit: "THB" },
                    { label: "Amount", name: "roomAmount", unit: "rooms" },
                  ].map((field, idx) => (
                    <div key={idx} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          onChange={hdlChangeText}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
                        >
                          {field.options.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.01"
                            name={field.name}
                            value={input[field.name]}
                            onChange={hdlChangeText}
                            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                          <span className="text-gray-600">{field.unit}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities Section */}
              <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Facilities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(input.facilityRoom).map((facility, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={input.facilityRoom[facility]}
                        name={facility}
                        onChange={hdlCheck}
                        className="accent-orange-400 rounded focus:ring-2 focus:ring-orange-400"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {facility.replace("is", "").replace(/([A-Z])/g, " $1")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              {pageParam.loading ? (
                <LoadingspinnerOrangeCircle />
              ) : (
                <>
                  <p className="text-red-500 text-sm">{pageParam.errMsg}</p>
                  <button
                    onClick={dataMakeConfirm}
                    className="py-2 px-6 rounded-lg shadow-md bg-lime-300 text-white hover:bg-lime-400 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() =>
                      setModalControl((prv) => ({ ...prv, isCreate: false }))
                    }
                    className="py-2 px-6 rounded-lg shadow-md bg-red-400 text-white hover:bg-red-500 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRoomForm;
