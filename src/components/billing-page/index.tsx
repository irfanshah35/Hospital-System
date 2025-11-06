import React from 'react';
import { Home, Download, Eye, Trash2, Settings, Printer, CloudDownload } from 'lucide-react';

export default function BillingPage() {
  const billing = [
    {
      id: "#A348",
      createdBy: "Dr. Jacob Ryan",
      date: "12/05/2016",
      disease: "Fever",
      diseaseColor: "text-red-600 border-red-600",
      amount: "$150.00",
      tax: "$15.00",
      discount: "$10.00",
      total: "$155.00"
    },
    {
      id: "#A645",
      createdBy: "Dr. Rajesh",
      date: "12/05/2016",
      disease: "Cholera",
      diseaseColor: "text-green-600 border-green-600",
      amount: "$200.00",
      tax: "$20.00",
      discount: "$15.00",
      total: "$205.00"
    },
    {
      id: "#A873",
      createdBy: "Dr. Jay Soni",
      date: "12/05/2016", 
      disease: "Jaundice",
      diseaseColor: "text-purple-600 border-purple-600",
      amount: "$180.00",
      tax: "$18.00",
      discount: "$12.00",
      total: "$186.00"
    },
    {
      id: "#A927",
      createdBy: "Dr. John Deo",
      date: "12/05/2016",
      disease: "Typhoid",
      diseaseColor: "text-purple-600 border-purple-600", 
      amount: "$220.00",
      tax: "$22.00",
      discount: "$18.00",
      total: "$224.00"
    },
    {
      id: "#A228",
      createdBy: "Dr. Megha Trivedi",
      date: "12/05/2016",
      disease: "Malaria",
      diseaseColor: "text-orange-500 border-orange-500",
      amount: "$170.00",
      tax: "$17.00",
      discount: "$13.00", 
      total: "$174.00"
    },
    {
      id: "#A345",
      createdBy: "Dr. Sarah Smith", 
      date: "12/05/2016",
      disease: "Infection",
      diseaseColor: "text-cyan-500 border-cyan-500",
      amount: "$190.00",
      tax: "$19.00",
      discount: "$14.00",
      total: "$195.00"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center flex-wrap space-x-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Billing</span>
          <span className="text-gray-400">›</span>
          <Home size={16} className="text-gray-500" />
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Billing</span>
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
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Billing Records</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto px-8 pb-8">
            <table className="w-full">
              <thead>
                <tr className=" border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Invoice No</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Doctor Name</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Tax</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Discount</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {billing.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{item.id}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-cyan-500 hover:underline cursor-pointer">
                        {item.createdBy}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{item.date}</td>
                    <td className="px-6 py-4 text-sm font-medium">{item.amount}</td>
                    <td className="px-6 py-4 text-sm ">{item.tax}</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-medium">{item.discount}</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">{item.total}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button 
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          title="Download Invoice"
                        >
                          <CloudDownload className="w-5 h-5 text-purple-600" />
                        </button>
                        <button 
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={20} className="text-[#4CAF50]" />
                        </button>
                        <button 
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          title="Print"
                        >
                          <Printer size={20} className="text-[#2196F3]" />
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