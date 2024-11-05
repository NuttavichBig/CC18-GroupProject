import React, { useState } from 'react';
import defaultPic from '../../assets/ProfilePicture.webp';

function ProfileForm() {
    const [localProfileImage, setLocalProfileImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); //สร้าง URL ชั่วคราวสำหรับไฟล์ภาพ
            setLocalProfileImage(imageUrl); // อัปเดตภาพในฟอร์ม
            // setGlobalProfileImage(imageUrl); // อัปเดตภาพใน Sidebar ผ่าน props
        }
    };

    return (
        <div className="bg-[#fef6e4] p-8 rounded-lg shadow-md max-w-xl mx-auto mt-20 relative">

            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <img
                    src={localProfileImage || defaultPic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full shadow-md object-cover object-center"
                />
                <label htmlFor="file-upload" className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer">
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    📷
                </label>
            </div>


            <div className="grid grid-cols-2 gap-6 mt-5">
                <div className="col-span-1">
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="First Name" />

                </div>
                <div className="col-span-1">
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Last Name" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Date of Birth</label>
                    <div className="flex gap-2">
                        <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="DD" />
                        <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="MM" />
                        <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="YYYY" />
                    </div>
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Email" />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input type="text" className="w-full p-3 rounded bg-[#fef0d6]" placeholder="Phone" />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <select className="w-full p-3 rounded bg-[#fef0d6]">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="bg-orange-500 text-white py-2 px-8 rounded-md mt-8 block mx-auto">Update Profile</button>
        </div>
    );
}

export default ProfileForm;





