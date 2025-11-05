import React from 'react';
import { Home, Download, Eye, Trash2, Settings } from 'lucide-react';

export default function PrescriptionsComponent() {
  const prescriptions = [
    {
      id: "#A348",
      title: "Prescription 1",
      createdBy: "Dr.Jacob Ryan",
      date: "12/05/2016",
      disease: "Fever",
      diseaseColor: "text-red-600 border-red-600"
    },
    {
      id: "#A645",
      title: "Prescription 2",
      createdBy: "Dr.Rajesh",
      date: "12/05/2016",
      disease: "Cholera",
      diseaseColor: "text-green-600 border-green-600"
    },
    {
      id: "#A873",
      title: "Prescription 3",
      createdBy: "Dr.Jay Soni",
      date: "12/05/2016",
      disease: "Jaundice",
      diseaseColor: "text-purple-600 border-purple-600"
    },
    {
      id: "#A927",
      title: "Prescription 4",
      createdBy: "Dr.John Deo",
      date: "12/05/2016",
      disease: "Typhod",
      diseaseColor: "text-purple-600 border-purple-600"
    },
    {
      id: "#A228",
      title: "Prescription 5",
      createdBy: "Dr.Megha Trivedi",
      date: "12/05/2016",
      disease: "Maleria",
      diseaseColor: "text-orange-500 border-orange-500"
    },
    {
      id: "#A345",
      title: "Prescription 6",
      createdBy: "Dr.Sarah Smith",
      date: "12/05/2016",
      disease: "Infection",
      diseaseColor: "text-cyan-500 border-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#e8ebf3]">
      {/* Breadcrumb */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center flex-wrap space-x-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Prescriptions</span>
          <span className="text-gray-400">›</span>
          <Home size={16} className="text-gray-500" />
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Prescriptions</span>
        </div>
      </div>

      {/* Settings Button */}
      <button className="fixed right-6 bottom-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors z-50">
        <Settings size={24} className="text-white" />
      </button>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Prescriptions</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Created by</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Diseases</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) => (
                  <tr key={prescription.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{prescription.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{prescription.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-cyan-500 hover:underline cursor-pointer">
                        {prescription.createdBy}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{prescription.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full border text-sm font-medium ${prescription.diseaseColor} bg-white`}>
                        {prescription.disease}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors">
                          <Download size={18} className="text-white" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
                          <Eye size={18} className="text-white" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors">
                          <Trash2 size={18} className="text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}