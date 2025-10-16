import React from 'react'

export default function Header() {
    return (
        // <div className="fixed top-0 left-0 z-[999] w-full min-h-[60px] bg-white shadow-[3px_0_10px_#b7c0ce33] font-['Roboto',_sans-serif] rounded-none border-none p-0 active">
        //     <div className="flex items-center w-full mx-auto px-[0.75rem] py-0">
        //         <div className="bg-white p-2 w-[260px] transition-all duration-500 lg:float-left">
        //             <a className="navbar-toggle"></a>
        //             <a className="bars"></a>
        //             <a className="navbar-brand" href="#/admin/dashboard/main">
        //                 <img src="assets/images/logo.png" alt="Cliniva Logo" />
        //                 <span className="logo-name">Cliniva</span>
        //             </a>
        //         </div>

        //         <div className="navbar-collapse">
        //             <ul className="nav-left">
        //                 <li>
        //                     <button className="nav-icon-btn sidemenu-collapse">
        //                         <i className="material-icons-outlined">menu</i>
        //                     </button>
        //                 </li>
        //             </ul>
        //             <ul className="nav navbar-nav navbar-right">
        //                 <li className="fullscreen">
        //                     <button className="nav-icon-btn">
        //                         <i className="material-icons-outlined">fullscreen</i>
        //                     </button>
        //                 </li>
        //                 <li>
        //                     <button className="nav-icon-btn">
        //                         <i className="material-icons-outlined">notifications_active</i>
        //                         <span className="notification-badge">3</span>
        //                     </button>
        //                 </li>
        //                 <li className="nav-item">
        //                     <button className="nav-icon-btn lang-dropdown">
        //                         <img src="assets/images/flags/us.svg" alt="English" height="16" />
        //                     </button>
        //                 </li>
        //                 <li className="nav-item user_profile">
        //                     <button className="user-profile-btn">
        //                         <div className="user-profile-img">
        //                             <span>Ella Jones</span>
        //                             <img
        //                                 src="assets/images/user/admin.jpg"
        //                                 alt="User"
        //                                 width="32"
        //                                 height="32"
        //                                 className="user_img"
        //                             />
        //                         </div>
        //                     </button>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>

        <nav
            className="fixed top-0 h-[68px] left-0 z-50 w-full bg-white shadow-[3px_0_10px_#b7c0ce33] font-['Roboto',_sans-serif]"
        >
            <div className="flex items-center w-full max-w-[1400px] mx-auto py-[4px]"
            >
                <div className="p-[8px] !pr-0">
                    <div className='flex items-center gap-2 px-[25px] mr-4 w-[244px] justify-center'>
                        <img
                            src="assets/header/logo.png"
                            alt="Cliniva Logo"
                            className="h-8 w-auto"
                        />
                        <span className="text-[24px] font-[400] text-gray-900">Cliniva</span>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <button
                        className="text-gray-700 hover:text-gray-900 w-[48px] h-[48px] flex justify-center items-center"
                        aria-label="Toggle Menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-700 relative left-[2px] top-[1px]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                        </svg>

                    </button>

                    <div className="hidden md:flex items-center gap-4">
                        <button className="relative text-gray-600 hover:text-gray-900">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-gray-700"
                            >
                                <path d="M5 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H5v5zm10 7h-3v2h5v-5h-2v3zm-3-9V5h5v5h-2V7h-3z" />
                            </svg>
                        </button>
                        <button
                            className="relative text-gray-600 hover:text-gray-900"
                            aria-label="Notifications"
                        >
                            <i className="material-icons-outlined text-[22px]">notifications</i>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-[5px] py-[1px]"
                            >
                                3
                            </span>
                        </button>
                        <button
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                            aria-label="Language"
                        >
                            <img
                                src="assets/images/flags/us.svg"
                                alt="English"
                                className="h-4 w-auto"
                            />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">Ella Jones</span>
                            <img
                                src="assets/images/user/admin.jpg"
                                alt="User"
                                className="w-8 h-8 rounded-full border border-gray-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>


    )
}
