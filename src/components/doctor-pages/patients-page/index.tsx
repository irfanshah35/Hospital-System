'use client'
import { FileText, Home, MapPin, Phone } from 'lucide-react'
import React from 'react'

interface PatientCard {
    id: number;
    name: string;
    patientId: string;
    timeSlot: string;
    date: string;
    address: string;
    phone: string;
    bloodGroup: string;
    hasReports: boolean;
    image: string;
}

export default function PatientsPage() {


    const patientData: PatientCard[] = [
        {
            id: 1,
            name: "Lindsey Johnson",
            patientId: "1234",
            timeSlot: "10:00 - 10:30 AM",
            date: "Friday, June 26",
            address: "Shanti Nagar Bldg No B 4, Sector No 6, Mira Road",
            phone: "+123 87654565",
            bloodGroup: "O+",
            hasReports: true,
            image: "/assets/patient-1.jpg"
        },
        {
            id: 2,
            name: "Sarah Wilson",
            patientId: "1235",
            timeSlot: "11:00 - 11:30 AM",
            date: "Friday, June 26",
            address: "Green Park Society, Sector 15, Navi Mumbai",
            phone: "+123 87654566",
            bloodGroup: "A+",
            hasReports: false,
            image: "/assets/patient-1.jpg"
        },
        {
            id: 3,
            name: "Michael Brown",
            patientId: "1236",
            timeSlot: "02:00 - 02:30 PM",
            date: "Friday, June 26",
            address: "Royal Apartments, Bandra West, Mumbai",
            phone: "+123 87654567",
            bloodGroup: "B+",
            hasReports: true,
            image: "/assets/patient-1.jpg"
        },
        {
            id: 4,
            name: "Emma Davis",
            patientId: "1237",
            timeSlot: "03:00 - 03:30 PM",
            date: "Friday, June 26",
            address: "Ocean View Apartments, Worli Sea Face, Mumbai",
            phone: "+123 87654568",
            bloodGroup: "AB+",
            hasReports: true,
            image: "/assets/patient-1.jpg"
        },
        {
            id: 5,
            name: "James Miller",
            patientId: "1238",
            timeSlot: "04:00 - 04:30 PM",
            date: "Friday, June 26",
            address: "Skyline Towers, Andheri East, Mumbai",
            phone: "+123 87654569",
            bloodGroup: "O-",
            hasReports: false,
            image: "/assets/patient-1.jpg"
        },
        {
            id: 6,
            name: "Olivia Garcia",
            patientId: "1239",
            timeSlot: "05:00 - 05:30 PM",
            date: "Friday, June 26",
            address: "Palm Grove Society, Khar West, Mumbai",
            phone: "+123 87654570",
            bloodGroup: "A-",
            hasReports: true,
            image: "/assets/patient-1.jpg"
        }
    ];
    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Patients</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Patients</span>
                    </div>
                </div>


                <div className='mt-4'>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {patientData.map((patient) => (
                            <PatientCard key={patient.id} patient={patient} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}


function PatientCard({ patient }: { patient: PatientCard }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-between gap-3">
                    <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-green-600 text-sm font-semibold mb-4">{patient.name}</p>
                        <p className="text-gray-500 text-xs mb-4">Patient Id : {patient.patientId}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-gray-800 text-xs font-semibold mb-4">{patient.timeSlot}</p>
                    <p className="text-gray-500 text-xs mb-4">{patient.date}</p>
                </div>
            </div>

            <hr className="border-gray-200 my-4" />

            <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{patient.address}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0 rotate-x-180" />
                    <span className="text-gray-600 text-sm">{patient.phone}</span>
                </div>
            </div>

            <hr className="border-gray-200 my-4" />

            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm mb-4">Blood Group:</span>
                    <span className="text-gray-800 text-sm font-semibold mb-4">{patient.bloodGroup}</span>
                </div>
                <div className="flex  gap-2">
                    <span className="text-gray-600 text-sm mb-4">Reports:</span>
                    {patient.hasReports ? (
                        <FileText className="w-4 h-4 text-red-500" />
                    ) : (
                        <span className="text-gray-400 text-sm mb-4">No reports</span>
                    )}
                </div>
            </div>

            <hr className="border-gray-200 my-4" />

            <div className="flex justify-center">
                <button className="border border-[#74777f] text-[#005cbb] hover:bg-blue-50 px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer">
                    Read More
                </button>
            </div>
        </div>
    );
}