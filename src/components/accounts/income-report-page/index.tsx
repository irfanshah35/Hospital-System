"use client"
import { Home } from 'lucide-react'
import React, { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const chartData = {
  Daily: [
    { name: "Mon", income: 40 },
    { name: "Tue", income: 28 },
    { name: "Wed", income: 51 },
    { name: "Thu", income: 41 },
    { name: "Fri", income: 88 },
    { name: "Sat", income: 77 },
    { name: "Sun", income: 90 }
  ],
  Monthly: [
    { name: "Jan '24", income: 65 },
    { name: "Feb '24", income: 78 },
    { name: "Mar '24", income: 90 },
    { name: "Apr '24", income: 55 },
    { name: "May '24", income: 75 },
    { name: "Jun '24", income: 85 },
    { name: "Jul '24", income: 95 },
    { name: "Aug '24", income: 70 },
    { name: "Sep '24", income: 80 },
    { name: "Oct '24", income: 65 },
    { name: "Nov '24", income: 75 },
    { name: "Dec '24", income: 88 }
  ],
  Yearly: [
    { name: "2019", income: 45 },
    { name: "2020", income: 55 },
    { name: "2021", income: 65 },
    { name: "2022", income: 75 },
    { name: "2023", income: 85 },
    { name: "2024", income: 95 }
  ]
};

// Dynamic Y-axis configuration based on data
const getYAxisConfig = (data: any[]) => {
  const maxIncome = Math.max(...data.map(item => item.income));
  const roundedMax = Math.ceil(maxIncome / 10) * 10; // Round up to nearest 10
  const ticks = [];

  for (let i = 0; i <= roundedMax; i += Math.ceil(roundedMax / 5)) {
    ticks.push(i);
  }

  return {
    domain: [0, roundedMax],
    ticks: ticks
  };
};


const tableData = [
  {
    department: "Anatomy",
    monthly: [2980, 3480, 1980, 2080, 2480, 7680, 8480, 6680, 1080, 3280, 2080, 1680],
    yearly: 43960
  },
  {
    department: "Cardiology",
    monthly: [5230, 6150, 7340, 6890, 8120, 7560, 9240, 8450, 7890, 8760, 7890, 8430],
    yearly: 91950
  },
  {
    department: "Neurology",
    monthly: [4560, 5230, 6780, 5890, 7120, 6780, 8230, 7560, 6890, 7340, 6780, 7230],
    yearly: 80390
  },
  {
    department: "Orthopedics",
    monthly: [3890, 4560, 5230, 4890, 6120, 5780, 7230, 6560, 5890, 6340, 5780, 6230],
    yearly: 68500
  },
  {
    department: "Pediatrics",
    monthly: [3120, 3780, 4230, 3890, 5120, 4780, 6230, 5560, 4890, 5340, 4780, 5230],
    yearly: 56950
  }
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function IncomeReportpage() {
  const [timeRange, setTimeRange] = useState("Monthly");

  const currentData = chartData[timeRange as keyof typeof chartData];
  const yAxisConfig = getYAxisConfig(currentData);

  const formatTooltipValue = (value: number) => {
    return [`$${value}K`, 'Income'];
  };

  const [selectedYear, setSelectedYear] = useState("2024");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <>
      <div className='px-4 sm:px-6 py-[20px] mt-0'>
        <div className="flex items-center justify-between relative top-[-5px] mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-[20px] font-semibold">Income report</h1>
            <span className="text-[20px] font-bold">›</span>
            <Home size={18} />
            <span>›</span>
            <span className="text-sm">Accounts</span>
            <span>›</span>
            <span className="text-sm">Income report</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6">
          {/* Header */}
          <div className="flex justify-between border-t rounded-t-xl items-start sm:items-center py-3 px-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
              Income Chart
            </h2>

            {/* Time Range Selector */}
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-[#EDEDED] border border-gray-300 rounded-lg px-2 py-1 pr-8 text-gray-700 focus:outline-none"
              >
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="py-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={currentData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#407fe4" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#407fe4" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    horizontal={true}
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9aa0ac', fontSize: 12 }}
                    padding={{ left: 10, right: 10 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9aa0ac', fontSize: 11 }}
                    domain={yAxisConfig.domain}
                    ticks={yAxisConfig.ticks}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: '#374151', fontWeight: '600' }}
                    formatter={formatTooltipValue}
                  />

                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#407fe4"
                    strokeWidth={3}
                    fill="url(#incomeGradient)"
                    activeDot={{ r: 6, stroke: '#407fe4', strokeWidth: 2, fill: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between border-t rounded-t-xl items-start sm:items-center py-3 px-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
              Income Table
            </h2>

            {/* Year Selector */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-[#EDEDED] border border-gray-300 rounded-lg px-2 py-1 pr-8 text-gray-700 focus:outline-none"
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Scrollable Table Container */}
          <div className="p-6">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow  rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="">
                      <tr>
                        <th className="sticky left-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider z-10">
                          Department
                        </th>
                        {months.map((month) => (
                          <th
                            key={month}
                            className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {month}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Yearly
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((row, index) => (
                        <tr key={row.department}>
                          <td className="sticky left-0 bg-inherit px-6 py-4 whitespace-nowrap text-sm  text-gray-500 z-10">
                            {row.department}
                          </td>

                          {row.monthly.map((amount, monthIndex) => (
                            <td
                              key={monthIndex}
                              className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                            >
                              {formatCurrency(amount)}
                            </td>
                          ))}

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {formatCurrency(row.yearly)}
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
      </div>
    </>
  )
}
