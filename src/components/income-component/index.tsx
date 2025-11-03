"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Home, CirclePlus, Download, RotateCw, Trash2, Edit, Settings } from 'lucide-react';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  serviceType: string;
  serviceDate: string;
  amountBilled: number;
  amountPaid: number;
  paymentMethod: string;
  insuranceAmount: number;
  outstandingAmount: number;
  paymentDate: string;
  paymentStatus: string;
  incomeType: string;
  invoiceNumber: string;
}

export default function IncomeComponent() {
  const [detailDropdown, setDetailDropdown] = useState(false);
  const detailref = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [animate, setAnimate] = useState(false);

  const appointments: Appointment[] = [
    {
      id: '1',
      patientId: '56789',
      patientName: 'John Doe',
      serviceType: 'Consultation',
      serviceDate: '11/01/2024',
      amountBilled: 150,
      amountPaid: 120,
      paymentMethod: 'Credit Card',
      insuranceAmount: 30,
      outstandingAmount: 0,
      paymentDate: '11/02/2024',
      paymentStatus: 'Completed',
      incomeType: 'Patient Payment',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: '2',
      patientId: '56790',
      patientName: 'Alice Smith',
      serviceType: 'Surgery',
      serviceDate: '10/25/2024',
      amountBilled: 1200,
      amountPaid: 1000,
      paymentMethod: 'Cash',
      insuranceAmount: 200,
      outstandingAmount: 0,
      paymentDate: '10/26/2024',
      paymentStatus: 'Pending',
      incomeType: 'Patient Payment',
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: '3',
      patientId: '56791',
      patientName: 'David Lee',
      serviceType: 'Consultation',
      serviceDate: '10/30/2024',
      amountBilled: 180,
      amountPaid: 180,
      paymentMethod: 'Insurance',
      insuranceAmount: 180,
      outstandingAmount: 0,
      paymentDate: '10/30/2024',
      paymentStatus: 'Completed',
      incomeType: 'Insurance',
      invoiceNumber: 'INV-2024-003'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (detailref.current && !detailref.current.contains(target)) {
        setDetailDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRefresh = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? appointments.map(p => p.id) : []);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one appointment to delete.");
      return;
    }
    if (window.confirm(`Delete ${selectedIds.length} appointment(s)?`)) {
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedIds.length > 0 && selectedIds.length < appointments.length;
    }
  }, [selectedIds, appointments]);

  const checkboxItems = [
    { label: "Checkbox", checked: true },
    { label: "Patient ID", checked: true },
    { label: "Patient Name", checked: true },
    { label: "Service Type", checked: true },
    { label: "Service Date", checked: true },
    { label: "Amount Billed", checked: true },
    { label: "Amount Paid", checked: true },
    { label: "Payment Method", checked: true },
    { label: "Insurance Amount", checked: true },
    { label: "Outstanding Amount", checked: true },
    { label: "Payment Date", checked: true },
    { label: "Payment Status", checked: true },
    { label: "Income Type", checked: true },
    { label: "Invoice Number", checked: true },
    { label: "Actions", checked: true },
  ];

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px]">
          <div className="flex items-center space-x-2">
            <h1 className="text-[20px] font-semibold">Income</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Accounts</span>
            <span>›</span>
            <span className="text-sm">Income</span>
          </div>
        </div>

        <div className="h-auto mt-3">
          <div className="max-w-full">
            <div className="bg-[#dce3f0] rounded-t-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap justify-between">
                <div className='flex items-center'>
                  <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium text-gray-700">Income</h1>
                  <label className='relative'>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full md:w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium px-[50px] py-2 focus:outline-none"
                    />
                    <span className='absolute left-2 top-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />
                      </svg>
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-1">
                  {selectedIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex justify-center items-center w-10 h-10 rounded-full text-[#f44336] hover:bg-[#CED5E6] transition cursor-pointer"
                      title="Delete Selected"
                    >
                      <Trash2 className="w-[20px] h-[20px]" />
                    </button>
                  )}

                  <div ref={detailref} className='relative'>
                    <button
                      onClick={() => setDetailDropdown(!detailDropdown)}
                      className="flex justify-center items-center w-10 h-10 rounded-full text-indigo-500 cursor-pointer hover:bg-[#CED5E6] transition"
                      title="Show/Hide Columns"
                    >
                      <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z" />
                      </svg>
                    </button>

                    {detailDropdown && (
                      <div className="absolute top-[40px] right-0 z-10 origin-top-right transform transition-all duration-300 ease-out overflow-x-hidden">
                        <div className="px-[15px] h-[300px] max-h-[320px] overflow-y-auto min-w-[218px] bg-[#efedf0] rounded-[6px] overflow-x-hidden">
                          <span className="block text-sm px-[25px] pt-2 font-semibold text-[#212529] leading-[40px]">Show/Hide Column</span>
                          <hr className="border-gray-300 my-2" />
                          <div className="pr-2 pl-[12px]">
                            {checkboxItems.map((item, index) => (
                              <label key={index} className="flex items-center space-x-4 h-[40px] cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultChecked={item.checked}
                                  className="appearance-none h-[18px] w-[18px] ml-[20px] rounded-[2px] bg-white border border-gray-400 checked:bg-[#005CBB] checked:border-[#005CBB] checked:[&:after]:block relative after:hidden after:content-[''] after:absolute after:top-[1px] after:left-[5px] after:w-[6px] after:h-[12px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45"
                                />
                                <span className="text-[13px] text-[#1e2939]">{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer" title="Add">
                    <CirclePlus className='w-[22px] h-[22px]' />
                  </button>

                  <button onClick={handleRefresh} className="flex justify-center items-center w-10 h-10 rounded-full text-[#795548] hover:bg-[#CED5E6] transition cursor-pointer" title="Refresh">
                    <RotateCw className='w-[20px] h-[20px]' />
                  </button>

                  <button className="flex justify-center items-center w-10 h-10 rounded-full text-[#2196f3] hover:bg-[#CED5E6] transition cursor-pointer" title="XLSX Download">
                    <Download className='w-[20px] h-[20px]' />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className='overflow-auto scrollbar-hide'>
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-4 py-3 pl-[37px] text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            id="selectAll"
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                          />
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Patient ID</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Patient Name</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Service Type</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Service Date</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount Billed</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount Paid</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment Method</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Insurance Amount</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Outstanding Amount</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment Date</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment Status</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Income Type</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Invoice Number</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>

                    <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                      {appointments.map((item) => (
                        <tr key={item.id} className="transition-colors duration-150 hover:bg-gray-50">
                          <td className="px-4 py-3 pl-[37px]">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                              className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                            />
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-700">{item.patientId}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.patientName}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.serviceType}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.serviceDate}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.amountBilled}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.amountPaid}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.paymentMethod}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.insuranceAmount}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.outstandingAmount}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.paymentDate}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded ${item.paymentStatus === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {item.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.incomeType}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.invoiceNumber}</td>

                          <td className="px-4 py-3 text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                <Trash2 className="w-5 h-5" />
                              </button>
                              <button className="text-[#5b73e8] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer">
                                <Settings className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div
                    className={`px-6 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""
                      }`}
                  >
                    {appointments.map((item) => (
                      <div key={item.id} className="border-b border-gray-200 py-4">
                        {/* Checkbox Row */}
                        <div className="flex items-center justify-between mb-3">
                          <input
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                        </div>

                        {/* Appointment Info */}
                        <div className="space-y-2 text-sm text-gray-800">
                          {/* Patient ID */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Patient ID:</span>
                            <span>{item.patientId || "—"}</span>
                          </div>

                          {/* Patient Name */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Patient Name:</span>
                            <span>{item.patientName || "N/A"}</span>
                          </div>

                          {/* Service Type */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Service Type:</span>
                            <span>{item.serviceType || "—"}</span>
                          </div>

                          {/* Service Date */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Service Date:</span>
                            <span>{item.serviceDate || "—"}</span>
                          </div>

                          {/* Amount Billed */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Amount Billed:</span>
                            <span>{item.amountBilled || "—"}</span>
                          </div>

                          {/* Amount Paid */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Amount Paid:</span>
                            <span>{item.amountPaid || "—"}</span>
                          </div>

                          {/* Payment Method */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Payment Method:</span>
                            <span>{item.paymentMethod || "—"}</span>
                          </div>

                          {/* Insurance Amount */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Insurance Amount:</span>
                            <span>{item.insuranceAmount || "—"}</span>
                          </div>

                          {/* Outstanding Amount */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Outstanding Amount:</span>
                            <span>{item.outstandingAmount || "—"}</span>
                          </div>

                          {/* Payment Date */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Payment Date:</span>
                            <span>{item.paymentDate || "—"}</span>
                          </div>

                          {/* Payment Status */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Payment Status:</span>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded ${item.paymentStatus === "Paid"
                                  ? "bg-[#19875426] text-[#198754]"
                                  : item.paymentStatus === "Pending"
                                    ? "bg-[#ffc10726] text-[#ffc107]"
                                    : item.paymentStatus === "Unpaid"
                                      ? "bg-[#dc354526] text-[#dc3545]"
                                      : "bg-[#0dcaf026] text-[#0dcaf0]"
                                }`}
                            >
                              {item.paymentStatus || "Pending"}
                            </span>
                          </div>

                          {/* Income Type */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Income Type:</span>
                            <span>{item.incomeType || "—"}</span>
                          </div>

                          {/* Invoice Number */}
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                            <span className="font-semibold w-40">Invoice Number:</span>
                            <span>{item.invoiceNumber || "—"}</span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3 pt-2">
                            <div className="flex space-x-2">
                              <button
                                className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Paginator totalItems={appointments.length} />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown { animation: slideDown 0.4s ease-in-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}

function Paginator({ totalItems = 0 }: { totalItems: number }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-end gap-8 border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 rounded-b-xl shadow-sm">
      <div className="font-medium">
        {totalItems > 0 ? `${startItem} – ${endItem} of ${totalItems}` : "0 – 0 of 0"}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`w-9 h-9 rounded-full flex items-center justify-center ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`w-9 h-9 rounded-full flex items-center justify-center ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}