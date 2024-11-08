import React, { useState } from 'react';
import axios from 'axios';
import defaultPic from '../../assets/ProfilePicture.webp';
import useUserStore from '../../stores/user-store';

function ProfileForm() {
    const token = useUserStore(state => state.token)
    const setUserProfileImage = useUserStore(state => state.setUserProfileImage);




    const [localProfileImage, setLocalProfileImage] = useState(null);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        day: '',
        month: '',
        year: '',
        phone: '',
        gender: '',
        image: null,
    });

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLocalProfileImage(URL.createObjectURL(file)); // แสดงภาพที่อัปโหลดในฟอร์ม
            setProfileData({ ...profileData, image: file });
        } else {
            setLocalProfileImage(null);
            setProfileData({ ...profileData, image: null });
        }
    };

    const updateProfile = async () => {
        const day = parseInt(profileData.day);
        const month = parseInt(profileData.month);
        const year = parseInt(profileData.year);

        if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
            alert("กรุณากรอกวันที่ให้ถูกต้อง");
            return;
        }
        const birthdate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        console.log(birthdate)
        const formData = new FormData();
        formData.append('firstName', profileData.firstName);
        formData.append('lastName', profileData.lastName);
        formData.append('birthdate', birthdate);
        formData.append('phone', profileData.phone);
        formData.append('gender', profileData.gender);
        if (profileData.image) {
            formData.append('image', profileData.image);
        }

        try {
            const response = await axios.patch('http://localhost:8000/auth/user', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.user.image) {
                setUserProfileImage(response.data.user.image);
            }
            console.log(response.data.user.image)
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
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
                    <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        placeholder="First Name"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        placeholder="Last Name"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Date of Birth</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="day"
                            value={profileData.day}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-[#fef0d6]"
                            placeholder="DD"
                        />
                        <input
                            type="text"
                            name="month"
                            value={profileData.month}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-[#fef0d6]"
                            placeholder="MM"
                        />
                        <input
                            type="text"
                            name="year"
                            value={profileData.year}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-[#fef0d6]"
                            placeholder="YYYY"
                        />
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-[#fef0d6]"
                        placeholder="Phone"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-[#fef0d6]"
                    >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
            </div>
            <button
                onClick={updateProfile}
                className="bg-orange-500 text-white py-2 px-8 rounded-md mt-8 block mx-auto"
            >
                Update Profile
            </button>
        </div>
    );
}

export default ProfileForm;
