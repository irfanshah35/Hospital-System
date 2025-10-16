import React from 'react'

export default function Header() {
    return (
        <nav
            className="fixed top-0 h-[68px] left-0 z-50 w-full bg-white shadow-[3px_0_10px_#b7c0ce33] font-['Roboto',_sans-serif]"
        >
            <div className="flex items-center w-full max-w-[1400px] mx-auto py-[4px]"
            >
                <div className="p-[8px] !pr-0 flex items-center">
                    <button className="text-gray-700 hover:text-gray-900 w-[48px] h-[48px] flex justify-center items-center lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-700 relative left-[2px] top-[1px]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                        </svg>

                    </button>
                    <div className='flex items-center gap-[10px] px-[25px] mr-4 w-[244px] justify-center'>
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

                    <div className="flex items-center">
                        <button className="relative text-gray-600 hover:text-gray-900 flex justify-center items-center w-[48px] h-[48px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-[24px] h-6'
                            >
                                <path d="M4 4h6v2H6v4H4V4zm14 0v6h-2V6h-4V4h6zm-6 16h6v-6h-2v4h-4v2zM4 20h6v-2H6v-4H4v6z" />
                            </svg>
                        </button>
                        <button className="relative text-gray-600 hover:text-gray-900 flex justify-center items-center w-[48px] h-[48px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>

                            <span
                                className="absolute top-1 right-[12px] bg-red-500 text-white text-[10px] font-semibold rounded-full px-[5px] py-[1px]"
                            >
                                3
                            </span>
                        </button>
                        <button
                            className="gap-2 text-gray-700 hover:text-gray-900 flex justify-center items-center w-[48px] h-[48px]"
                            aria-label="Language"
                        >
                            <img
                                src="assets/header/us.svg"
                                alt="English"
                                className="h-4 w-auto"
                            />
                        </button>
                        <div className="w-[131px] h-[48px] flex justify-center items-center gap-2">
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
