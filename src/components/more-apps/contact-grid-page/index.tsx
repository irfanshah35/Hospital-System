import { ChevronRight, Home } from 'lucide-react'
import React from 'react'

export default function ContactGridpage() {

    const contactsData = [
        {
            id: 1,
            name: "Pooja Patel",
            position: "General Manager",
            address: "A-103, shyam gokul flats, Mahatma Road, Mumbai",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "!bg-[linear-gradient(135deg,#8e4cf1_0%,#c554bc)]"
        },
        {
            id: 2,
            name: "Smita Patil",
            position: "Housekeeper",
            address: "45, Krishna Tower, Near Bus Stop, Satellite, Ahmedabad",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "bg-[#00BCD4]"
        },
        {
            id: 3,
            name: "John Smith",
            position: "Cook",
            address: "456, Estern evenue, Courtage area, New York",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "bg-[#212529]"
        },
        {
            id: 4,
            name: "Pooja Patel",
            position: "General Manager",
            address: "A-103, shyam gokul flats, Mahatma Road, Mumbai",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "bg-[#F08D51]"
        },
        {
            id: 5,
            name: "Smita Patil",
            position: "Housekeeper",
            address: "45, Krishna Tower, Near Bus Stop, Satellite, Ahmedabad",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "bg-[#4CAF50]"
        },
        {
            id: 6,
            name: "John Smith",
            position: "Cook",
            address: "456, Estern evenue, Courtage area, New York",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "!bg-gradient-to-r !from-[#a77ffc] !to-[#ff6eac]"
        },
        {
            id: 7,
            name: "Pooja Patel",
            position: "General Manager",
            address: "A-103, shyam gokul flats, Mahatma Road, Mumbai",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "bg-[#3F51B5]"
        },
        {
            id: 8,
            name: "Smita Patil",
            position: "Housekeeper",
            address: "45, Krishna Tower, Near Bus Stop, Satellite, Ahmedabad",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "bg-[#795548]"
        },
        {
            id: 9,
            name: "John Smith",
            position: "Cook",
            address: "456, Estern evenue, Courtage area, New York",
            phone: "264-625-2583",
            image: "/assets/patient-1.jpg",
            bgColor: "bg-[#FFE821]"
        }
    ];
    return (
        <div className="min-h-screen ">
            {/* Breadcrumb */}
            <div className="px-6 py-2 bg-white">
                <div className="flex items-center text-gray-600">
                    <span className="font-semibold text-[20px] text-gray-800">Contact Grid</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                    <Home size={16} className="text-gray-500" />
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                    <span className="text-gray-600 text-[15px]">Apps</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                    <span className="text-gray-600 text-[15px]">Contact Grid</span>
                </div>
            </div>

            <div className='px-6 py-4'>
                <div className="bg-white px-4 py-4 rounded-lg shadow-sm overflow-hidden">
                    <div className="mb-6">
                        <h2 className="text-[17px] font-semibold text-gray-800 mt-[5px]">Contact Grid</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
                        {contactsData.map((contact) => (
                            <div
                                key={contact.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className={`${contact.bgColor} text-white p-4 text-center h-[150px]`}>
                                    <div className="text-[22px] pb-1">{contact.name}</div>
                                    <div className="text-sm opacity-90">{contact.position}</div>
                                </div>
                                <div className="flex gap-2 flex-col items-center px-4 pt-16 pb-4 relative">
                                    <img
                                        src={contact.image}
                                        alt={contact.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white absolute -top-12 shadow-xl"
                                    />
                                    <p className="text-center text-gray-600 mb-4 mt-4">
                                        {contact.address}
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <i className="fas fa-phone text-gray-500 mr-2"></i>
                                        <span className="text-gray-700">{contact.phone}</span>
                                    </div>
                                    <button className="py-2 px-6 mt-6 bg-[#005cbb] hover:bg-[#1469C0] text-white font-medium rounded-full transition-colors cursor-pointer">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
