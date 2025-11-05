"use client"
import React, { useState } from 'react';
import { Home, MapPin, MessageSquare, DollarSign, Clock, Settings, Star } from 'lucide-react';

export default function DoctorPageComponent() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      qualification: "MBBS,MD -Dermatology",
      rating: 4,
      totalRatings: 12342,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
      address: "Shanti Nagar Bldg No B 4, Sector No 6, Mira Road",
      feedback: 234,
      fee: 500,
      timing: "MON - SAT 10:00 AM - 8:00PM",
      bgColor: "bg-gray-100"
    },
    {
      id: 2,
      name: "Dr.Jay Soni",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      qualification: "BDS,MDS",
      rating: 3,
      totalRatings: 6545,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
      address: "Shanti Nagar Bldg No B 4, Sector No 6, Mira Road",
      feedback: 176,
      fee: 300,
      timing: "MON - SAT 10:00 AM - 8:00PM",
      bgColor: "bg-orange-400"
    },
    {
      id: 3,
      name: "Dr. Ashton Cox",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
      qualification: "DHMS,BHMS",
      rating: 3,
      totalRatings: 34,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
      address: "Shanti Nagar Bldg No B 4, Sector No 6, Mira Road",
      feedback: 12,
      fee: 200,
      timing: "MON - SAT 10:00 AM - 8:00PM",
      bgColor: "bg-gray-100"
    },
    {
      id: 4,
      name: "Dr. Angelica Ramos",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      qualification: "BDS,MDS",
      rating: 5,
      totalRatings: 765,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
      address: "Shanti Nagar Bldg No B 4, Sector No 6, Mira Road",
      feedback: 354,
      fee: 350,
      timing: "MON - SAT 10:00 AM - 8:00PM",
      bgColor: "bg-gray-100"
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? "fill-orange-400 text-orange-400" : "fill-gray-300 text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#e8ebf3]">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center flex-wrap space-x-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Doctors</span>
          <span className="text-gray-400">›</span>
          <Home size={16} className="text-gray-500" />
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Doctors</span>
        </div>
      </div>


      {/* Doctor Cards */}
      <div className="px-6 py-6 space-y-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section - Image and Info */}
              <div className="flex gap-4 flex-1">
                {/* Doctor Image */}
                <div className={`w-32 h-32 rounded-2xl overflow-hidden ${doctor.bgColor} flex-shrink-0`}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-cyan-500 mb-2">
                    {doctor.name}
                  </h2>
                  <p className="text-sm text-gray-700 mb-3">{doctor.qualification}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                    {renderStars(doctor.rating)}
                    <span className="text-sm text-gray-600">({doctor.totalRatings} ratings)</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Lorem Ipsum</span> {doctor.description.replace('Lorem Ipsum', '')}
                  </p>
                </div>
              </div>

              {/* Right Section - Details */}
              <div className="flex flex-col justify-between lg:min-w-[300px] space-y-3">
                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-gray-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{doctor.address}</span>
                </div>

                {/* Feedback */}
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doctor.feedback} Feedback</span>
                </div>

                {/* Fee */}
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">INR {doctor.fee}</span>
                </div>

                {/* Timing */}
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doctor.timing}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}