'use client';
import React, { useState } from 'react';
import { Home, Settings, Smile, Phone, CircleUser, IdCard, BriefcaseMedical, ClipboardPlus, Hospital, ShieldPlus, Edit, Eye, History, Pencil } from 'lucide-react';

export default function PatientProfilePage() {

  const visitHistory = [
    {
      date: "2023-11-10",
      doctor: "Dr. Jacob Ryan",
      treatment: "Respiratory therapy",
      charges: "250",
      outcome: "Improved",
    },
    {
      date: "2023-08-22",
      doctor: "Dr. Sophia Chen",
      treatment: "Blood pressure check",
      charges: "120",
      outcome: "Stable",
    },
    {
      date: "2023-05-15",
      doctor: "Dr. Jacob Ryan",
      treatment: "Annual physical",
      charges: "180",
      outcome: "Healthy",
    },
    {
      date: "2023-02-03",
      doctor: "Dr. Michael Lee",
      treatment: "Flu symptoms",
      charges: "150",
      outcome: "Recovered",
    },
  ];


  return (
    <>
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className=" px-6 py-2 mt-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-semibold text-[20px]">Profile</span>
            <span className='text-[20px] font-semibold'>›</span>
            <Home size={16} />
            <span className='font-medium text-[20px]'>›</span>
            <span>Patients</span>
            <span className='font-medium text-[20px]'>›</span>
            <span>Profile</span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content */}
            <div className='space-y-6 col-span-1 '>
              <div className="space-y-6 bg-white rounded-lg shadow-sm h-[297px]">
                <div className="text-center p-3">
                  <img
                    src="/assets/doctorDashboard/doctor.jpg"
                    alt="Patient Image"
                    width="150"
                    height="150"
                    className="rounded-full mx-auto"
                  />
                  <h4 className="mt-3 mb-0 text-lg font-semibold">David Smith</h4>
                  <p className="text-gray-500 text-sm">Patient ID: P001</p>

                  <div className="flex justify-center mt-2">
                    <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      Discharged
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-2xl mb-6 overflow-hidden">

                <div className="flex items-center justify-center gap-2 border-b border-gray-300 px-[15px] py-[15px]">
                  <CircleUser className='w-5 h-5' />
                  <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                </div>

                <div className="p-[31px] space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Full Name</span>
                    <span className="text-sm">Sarah Smith</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Gender</span>
                    <span className="text-sm">Female</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Age</span>
                    <span className="text-sm">35 years</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Date of Birth</span>
                    <span className="text-sm">1989-05-15</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Marital Status</span>
                    <span className="text-sm">Married</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">National ID</span>
                    <span className="text-sm ">NAT123456789</span>
                  </div>
                </div>
              </div>


              <div className="bg-white shadow-md rounded-2xl mb-6 overflow-hidden">

                <div className="flex items-center justify-center gap-2 border-b border-gray-300 px-[15px] py-[15px]">
                  <IdCard className='w-5 h-5' />
                  <h2 className="text-lg font-semibold text-gray-800">Contact &amp; Address</h2>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm ">Email</span>
                    <span className="text-sm break-words whitespace-normal ">sarah.smith@example.com</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm ">Phone</span>
                    <span className="text-sm break-words whitespace-normal ">+1 (123) 456-7890</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm ">Address</span>
                    <span className="text-sm break-words whitespace-normal  text-right">
                      123 Main Street, Anytown, CA 94538
                    </span>
                  </div>

                  <div className="pt-3 space-y-4">
                    <h6 className="text-sm  font-semibold mb-2">Emergency Contact</h6>

                    <div className="flex justify-between">
                      <span className="text-sm ">Name</span>
                      <span className="text-sm break-words whitespace-normal ">John Smith</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm ">Relation</span>
                      <span className="text-sm break-words whitespace-normal ">Husband</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm ">Phone</span>
                      <span className="text-sm break-words whitespace-normal ">+1 (987) 654-3210</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className='col-span-2'>
              <div className="bg-white text-sm shadow-md rounded-lg mb-4 border border-gray-100">

                <div className="flex items-center gap-2 border-b border-gray-200 px-[31px] py-[15px]">
                  <BriefcaseMedical className='w-5 h-5' />
                  <h2 className="text-lg font-semibold text-gray-800">Medical Information</h2>
                </div>

                {/* Content */}
                <div className="p-[31px] flex flex-col gap-4">
                  <div className="flex mb-2">
                    <div className="w-1/3 text-gray-500">Blood Group</div>
                    <div className="w-2/3">
                      <span className="px-3 py-1 border rounded-[8px] text-sm font-medium">A+</span>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="flex mb-2">
                    <div className="w-1/3 text-gray-500">Allergies</div>
                    <div className="w-2/3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 border rounded-[8px] text-sm font-medium text-sm font-medium">Penicillin</span>
                      <span className="px-3 py-1 border rounded-[8px] text-sm font-medium text-sm font-medium">Peanuts</span>
                    </div>
                  </div>

                  {/* Chronic Conditions */}
                  <div className="flex mb-2">
                    <div className="w-1/3 text-gray-500">Chronic Conditions</div>
                    <div className="w-2/3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 border rounded-[8px] text-sm font-medium text-sm font-medium">Asthma</span>
                      <span className="px-3 py-1 border rounded-[8px] text-sm font-medium text-sm font-medium">Hypertension</span>
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div className="flex mb-2">
                    <div className="w-1/3 text-gray-500">Current Medications</div>
                    <div className="w-2/3">
                      <ul className="list-none space-y-1 text-sm">
                        <li className="flex items-center gap-4">
                          <ClipboardPlus className='w-5 h-5 text-[#0d6efd]' />
                          Albuterol
                        </li>
                        <li className="flex items-center gap-4">
                          <ClipboardPlus className='w-5 h-5 text-[#0d6efd]' />
                          Lisinopril
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Past Medical History */}
                  <div className="flex mb-2">
                    <div className="w-1/3 text-gray-500">Past Medical History</div>
                    <div className="w-2/3 text-gray-800 break-words whitespace-normal">
                      Appendectomy in 2015, Fractured wrist in 2018
                    </div>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
                <div className="flex items-center px-[31px] py-[15px] border-b border-gray-200">
                  <Hospital className="w-5 h-5 mr-2" />
                  <h2 className="text-gray-800 font-semibold">Admission Details</h2>
                </div>

                <div className="p-[31px] space-y-4 text-sm">
                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Admission Date</span>
                    <span className=" text-gray-800 break-words w-full">2023-11-10</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Discharge Date</span>
                    <span className=" text-gray-800 break-words w-full">2023-11-15</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Doctor Assigned</span>
                    <span className=" text-gray-800 break-words w-full">Dr. Jacob Ryan</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Ward/Room</span>
                    <span className=" text-gray-800 break-words w-full">W-103 / R-303</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Reason for Admission</span>
                    <span className=" text-gray-800 break-words w-full">Severe asthma attack</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Treatment</span>
                    <span className=" text-gray-800 break-words w-full">
                      Respiratory therapy and medication adjustment
                    </span>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
                {/* Header */}
                <div className="flex items-center px-[31px] py-[15px] border-b border-gray-200">
                  <ShieldPlus className="w-5 h-5 mr-2" />
                  <h2 className="text-gray-800 font-semibold">Insurance Details</h2>
                </div>

                {/* Content */}
                <div className="p-[31px] space-y-4 text-sm">
                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Insurance Provider</span>
                    <span className="text-gray-800 break-words w-full">
                      HealthCare Insurance Co.
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Policy Number</span>
                    <span className="text-gray-800 break-words w-full">HCI123456789</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Policy Type</span>
                    <span className="text-gray-800 break-words w-full">Individual</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Coverage Period</span>
                    <span className="text-gray-800 break-words w-full">
                      2024-01-01 to 2025-01-01
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Coverage Amount</span>
                    <span className="text-gray-800 break-words w-full">$500,000.00</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-500 w-[30%]">Co-payment</span>
                    <span className="text-gray-800 break-words w-full">15%</span>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Header */}
                <div className="flex items-center px-[31px] py-[15px] border-b border-gray-200">
                  <History className="w-5 h-5 mr-2" />
                  <h2 className="text-gray-800 font-semibold">Visit History</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto px-[31px]">
                  <table className="min-w-full text-sm text-left">
                    <thead className="text-gray-600 font-medium">
                      <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Doctor</th>
                        <th className="px-4 py-2">Treatment</th>
                        <th className="px-4 py-2">Charges ($)</th>
                        <th className="px-4 py-2">Outcome</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-[#96a2b4]">
                      {visitHistory.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2">{item.date}</td>
                          <td className="px-4 py-2">{item.doctor}</td>
                          <td className="px-4 py-2">{item.treatment}</td>
                          <td className="px-4 py-2">{item.charges}</td>
                          <td className="px-4 py-2">{item.outcome}</td>
                          <td className="px-4 py-2 text-center flex flex-col justify-center gap-4">
                            <button className="hover:text-blue-800">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="hover:text-green-800">
                              <Pencil className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >

    </>
  )
}
