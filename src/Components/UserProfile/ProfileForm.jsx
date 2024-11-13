import React, { useState } from 'react';
import { IoCheckmarkOutline } from "react-icons/io5";
import defaultPic from '../../assets/ProfilePicture.webp';
import useUserStore from '../../stores/user-store';

function ProfileForm() {
    const user = useUserStore(state => state.user)
    const setUserProfileImage = useUserStore(state => state.setUserProfileImage);
    const updateUserProfile = useUserStore(state => state.updateUserProfile)
    const [localProfileImage, setLocalProfileImage] = useState(user.image);

    const dateObj = user?.birthdate ? new Date(user.birthdate) : null;
    const day = dateObj ? dateObj.getUTCDate().toString().padStart(2, '0') : '';
    const month = dateObj ? (dateObj.getUTCMonth() + 1).toString().padStart(2, '0') : '';
    const year = dateObj ? dateObj.getUTCFullYear().toString() : '';

    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        day: day || "",
        month: month || "",
        year: year || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
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
            const response = await updateUserProfile(formData)
            console.log(response)
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
        <div className='flex self-start flex-col mt-12 w-3/5 bg-white'>

            <div className='relative flex justify-center items-center'>
                <div className='absolute w-28 h-28 border-gray-500 border-2 rounded-full flex justify-center items-center'>
                    <div className='absolute rounded-full bg-black bg-opacity-50 text-white w-24 h-24 flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer'
                        onClick={() => document.getElementById('file-upload').click()}>Upload</div>
                    <input type="file" id="file-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden" />
                    <img src={localProfileImage || defaultPic} alt="profile image" className='w-24 h-24 rounded-full shadow-lg object-contain' />
                </div>
            </div>
            <div className='flex flex-col w-full mt-16'>

                <div className='flex flex-col border-y-2 p-2'>
                    <label className='text-sm text-gray-600'>First name</label>
                    <input type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className=" p-3 pl-4 border-0 shadow-md shadow-gray-200 hover:scale-[0.975] transition-transform cursor-pointer"
                        placeholder="First Name" />
                </div>
                <div className='flex flex-col border-b-2 p-2'>
                    <label className='text-sm text-gray-600'>Last name</label>
                    <input type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className=" p-3 pl-4 border-0 shadow-md shadow-gray-200 hover:scale-[0.975] transition-transform cursor-pointer"
                        placeholder="Last Name" />
                </div>
                <div className='flex gap-2 w-full border-b-2 p-2'>
                    <div className='flex flex-col w-1/3'>
                        <label className='text-sm text-gray-600'>Day</label>
                        <input type="text"
                            name="day"
                            value={profileData.day}
                            onChange={handleChange}
                            className=" p-3 pl-4 border-0 w-full shadow-md shadow-gray-200 hover:scale-[0.975] transition-transform cursor-pointer"
                            placeholder="DD" />
                    </div>
                    <div className='flex flex-col w-1/3'>
                        <label className='text-sm text-gray-600'>Month</label>
                        <input type="text"
                            name="month"
                            value={profileData.month}
                            onChange={handleChange}
                            className=" p-3 pl-4 border-0 w-full shadow-md shadow-gray-200  hover:scale-[0.975] transition-transform cursor-pointer"
                            placeholder="MM" />
                    </div>
                    <div className='flex flex-col w-1/3'>
                        <label className='text-sm text-gray-600'>Year</label>
                        <input type="text"
                            name="year"
                            value={profileData.year}
                            onChange={handleChange}
                            className=" p-3 pl-4 border-0 shadow-md w-full shadow-gray-200 hover:scale-[0.975] transition-transform cursor-pointer"
                            placeholder="YY" />
                    </div>

                </div>
                <div className='flex flex-col w-full border-b-2 p-2'>
                    <label className='text-sm text-gray-600'>Phone</label>
                    <input type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className=" p-3 pl-4 border-0 shadow-md shadow-gray-200 hover:scale-[0.975] transition-transform cursor-pointer"
                        placeholder="Phone" />
                </div>
                <div className='flex flex-col w-full border-b-2 p-2'>
                <label className='text-sm text-gray-600'>Gender</label>
                    <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleChange}
                        className="p-3 pl-4 border-0 shadow-md shadow-gray-200 hover:scale-[0.975] transition-transform cursor-pointer">

                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <button className='bg-gradient-to-b from-orange-400 to-orange-600 w-1/4 self-center text-white py-2 rounded-lg mt-8'>Confirm</button>

            </div>
        </div>
    );
}

export default ProfileForm;
