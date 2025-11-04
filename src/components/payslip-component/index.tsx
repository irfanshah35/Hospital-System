import React from 'react';
import { Download, Printer, Settings } from 'lucide-react';

const PaySlipComponent = () => {
  return (
    <div className="min-h-screen bg-[#e9ecef] py-3 sm:py-6 px-3 sm:px-4">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto mb-3 sm:mb-5">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 flex-wrap">
          <span className="font-semibold text-gray-900">Payslip</span>
          <span>›</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>›</span>
          <span>Payroll</span>
          <span>›</span>
          <span>Payslip</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1100px] mx-auto bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 gap-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">Employee Payslip</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition flex-1 sm:flex-initial">
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Download</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#00bcd4] rounded hover:bg-[#00acc1] transition flex-1 sm:flex-initial">
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Payslip Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Company Logo and Payslip Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#3f51b5] rounded flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                C
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#3f51b5]">Cliniva Hospital</h1>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3f51b5] mb-1">PAYSLIP</h2>
              <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">For the month of June 2022</p>
            </div>
          </div>

          <hr className="border-t-2 border-gray-800 mb-4 sm:mb-6" />

          {/* Payslip Number and Payment Date */}
          <div className="flex flex-col xs:flex-row justify-between mb-6 sm:mb-8 bg-gray-50 p-3 sm:p-4 rounded gap-3 xs:gap-0">
            <div>
              <p className="text-xs text-gray-600 mb-1">Payslip No.</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">859654</p>
            </div>
            <div className="xs:text-right">
              <p className="text-xs text-gray-600 mb-1">Payment Date</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">Jul 02, 2022</p>
            </div>
          </div>

          {/* Company and Employee Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Company Details */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#3f51b5] mb-3 sm:mb-4 pb-2 border-b border-gray-300">Company Details</h3>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-semibold text-gray-900">Elnfosoft Technology</p>
                <p className="text-gray-700">52, Titanium software hub</p>
                <p className="text-gray-700">Gift city, Gandinagar</p>
                <p className="text-gray-700">India</p>
                <p className="text-[#3f51b5] hover:underline cursor-pointer break-all">hr@einfosoft.com</p>
              </div>
            </div>

            {/* Employee Details */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#3f51b5] mb-3 sm:mb-4 pb-2 border-b border-gray-300">Employee Details</h3>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-semibold text-gray-900">Sarah Smith</p>
                <p className="text-gray-700">Employee ID: EMP-0025</p>
                <p className="text-gray-700">A 507 Parimal Hights</p>
                <p className="text-gray-700">Near Shyamal Cross, Ahmedabad</p>
                <p className="text-gray-700">India</p>
                <p className="text-[#3f51b5] hover:underline cursor-pointer break-all">sarah@einfosoft.com</p>
              </div>
            </div>
          </div>

          {/* Earnings and Deductions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
            {/* Earnings */}
            <div className="overflow-x-auto">
              <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4 pb-2 border-b-2 border-gray-300">Earnings</h3>
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-700">Description</th>
                    <th className="text-right py-2 font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">Basic Salary</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$8,568.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">House Rent Allowance</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$125.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">Dearness Allowance</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$87.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">Special Allowance</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$50.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">Performance Bonus</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$75.00</td>
                  </tr>
                  <tr className="border-t-2 border-gray-300">
                    <td className="py-2.5 sm:py-3 font-bold text-gray-900">Total Earnings</td>
                    <td className="py-2.5 sm:py-3 text-right font-bold text-gray-900 whitespace-nowrap">$8,905.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions */}
            <div className="overflow-x-auto">
              <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4 pb-2 border-b-2 border-gray-300">Deductions</h3>
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-700">Description</th>
                    <th className="text-right py-2 font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">Provident Fund</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$10.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">Professional Tax</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$20.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">ESI</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$0.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">Home Loan</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$210.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-2.5 text-gray-700">TDS</td>
                    <td className="py-2 sm:py-2.5 text-right text-gray-900 whitespace-nowrap">$113.00</td>
                  </tr>
                  <tr className="border-t-2 border-gray-300">
                    <td className="py-2.5 sm:py-3 font-bold text-gray-900">Total Deductions</td>
                    <td className="py-2.5 sm:py-3 text-right font-bold text-gray-900 whitespace-nowrap">$353.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Pay */}
          <div className="bg-[#3f51b5] text-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="w-full sm:w-auto">
                <p className="text-base sm:text-lg font-bold mb-1">Net Pay:</p>
                <p className="text-xs sm:text-sm">Eight Thousand Five Hundred Fifty Two Dollars Only</p>
              </div>
              <div className="text-2xl sm:text-3xl font-bold">$8,552.00</div>
            </div>
          </div>

          {/* Signature */}
          <div className="flex justify-center sm:justify-end mb-4 sm:mb-6">
            <div className="text-center">
              <div className="w-32 sm:w-40 h-12 sm:h-16 mb-2 flex items-end justify-center">
                <div className="w-24 sm:w-32 border-b border-gray-400"></div>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Priya Jain</p>
              <p className="text-xs sm:text-sm text-gray-600">HR Manager</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-3 sm:pt-4 border-t border-gray-200">
            <p className="mb-1">This is a computer-generated document. No signature is required.</p>
            <p>For any queries regarding this payslip, please contact HR department.</p>
          </div>
        </div>
      </div>

      {/* Settings Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 bg-[#3f51b5] text-white rounded-full shadow-lg hover:bg-[#303f9f] transition flex items-center justify-center z-50">
        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default PaySlipComponent;