"use client"
import { Home } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DoctorSetting() {
    const [formData, setFormData] = useState({
        username: "",
        currentPassword: "123456789",
        newPassword: "",
    });

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setFormData((prev) => ({
                ...prev,
                username: storedUsername,
            }));
        }
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div>
            <div className={`px-6 py-3  mt-1`}>
                <div className="flex items-center space-x-2 ">
                    <h1 className="text-lg font-semibold ">Settings</h1>
                    <span className="">›</span>
                    <Home size={18} className="text-gray-500" />
                    <span className="">›</span>
                    <span className="">Settings</span>
                </div>


                <div className="card mt-4 bg-[var(--background)] text-[var(--text-primary)] p-[15px] rounded-xl shadow-sm border border-[var(--border-color)]">
                    <div className="header mb-4">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Security Settings
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* Username */}
                        <div className="relative">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                autoComplete="off"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border bg-white  
                px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] 
                outline-none transition-all"
                            />
                            <label
                                htmlFor="username"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
                  ${formData.username
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                Username
                            </label>
                        </div>

                        {/* Current Password */}
                        <div className="relative">
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border  px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] outline-none transition-all"
                            />
                            <label
                                htmlFor="currentPassword"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
                  ${formData.currentPassword
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                Current Password
                            </label>
                        </div>

                        {/* New Password */}
                        <div className="relative">
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb]  outline-none transition-all"
                            />
                            <label
                                htmlFor="newPassword"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
                  ${formData.newPassword
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                New Password
                            </label>
                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
                        >
                            Save
                        </button>
                    </form>
                </div>

                <div>
                    <AccountSetting />
                </div>
            </div>
        </div >
    )
}

export function AccountSetting() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        email: "",
        country: "",
        address: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div>
            <div className="card mt-6 bg-[var(--background)] text-[var(--text-primary)] p-[20px] rounded-xl shadow-sm border border-[var(--border-color)]">
                <div className="header mb-4">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                        Account Settings
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-[80px]">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {/* First Name */}
                        <div className="relative col-span-1 md:col-span-1 lg:col-span-2">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border 
            px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] outline-none transition-all"
                            />
                            <label
                                htmlFor="firstName"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.firstName
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                First Name
                            </label>
                        </div>

                        {/* Last Name */}
                        <div className="relative col-span-1 md:col-span-1 lg:col-span-2">
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border  px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] transition-all"
                            />
                            <label
                                htmlFor="lastName"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.lastName
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                Last Name
                            </label>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {/* City */}
                        <div className="relative col-span-1">
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border 
            px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] outline-none transition-all"
                            />
                            <label
                                htmlFor="city"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.city
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                City
                            </label>
                        </div>

                        {/* Email */}
                        <div className="relative col-span-1">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border 
            px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] outline-none transition-all"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.email
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                Email
                            </label>
                        </div>

                        {/* Country */}
                        <div className="relative col-span-1">
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full rounded-md border 
            px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] outline-none transition-all"
                            />
                            <label
                                htmlFor="country"
                                className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.country
                                        ? "-top-2 text-xs text-blue-600"
                                        : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                            >
                                Country
                            </label>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="relative col-span-1 md:col-span-2 lg:col-span-3">
                        <textarea
                            id="address"
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full rounded-md border 
            px-3 pt-4 pb-4 text-sm text-[var(--text-primary)] focus:border-[#005cbb] focus:ring-2 focus:ring-[#005cbb] outline-none transition-all resize-none"
                        ></textarea>
                        <label
                            htmlFor="address"
                            className={`absolute left-3 px-[4px] bg-[var(--background)] transition-all duration-200
            ${formData.address
                                    ? "-top-2 text-xs text-blue-600"
                                    : "top-3.5 text-[var(--text-secondary)]"} 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                        >
                            Address
                        </label>
                    </div>

                    {/* Save Button */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4">
                        <button
                            type="submit"
                            className="bg-[#faf9fd] text-[#005cbb] hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-medium transition shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
