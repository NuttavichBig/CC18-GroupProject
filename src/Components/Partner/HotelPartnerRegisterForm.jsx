import React, { useState } from 'react';

function HotelPartnerRegisterForm() {
    const [images, setImages] = useState([
        '/1.jpg',
        '/2.jpg',
        '/3.jpg'
    ]);

    const handleUploadClick = () => {

        setImages([...images, `/new-image-${images.length + 1}.jpg`]);
    };

    return (
        <form className="bg-[#fef6e4] p-8 rounded-lg shadow-md max-w-4xl mx-auto">

            <h2 className="text-2xl font-semibold text-center mb-8">Hotel Partner Registration</h2>


            <div className="grid grid-cols-2 gap-6">

                <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="First Name" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Last Name" />
                </div>


                <div>
                    <label className="block text-gray-700 mb-2">Date of Birth</label>
                    <div className="flex gap-2">
                        <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="DD" />
                        <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="MM" />
                        <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="YYYY" />
                    </div>
                </div>


                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Email" />
                </div>


                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Company Name</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Company Name" />
                </div>


                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Address" />
                </div>


                <div>
                    <label className="block text-gray-700 mb-2">Bank Account Number</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Account Number" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Bank Name</label>
                    <select className="w-full p-3 rounded bg-[#fef0d6]">
                        <option>Select Bank</option>

                    </select>
                </div>


                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Tax Number</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Tax Number" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Facilities</label>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-orange-500" />
                            <span className="ml-2 text-gray-700">Parking</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-orange-500" />
                            <span className="ml-2 text-gray-700">Swimming Pool</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-orange-500" />
                            <span className="ml-2 text-gray-700">Pet Friendly</span>
                        </label>
                    </div>
                </div>


                {/* Uploadรูป*/}
                <div className="col-span-2 flex flex-col items-center">
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className="bg-orange-500 text-white py-2 px-4 rounded-md mb-4"
                    >
                        Upload Picture
                    </button>

                    <div className="flex gap-4 mt-4 flex-wrap justify-center">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt="Hotel"
                                className={`rounded-lg object-cover ${index % 2 === 0 ? 'w-28 h-40' : 'w-48 h-40'}`}
                            />
                        ))}
                    </div>

                </div>
            </div>


            <div className="flex justify-center mt-8">
                <button type="submit" className="bg-orange-500 text-white py-2 px-8 rounded-md">Register Partner</button>
            </div>
        </form >
    );
}

export default HotelPartnerRegisterForm;
