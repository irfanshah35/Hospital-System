import React from 'react';
import { Home, Settings, FileText, Paperclip } from 'lucide-react';

export default function MedicalRecordComponent() {
  const records = [
    {
      date: "25/12/2017",
      time: "Now",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
      bgColor: "bg-white",
      title: "No Activity",
      content: null
    },
    {
      date: "03:45 AM",
      time: "Today",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop",
      bgColor: "bg-white",
      title: "X-Ray",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
    },
    {
      date: "25/08/2020",
      time: "01:30 PM",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      bgColor: "bg-orange-400",
      title: "Consultation",
      content: (
        <div>
          <p className="text-gray-700 mb-2">Consultation with <span className="text-blue-500 cursor-pointer hover:underline">Dr. John Deo</span></p>
        </div>
      )
    },
    {
      date: "04/09/2020",
      time: "02:00 PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
      bgColor: "bg-white",
      title: "Prescription",
      content: (
        <div>
          <p className="text-gray-700 mb-4">Write prescriptio by <span className="text-blue-500 cursor-pointer hover:underline">Dr. Sarah Smith</span> and necessary advice to patient.</p>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText size={32} className="text-red-500" />
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Paperclip size={16} />
            <span>2 attachments — </span>
            <a href="#" className="text-blue-500 hover:underline">Download all attachments</a>
            <span> | </span>
            <a href="#" className="text-blue-500 hover:underline">View all images</a>
          </div>
        </div>
      )
    },
    {
      date: "03/09/2020",
      time: "10:30 PM",
      relativeTime: "One weeks ago",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
      bgColor: "bg-white",
      title: "Operation",
      content: (
        <div>
          <p className="text-gray-700 mb-4">Pianoforte principles our unaffected not for astonished travelling are particular.</p>

          <p className="text-sm font-semibold text-gray-800 mb-3">Doctor Team</p>

          <div className="flex flex-wrap gap-4">
            <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-300">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-300">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-300">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-300">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      date: "29/08/2020",
      time: "01:30 PM",
      relativeTime: "Two weeks ago",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop",
      bgColor: "bg-blue-400",
      title: "Consultation",
      content: (
        <div>
          <p className="text-gray-700 mb-3">Consultation with <span className="text-blue-500 cursor-pointer hover:underline">Dr. Sarah Smith</span></p>

          <p className="text-gray-700 italic">"Debating me breeding be answered an he. Spoil event was words her off cause any. Tears woman which no is world miles woody. Wished be do mutual except in effect answer."</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#e8ebf3]">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center flex-wrap space-x-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Medical Records</span>
          <span className="text-gray-400">›</span>
          <Home size={16} className="text-gray-500" />
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Medical Records</span>
        </div>
      </div>

      {/* Settings Button */}
      <button className="fixed right-4 sm:right-6 bottom-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors z-50">
        <Settings size={24} className="text-white" />
      </button>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Records</h2>
          </div>

          {/* Timeline */}
          <div className="p-4 sm:p-6">
            <div className="space-y-8">
              {records.map((record, index) => (
                <div key={index} className="flex gap-4 sm:gap-6">
                  {/* Left Side - Date & Avatar */}
                  <div className="flex flex-col items-end min-w-[100px] sm:min-w-[140px]">
                    <div className="text-right mb-2">
                      <div className="text-sm sm:text-base font-semibold text-gray-800">{record.date}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{record.time}</div>
                      {record.relativeTime && (
                        <div className="text-xs text-gray-500 mt-1">{record.relativeTime}</div>
                      )}
                    </div>
                  </div>

                  {/* Timeline Line */}
                  <div className="relative flex flex-col items-center">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-4 border-white shadow-md ${record.bgColor} flex-shrink-0`}>
                      <img
                        src={record.image}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index !== records.length - 1 && (
                      <div className="w-0.5 bg-gray-300 flex-1 min-h-[60px]"></div>
                    )}
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">{record.title}</h3>
                      {record.content && (
                        <div className="text-sm text-gray-700">
                          {record.content}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}