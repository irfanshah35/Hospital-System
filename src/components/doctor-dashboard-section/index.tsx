"use client"
import { useThemeStore } from '@/store/store';
import { CalendarDays, ChevronRight, Clock4, DollarSign, MoreVertical, TrendingUp } from 'lucide-react'
import React from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
    Legend,
    YAxis,
    XAxis,
    CartesianGrid,
    Bar,
    BarChart,
    Pie,
    PieChart,
    Cell,
} from "recharts";

const data = [
    { name: "Jan", uv: 40, pv: 30, amt: 20 },
    { name: "Feb", uv: 70, pv: 50, amt: 30 },
    { name: "Mar", uv: 60, pv: 40, amt: 25 },
    { name: "Apr", uv: 90, pv: 70, amt: 45 },
    { name: "May", uv: 75, pv: 65, amt: 35 },
    { name: "Jun", uv: 85, pv: 55, amt: 25 },
    { name: "Jul", uv: 70, pv: 45, amt: 20 },
];
const BarChat = [
    { name: "A", value: 60 },
    { name: "B", value: 90 },
    { name: "C", value: 80 },
    { name: "D", value: 70 },
    { name: "E", value: 85 },
    { name: "F", value: 75 },
    { name: "G", value: 65 },
];
const appoint = [
    { name: "Completed", value: 60 },
    { name: "Pending", value: 30 },
    { name: "Cancelled", value: 10 },
];

const COLORS = ["#007aff", "#34c759", "#ff3b30"];

export default function DoctorDashboardSection() {

    const { websiteTheme } = useThemeStore();

    const surveyData = [
        { date: "00:00", newPatients: 52, oldPatients: 32 },
        { date: "01:00", newPatients: 48, oldPatients: 30 },
        { date: "02:00", newPatients: 45, oldPatients: 28 },
        { date: "03:00", newPatients: 65, oldPatients: 38 },
        { date: "04:00", newPatients: 82, oldPatients: 52 },
        { date: "05:00", newPatients: 78, oldPatients: 45 },
        { date: "06:00", newPatients: 55, oldPatients: 20 },
    ];


    const events: Record<number, string[]> = {
        4: ["evaluation"],
        6: ["surgery", "polyclinic"],
        7: ["surgery"],
        15: ["evaluation"],
        16: ["surgery", "evaluation"],
        21: ["polyclinic"],
        22: ["surgery", "polyclinic", "evaluation"],
        23: ["surgery"],
        28: ["polyclinic"],
        29: ["surgery", "evaluation"],
        30: ["surgery"],
    };

    const colors: Record<string, string> = {
        surgery: "bg-blue-500",
        polyclinic: "bg-red-500",
        evaluation: "bg-green-500",
    };
    return (
        <>
            <div className={`pt-[20px] pl-[25px] ${websiteTheme === 'dark' ? 'dark-theme' : 'light-theme'}`}
            style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
                <div className="block-header flex items-center justify-between mt-3 mb-3">
                    <div className="w-full">
                        <ul className="flex flex-wrap items-center gap-1 ">
                            <li>
                                <h4 className="text-[20px] font-medium text-[var(--text-primary)]">Doctor Dashboard</h4>
                            </li>
                            <li className="flex flex-wrap items-center gap-2">
                                <ChevronRight className='h-[16px] w-[16px] font-bold text-[var(--text-secondary)]' />
                            </li>
                            <li className="flex items-center text-sm">
                                <a className="flex items-center hover:text-gray-800 transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-[18px] h-[18px] text-[var(--text-primary)]"
                                    >
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>

                                </a>
                            </li>
                            <li className="flex flex-wrap items-center gap-2 ">
                                <ChevronRight className='h-[16px] w-[16px] font-bold text-[var(--text-secondary)]' />
                            </li>
                            <li className="font-medium text-[var(--text-primary)]">Dashboard</li>
                        </ul>
                    </div>
                </div>




                <div className="flex gap-[24px]">

                    <div className="w-full lg:w-8/12 order-2 lg:order-1 mt-[22px] mb-6 lg:mb-0">


                        <div className="bg-[var(--header-bg)] rounded-lg shadow p-[16px] border border-[var(--border-color)]">
                            <div className="flex items-center gap-6">
                                <div className="w-full md:w-8/12 mb-6 md:mb-0">
                                    <p className="font-medium text-sm mb-[18px] text-[var(--text-secondary)]">Welcome back</p>
                                    <div className="font-medium text-[25px] text-[#2195F3] mb-2">DR. Sarah Smith!</div>
                                    <p className="font-medium text-[14px] mb-6 text-[var(--text-secondary)]">Gynecologist, MBBS, MD</p>

                                    <div className="grid grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                                        <div className="flex flex-wrap justify-center mb-5">
                                            <div className="w-full max-w-[220px] p-4 bg-[#dfdcf6] dark:bg-[#2d3748] rounded-[10px] break-words">
                                                <span className="text-sm font-medium whitespace-normal break-words text-[var(--text-secondary)]">
                                                    Appointments
                                                </span>
                                                <h5 className="mb-0 text-[#0d6efd] text-[20px] font-medium">12+</h5>
                                            </div>

                                        </div>

                                        <div className="flex flex-wrap justify-center mb-5">
                                            <div className="w-full max-w-[220px] p-4 bg-[#ffd4d1] dark:bg-[#3a2a2a] rounded-[10px] break-words">
                                                <span className="text-sm font-medium whitespace-normal break-words text-[var(--text-secondary)]">Surgeries</span>
                                                <h5 className=" mb-0 text-[#dc3545] text-[20px] font-medium">3+</h5>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-center mb-5">
                                            <div className="w-full max-w-[220px] p-4 bg-[#cdffcf] dark:bg-[#2a3a2a] rounded-[10px] break-words">
                                                <span className="text-sm font-medium whitespace-normal break-words text-[var(--text-secondary)]">Room Visit</span>
                                                <h5 className="mb-0 text-[#198754] text-[20px] font-medium">12+</h5>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="w-full md:w-[146px]">
                                    <img src="/assets/doctorDashboard/doctors.svg" alt="Doctor" className="w-full object-cover" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-6">
                            {/* 🩺 Appointments Card */}                           

                            <div className="bg-[var(--header-bg)] rounded-lg shadow p-4 w-full max-w-[250px] mx-auto border border-[var(--border-color)]">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h6 className="m-0 font-semibold text-[var(--text-primary)]">Appointments</h6>
                                        <p className="text-[var(--text-secondary)] m-0 text-sm">Today's Summary</p>
                                    </div>
                                    <span className="bg-[#ff87074d] p-1 rounded-full flex items-center justify-center">
                                        <Clock4 className="w-5 h-5 text-[#ff8707]" />
                                    </span>
                                </div>

                                {/* Chart Centered */}
                                <div className="flex justify-center items-center">
                                    <div className="relative w-[161px] h-[161px] flex justify-center items-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={appoint}
                                                    dataKey="value"
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={45}
                                                    outerRadius={65}
                                                    paddingAngle={2}
                                                    startAngle={90}
                                                    endAngle={-270}
                                                >
                                                    {appoint.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Legends */}
                                <div className="mt-3 space-y-1">
                                    <div className="flex items-center">
                                        <span className="w-[10px] h-[10px] rounded-full bg-[#42a5f5] mr-2"></span>
                                        <span className="text-sm text-[var(--text-primary)]">Scheduled: 28</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-[10px] h-[10px] rounded-full bg-[#66bb6a] mr-2"></span>
                                        <span className="text-sm text-[var(--text-primary)]">Completed: 24</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-[10px] h-[10px] rounded-full bg-[#ef5350] mr-2"></span>
                                        <span className="text-sm text-[var(--text-primary)]">Cancelled: 4</span>
                                    </div>
                                </div>
                            </div>

                            {/* 📈 Performance Card */}
                            <div className="bg-[var(--header-bg)] rounded-lg shadow p-4 py-8 border border-[var(--border-color)]">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h6 className="m-0 font-semibold text-[var(--text-primary)]">Performance</h6>
                                        <p className="text-[var(--text-secondary)] m-0 text-sm">Daily metrics</p>
                                    </div>
                                    <span className='bg-[#4caf501a] p-[1px] rounded-full'>

                                        <TrendingUp className="w-[22px] h-[22px] text-[#4caf50]" />
                                    </span>
                                </div>

                                {/* <div className="h-32"></div> */}

                                <div className="h-32">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={BarChat}>
                                            <Tooltip cursor={false} />
                                            <Bar dataKey="value" fill="#34c759" radius={[4, 4, 0, 0]} barSize={16} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="mt-2 flex">
                                    <div className="flex flex-col break-words">
                                        <span className="text-[var(--text-secondary)] text-[12px] whitespace-normal break-words">Avg. Consultation</span>
                                        <span className="text-[20px] font-semibold text-[#4caf50] mt-[5px]">18 min</span>
                                    </div>
                                    <div className="flex flex-col break-words">
                                        <span className="text-[12px] whitespace-normal break-words text-[var(--text-secondary)]">Patients/Day</span>
                                        <span className="text-[20px] font-semibold text-[#4caf50] mt-[5px]">24</span>
                                    </div>
                                </div>
                            </div>

                            {/* 💰 Revenue Card */}
                            <div className="bg-[var(--header-bg)] rounded-lg shadow p-4 border border-[var(--border-color)]">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h6 className="m-0 font-semibold text-[var(--text-primary)]">Today's Revenue</h6>
                                        <h3 className="font-medium text-[27px] mt-[10px] text-[#2196f3]">$4,250</h3>
                                    </div>
                                    <span className="bg-[#2196f31a] p-[1px] rounded-full">
                                        <svg fill="#2196f3" width="20px" height="20px" viewBox="-6 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.496 15.87c.001.027.001.06.001.092 0 1.326-.507 2.534-1.337 3.441l.003-.004c-.881.967-2.081 1.63-3.432 1.824l-.031.004v2.344.016c0 .228-.185.413-.413.413-.006 0-.011 0-.017 0h.001-1.807c-.236-.003-.426-.193-.429-.429v-2.344c-.64-.088-1.216-.233-1.766-.434l.059.019c-.898-.305-1.678-.726-2.37-1.254l.02.015c-.233-.169-.435-.334-.629-.509l.007.006q-.167-.16-.234-.24c-.074-.074-.12-.176-.12-.289 0-.099.036-.19.095-.261l-.001.001 1.379-1.808c.073-.093.183-.154.307-.16h.001c.018-.003.038-.005.06-.005.105 0 .199.049.26.126l.001.001.026.026c.885.81 1.987 1.398 3.208 1.666l.046.009c.298.068.64.107.991.107.018 0 .04.001.062.001.691 0 1.331-.216 1.858-.584l-.011.007c.501-.342.826-.91.826-1.554 0-.028-.001-.056-.002-.083v.004c0-.263-.075-.508-.204-.715l.003.006c-.127-.214-.276-.398-.447-.559l-.001-.001c-.227-.191-.485-.359-.761-.493l-.022-.01q-.536-.274-.88-.429t-1.071-.435q-.522-.214-.824-.335t-.824-.355-.837-.415-.757-.475c-.27-.175-.506-.363-.721-.57l.001.001c-.2-.203-.391-.416-.57-.64l-.013-.016c-.185-.224-.345-.48-.467-.756l-.008-.021c-.107-.25-.204-.547-.275-.854l-.007-.036c-.072-.307-.114-.66-.114-1.022 0-.008 0-.016 0-.024v.001c0-.009 0-.02 0-.031 0-1.25.501-2.384 1.314-3.21l-.001.001c.89-.922 2.063-1.566 3.379-1.789l.036-.005v-2.415c0-.001 0-.003 0-.004 0-.117.049-.223.127-.298.075-.078.181-.127.298-.127h.003 1.808.016c.228 0 .413.185.413.413v.017-.001 2.357c.55.058 1.052.167 1.533.323l-.053-.015c.459.14.845.293 1.216.471l-.052-.022c.328.163.607.33.871.516l-.02-.014q.4.282.522.388t.201.187c.082.071.133.176.133.292 0 .081-.025.156-.067.218l.001-.001-1.082 1.956c-.055.121-.171.205-.307.214h-.001c-.025.005-.055.009-.085.009-.106 0-.203-.039-.277-.103h.001q-.04-.04-.194-.16t-.522-.355c-.219-.142-.475-.284-.741-.411l-.042-.018c-.28-.131-.612-.25-.956-.339l-.042-.009c-.343-.096-.737-.153-1.144-.154h-.001c-.046-.002-.099-.003-.153-.003-.716 0-1.382.216-1.935.587l.013-.008c-.487.327-.804.876-.804 1.499 0 .226.042.443.118.643l-.004-.012c.092.22.226.406.394.555l.002.001c.161.151.333.296.513.431l.016.011c.215.148.462.287.721.403l.03.012q.502.234.81.362t.938.368q.71.268 1.085.422t1.018.469c.394.187.725.376 1.041.587l-.029-.018c.31.22.58.44.837.675l-.006-.006c.277.242.513.522.701.835l.009.016c.166.293.309.634.413.991l.009.034c.109.365.171.785.171 1.219v.042-.002z" /></svg>
                                    </span>
                                </div>

                                <div className="h-32">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#34c759" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#34c759" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#007aff" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#007aff" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#af52de" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#af52de" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <Tooltip cursor={false} />

                                            <Area
                                                type="monotone"
                                                dataKey="uv"
                                                stroke="#34c759"
                                                fillOpacity={1}
                                                fill="url(#colorUv)"
                                                strokeWidth={2}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="pv"
                                                stroke="#007aff"
                                                fillOpacity={1}
                                                fill="url(#colorPv)"
                                                strokeWidth={2}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="amt"
                                                stroke="#af52de"
                                                fillOpacity={1}
                                                fill="url(#colorAmt)"
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center mb-1">
                                        <span className="w-[10px] h-[10px] rounded-full bg-[#4caf50] mr-2"></span>
                                        <span className='text-[var(--text-primary)] text-[12px] whitespace-normal break-words'>Walk-ins: $1,850</span>
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <span className="w-[10px] h-[10px] rounded-full bg-[#2196f3] mr-2"></span>
                                        <span className='text-[var(--text-primary)] text-[12px] whitespace-normal break-words'>Follow-ups: $1,200</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-[10px] h-[10px] rounded-full bg-[#9c27b0] mr-2"></span>
                                        <span className='text-[var(--text-primary)] text-[12px] whitespace-normal break-words'>Online: $1,200</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-[var(--header-bg)] rounded-lg shadow mt-6 px-4 pb-4 pt-3 border border-[var(--border-color)]">
                            <div className="lg:col-span-2 bg-[var(--header-bg)] rounded-2xl h-fit">
                                <div className="flex justify-between items-center bg-[var(--header-bg)]
                                border-b-[1px] border-[var(--border-color)] pb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Patients Survey</h2>
                                    </div>

                                    <button
                                        className=" rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        aria-label="More options"
                                    >
                                        <MoreVertical className="w-5 h-5 text-[var(--text-secondary)]" />
                                    </button>
                                </div>


                                <div className="h-[340px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={surveyData}
                                            margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#7d4988" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#7d4988" stopOpacity={0.1} />
                                                </linearGradient>
                                                <linearGradient id="colorOld" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#66BB6A" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#66BB6A" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid
                                                strokeDasharray="0"
                                                stroke="#e5e7eb"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="date"
                                                tick={{ fill: "#9ca3af", fontSize: 13 }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                tick={{ fill: "#9ca3af", fontSize: 13 }}
                                                axisLine={false}
                                                tickLine={false}
                                                ticks={[0, 20, 40, 60, 80, 100]}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "#1f2937",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    color: "#fff",
                                                    padding: "8px 12px",
                                                }}
                                                labelStyle={{ color: "#fff", marginBottom: "4px" }}
                                            />
                                            <Legend
                                                verticalAlign="top"
                                                height={50}
                                                iconType="circle"
                                                wrapperStyle={{ paddingBottom: "20px" }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="newPatients"
                                                stroke="#7d4988"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorNew)"

                                                name="New Patients"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="oldPatients"
                                                stroke="#66BB6A"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorOld)"
                                                name="Old Patients"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="w-full lg:w-4/12 order-1 lg:order-2 mt-[22px] pr-[25px] mb-6 lg:mb-0">
                        <div className="bg-[var(--header-bg)] rounded-lg shadow p-6 flex flex-col items-center border border-[var(--border-color)]">
                            <img src="/assets/doctorDashboard/doctor.jpg" className="rounded-full mb-3 w-[150px] h-[150px] object-cover" />
                            <h4 className="text-[#0d6efd] font-medium text-[calc(1.275rem+0.3vw)] mb-1">Dr. Ashton Cox</h4>
                            <p className="text-[var(--text-secondary)] text-center text-[14px] mb-[10px]">Orthopedics – Restar Hospital</p>
                            <hr className="w-full my-4 border-[var(--border-color)]" />
                            <div className="w-full">
                                <div className="rounded-[16px] flex items-center p-4 mb-4 bg-[var(--header-bg)] shadow-[0_8px_32px_#1f26871a] border border-[var(--border-color)]">
                                    <div>
                                        <h6 className="font-semibold text-[var(--text-primary)]">3,897 Patients</h6>
                                        <p className="text-[var(--text-secondary)]">8,000 Patients Limit</p>
                                    </div>
                                    <div className="h-20 w-[150px]">

                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-[12px]">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 text-center rounded-[16px] py-4 border border-[var(--border-color)]">
                                        <p className="label text-sm text-[var(--text-secondary)] whitespace-normal break-words">Surgery</p>
                                        <h4 className="value font-bold text-xl text-[var(--text-primary)] mb-2">578</h4>
                                        <p className="label text-sm text-[var(--text-secondary)] mt-4 whitespace-normal break-words">Patients</p>
                                        <h4 className="value font-bold text-xl text-[var(--text-primary)]">4,257</h4>
                                    </div>

                                    <div className="bg-orange-50 dark:bg-orange-900/20 text-center rounded-[16px] py-4 border border-[var(--border-color)]">
                                        <p className="label text-sm text-[var(--text-secondary)] whitespace-normal break-words">Consultation</p>
                                        <h4 className="value font-bold text-xl text-[var(--text-primary)] mb-2">387</h4>
                                        <p className="label text-sm text-[var(--text-secondary)] mt-4 whitespace-normal break-words">Appointment</p>
                                        <h4 className="value font-bold text-xl text-[var(--text-primary)]">1,243</h4>
                                    </div>
                                </div>

                            </div>
                        </div>



                        <div className="bg-[var(--header-bg)] rounded-xl shadow-[0_8px_32px_#1f26871a] mt-6 p-4 w-full max-w-sm border border-[var(--border-color)]">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)]">October 2025</h2>
                                <CalendarDays className="w-5 h-5 text-[var(--text-secondary)]" />
                            </div>

                            {/* Weekdays */}
                            <div className="grid grid-cols-7 text-center text-[var(--text-secondary)] text-sm mb-2">
                                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                    <span key={i}>{d}</span>
                                ))}
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-7 gap-2 text-center text-[var(--text-primary)]">
                                {Array.from({ length: 31 }, (_, i) => {
                                    const day = i + 1;
                                    const dayEvents = events[day] || [];
                                    return (
                                        <div
                                            key={i}
                                            className={`py-1 rounded-lg flex flex-col items-center justify-center ${day === 22
                                                ? "border border-blue-500 text-blue-600 font-semibold"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`}
                                        >
                                            <span>{day}</span>
                                            <div className="flex gap-[2px] mt-[2px]">
                                                {dayEvents.map((ev: any, idx: any) => (
                                                    <span
                                                        key={idx}
                                                        className={`w-1.5 h-1.5 rounded-full ${colors[ev]}`}
                                                    ></span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-4 text-sm mt-4 justify-center text-[var(--text-primary)]">
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Surgery
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span> Polyclinic
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span> Evaluation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}