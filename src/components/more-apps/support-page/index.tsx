'use client'
import { useState } from 'react';
import { Ticket, Reply, CheckCircle, List, Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Home, Pencil } from 'lucide-react';

interface TicketData {
  id: number;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  subject: string;
  status: 'open' | 'closed' | 'pending';
  assignedTo: string;
  date: string;
  selected: boolean;
}

export default function SupportPage() {

  const [tickets, setTickets] = useState<TicketData[]>([
    {
      id: 1,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "closed",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 2,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "closed",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 3,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "open",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 4,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "closed",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 5,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "open",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 6,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "closed",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 7,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "open",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 8,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "pending",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 9,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "closed",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    },
    {
      id: 10,
      user: { name: "Tim Hank", avatar: "/assets/patient-1.jpg", email: "test@example.com" },
      subject: "Image not Proper",
      status: "closed",
      assignedTo: "John Deo",
      date: "27/05/2016",
      selected: false
    }
  ]);

  const stats = [
    {
      title: "Total Tickets",
      count: "1,276",
      subtitle: "18% Higher Than Last Month",
      color: "blue",
      icon: Ticket,
    },
    {
      title: "Reply",
      count: "865",
      subtitle: "21% Higher Than Last Month",
      color: "green",
      icon: Reply,
    },
    {
      title: "Resolve",
      count: "457",
      subtitle: "37% Higher Than Last Month",
      color: "yellow",
      icon: CheckCircle,
    },
    {
      title: "Pending",
      count: "239",
      subtitle: "10% Higher Than Last Month",
      color: "pink",
      icon: List,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const toggleTicketSelection = (id: number) => {
    setTickets(tickets.map(ticket =>
      ticket.id === id ? { ...ticket, selected: !ticket.selected } : ticket
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit ticket:', id);
  };

  const handleDelete = (id: number) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  const paginatedTickets = tickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="min-h-screen ">
      {/* Breadcrumb */}
      <div className="px-6 py-2 bg-white">
        <div className="flex items-center text-gray-600">
          <span className="font-semibold text-[20px] text-gray-800">Support</span>
          <ChevronRight className="w-5 h-5 text-gray-400 mx-1" />
          <Home size={16} className="text-gray-500" />
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
          <span className="text-gray-600 text-[15px]">Apps</span>
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
          <span className="text-gray-600 text-[15px]">Support</span>
        </div>
      </div>



      <div className='py-2 px-6'>
        <div className=" bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f] p-4">
          <div className="">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-[17px] font-semibold text-gray-800">Support Tickets</h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map(({ title, count, subtitle, color, icon: Icon }, index) => (
                <div
                  key={index}
                  className={`bg-${color}-500 text-white rounded-sm p-6 shadow-sm`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-white text-[18px] font-medium mb-[15px]`}>
                        {title}
                      </p>
                      <div className='flex justify-between items-center mb-4'>
                        <Icon className={`w-8 h-8 text-white`} />
                        <p className="text-3xl font-bold">{count}</p>
                      </div>
                      <p className={`text-white text-xs mt-2`}>{subtitle}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className=" border-b border-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                        Opened By
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                        Assign To
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-15">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={ticket.selected}
                            onChange={() => toggleTicketSelection(ticket.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={ticket.user.avatar}
                            alt={ticket.user.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {ticket.user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {ticket.user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {ticket.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {ticket.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {ticket.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col space-x-2">
                            <button
                              onClick={() => handleEdit(ticket.id)}
                              className="text-gray-600 hover: transition-colors p-1 rounded"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(ticket.id)}
                              className="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div>
                <Paginator totalItems={tickets.length} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
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
