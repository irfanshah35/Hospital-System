import { ArrowDownToLine, Home, Mail, Printer } from 'lucide-react'
import React from 'react'

export default function InvoicePage() {

    const invoiceItems = [
        {
            id: 1,
            description: "Visiting Charges",
            quantity: "-",
            unitPrice: "-",
            charges: "$100",
            discount: "-",
            total: "$100"
        },
        {
            id: 2,
            description: "Medicines",
            quantity: "10",
            unitPrice: "$15",
            charges: "$150",
            discount: "5%",
            total: "$1000"
        },
        {
            id: 3,
            description: "X-ray Reports",
            quantity: "4",
            unitPrice: "$600",
            charges: "$70",
            discount: "5%",
            total: "$1200"
        },
        {
            id: 4,
            description: "MRI",
            quantity: "2",
            unitPrice: "$245",
            charges: "$125",
            discount: "10%",
            total: "$480"
        },
        {
            id: 5,
            description: "Other Charges",
            quantity: "-",
            unitPrice: "-",
            charges: "-",
            discount: "-",
            total: "$300"
        }
    ];
    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px] mb-4">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-[20px] font-semibold">Invoice</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Billing</span>
                        <span>›</span>
                        <span className="text-sm">Invoice</span>
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                    {/* Invoice Header */}
                    <div className="p-3 px-4 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between gap-4">
                                <h2 className="text-2xl font-bold text-gray-800">INVOICE #345766</h2>
                                <span className="bg-green-100 max-w-[54px] max-h-[29px] text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Paid
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Company and Client Info */}
                    <div className="p-6 px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Company Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="">
                                        <img className='max-w-[147px] h-[48px]' src="/invoice_logo.png" alt="" />
                                    </div>

                                </div>
                                <div className="text-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Cliniva Hospital</h3>
                                    <p>D 103, Cliniva Hospital</p>
                                    <p>Opp. Town Hall</p>
                                    <p>Sardar Patel Road</p>
                                    <p>Ahmedabad - 380015</p>
                                </div>
                            </div>

                            {/* Client Info */}
                            <div className="space-y-4 text-right">
                                <h3 className="text-lg font-semibold text-gray-800">BILL TO</h3>
                                <h4 className="text-xl font-bold text-gray-900">Jayesh Patel</h4>
                                <div className="text-gray-600">
                                    <p>207, Prem Sagar Appt.</p>
                                    <p>Near Income Tax Office</p>
                                    <p>Ashram Road</p>
                                    <p>Ahmedabad - 380057</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-end">
                                        <span className="text-gray-600">Invoice Date:</span>
                                        <span className="font-medium">14th July 2023</span>
                                    </div>
                                    <div className="flex justify-end">
                                        <span className="text-gray-600">Due Date:</span>
                                        <span className="font-medium">28th July 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Items */}
                    <div className="p-6 px-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Items</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            #
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Description
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Quantity
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Unit Price
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Charges
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Discount
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoiceItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.id}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.description}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                {item.unitPrice}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                {item.charges}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                {item.discount}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                                                {item.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>

                                    <tr className="">
                                        <td></td>
                                        <td colSpan={5} className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Subtotal
                                        </td>
                                        <td colSpan={2} className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                                            $2600
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="p-6 px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Payment Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg text-gray-800 mb-[15px]">Payment Information</h3>
                                <div className="space-y-3 text-sm pl-2">
                                    <div className="flex gap-4">
                                        <span className="">Payment Method:</span>
                                        <span className="text-gray-600">Credit Card</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="">Payment Terms:</span>
                                        <span className="text-gray-600">Due on Receipt</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="">Note:</span>
                                        <span className="text-gray-600">Thank you for your business!</span>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Totals */}
                            <div className="space-y-3 bg-white shadow-lg p-5 rounded-lg text-sm">
                                <div className="flex justify-between border-b border-gray-300 py-2">
                                    <span className="font-medium">Subtotal:</span>
                                    <span className="font-medium">$2,600.00</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-300 py-2">
                                    <span className="font-medium">Discount:</span>
                                    <span className="font-medium ">-$100.00</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-300 py-2">
                                    <span className=" font-medium">Tax (10%):</span>
                                    <span className="font-medium">$160.00</span>
                                </div>
                                <div className="flex justify-between border-t-2 border-gray-300 pt-3">
                                    <span className="text-lg font-semibold text-gray-800">Total:</span>
                                    <span className="text-lg font-bold text-gray-800">$2,760.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 px-8">
                        <div className="flex flex-col md:flex-row gap-3 text-sm font-medium">
                            <button className="flex items-center justify-center gap-2 bg-[#005cbb] hover:[#1469C0] text-white px-4 py-2 rounded-[4px] text-center cursor-pointer">
                                <Printer className='w-5 h-5' />
                                Print
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#005cbb] hover:[#1469C0] text-white px-4 py-2 rounded-[4px] cursor-pointer">
                                <ArrowDownToLine className='w-5 h-5' />
                                Download PDF
                            </button>
                            <button className="flex items-center justify-center gap-2 text-[#005cbb] border border-gray-300 hover:bg-gray-50  px-4 py-2 rounded-[4px] cursor-pointer">
                                <Mail className='w-5 h-5' />
                                Email Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
