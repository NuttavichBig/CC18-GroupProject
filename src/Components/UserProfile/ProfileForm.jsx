import React, { useState } from 'react';
import { IoCheckmarkOutline } from "react-icons/io5";
import defaultPic from '../../assets/ProfilePicture.webp';
import useUserStore from '../../stores/user-store';
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'



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
            //alert success
            Swal.fire({
                html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Profile Updated successfully</span>
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

        } catch (error) {
            const errMsg = error.response?.data?.message || error.message;
            console.error("Error updating profile:", error);
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
        }
    };

    return (
        <div className="bg-white flex max-w-xl ml-10 mt-32">
            <div className='flex relative items-start mt-10'>
                <input type="file" id="file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" />
                <div className='flex justify-center items-center rounded-full bg-white min-h-80 min-w-80 h-80 w-80 border-r-8 border-orange-200 mt-1 ' >
                    <div className='min-w-60 min-h-60 w-60 h-60 cursor-pointer rounded-full absolute bg-black bg-opacity-50 text-white flex justify-center items-center font-semibold text-xl opacity-0 hover:opacity-100'
                        onClick={() => document.getElementById('file-upload').click()}>Upload</div>

                    <div className='p-2 border-2 border-orange-300 rounded-full bg-white shadow-lg'>
                        <img
                            src={localProfileImage || defaultPic}
                            alt="Profile"
                            className="min-w-60 min-h-60 w-60 h-60 rounded-full object-cover object-center"
                        />

                    </div>

                </div>
            </div>
            <div className='flex relative -left-16 flex-col'>
                <div className='flex gap-2 p-2'>
                    <label className='text-gray-700 '>
                        First name
                        <div className='flex p-1 bg-orange-200 shadow-lg rounded-full'>
                            <input type="text"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleChange}
                                className=" p-3 pl-4 shadow-inner rounded-full"
                                placeholder="First Name" />
                        </div>
                    </label>
                    <label className='text-gray-700 '>
                        Last name
                        <div className='flex p-1 bg-orange-200 shadow-lg rounded-full'>
                            <input type="text"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleChange}
                                className=" p-3 pl-4 shadow-inner rounded-full"
                                placeholder="Last Name" />
                        </div>
                    </label>
                </div>
                <div className='flex gap-1 ml-14 p-2 '>
                    <label className='text-gray-700 '>
                        Day
                        <div className='flex w-32 p-1 bg-orange-200 shadow-lg rounded-full'>
                            <input type="text"
                                name="day"
                                value={profileData.day}
                                onChange={handleChange}
                                className=" p-3 pl-4 shadow-inner w-full rounded-full"
                                placeholder="DD" />
                        </div>
                    </label>
                    <label className='text-gray-700 '>
                        Month
                        <div className='flex w-32 p-1 bg-orange-200 shadow-lg rounded-full'>
                            <input type="text"
                                name="month"
                                value={profileData.month}
                                onChange={handleChange}
                                className=" p-3 pl-4 w-full shadow-inner rounded-full"
                                placeholder="MM" />
                        </div>
                    </label>
                    <label className='text-gray-700 '>
                        Year
                        <div className='flex w-32 p-1 bg-orange-200 shadow-lg rounded-full'>
                            <input type="text"
                                name="year"
                                value={profileData.year}
                                onChange={handleChange}
                                className=" p-3 pl-4 w-full shadow-inner rounded-full"
                                placeholder="YY" />
                        </div>
                    </label>

                </div>
                <div className='flex gap-4 ml-14 p-2 '>
                    <label className='text-gray-700 '>
                        <p className='pl-6'>Phone</p>
                        <div className='flex p-1 bg-orange-200 shadow-lg rounded-full'>
                            <input type="text"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleChange}
                                className=" p-3 pl-4 shadow-inner w-80 rounded-full"
                                placeholder="Phone" />
                        </div>
                    </label>
                </div>
                <div className='flex gap-4 p-2 '>
                    <label className='text-gray-700 '>
                        <p className='pl-8'>Gender</p>
                        <div className='flex p-1 bg-orange-200 shadow-lg rounded-full'>
                            <select
                                name="gender"
                                value={profileData.gender}
                                onChange={handleChange}
                                className=" p-3 pl-4 shadow-inner w-80 rounded-full">

                                <option value="">Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </label>
                </div>

                <button className='ml-96 bg-gradient-to-b from-orange-400 to-orange-600 hover:from-green-400 hover:to-green-600 p-2 px-8 font-bold text-white shadow-xl flex items-center justify-center rounded-full'
                    onClick={updateProfile}>
                    Confirm
                </button>



            </div>

        </div>
    );
}

export default ProfileForm;
