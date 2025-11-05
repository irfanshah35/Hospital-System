'use client';
import { Home, Paperclip, Search, Smile } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastSeen?: string;
    unreadCount?: number;
}

interface Message {
    id: number;
    sender: string;
    text: string;
    time: string;
    isMe: boolean;
}

const users: User[] = [
    { id: 1, name: "William Smith", avatar: "/assets/patient-1.jpg", status: "offline", lastSeen: "left 7 mins ago" },
    { id: 2, name: "Martha Williams", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 3, name: "Joseph Clark", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 4, name: "Nancy Taylor", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 5, name: "Margaret Wilson", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 6, name: "Joseph Jones", avatar: "/assets/patient-1.jpg", status: "offline", lastSeen: "left 30 mins ago" },
    { id: 7, name: "Jane Brown", avatar: "/assets/patient-1.jpg", status: "offline", lastSeen: "left 10 hours ago" },
    { id: 8, name: "Eliza Johnson", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 9, name: "Mike Clark", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 10, name: "Ann Henry", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 11, name: "Nancy Smith", avatar: "/assets/patient-1.jpg", status: "online" },
    { id: 12, name: "David Wilson", avatar: "/assets/patient-1.jpg", status: "offline", lastSeen: "offline since Oct 28" }
];

const messages: Message[] = [
    { id: 1, sender: "Maria", text: "Hi Robert , how are you? How is your work going on?", time: "10:10 AM, Today", isMe: false },
    { id: 2, sender: "Robert", text: "Its good. We completed almost all task assign by our manager.", time: "10:12 AM, Today", isMe: true },
    { id: 3, sender: "Robert", text: "How are you feel today? What's about vacation?.", time: "10:12 AM, Today", isMe: true },
    { id: 4, sender: "Maria", text: "I am good, We think for next weekend.", time: "10:10 AM, Today", isMe: false }
];

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = useState<User>(users[1]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Handle send message logic here
            console.log('Sending message:', newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="flex items-center justify-between relative top-[-5px]">
                <div className="flex items-center flex-wrap space-x-2">
                    <h1 className="text-[20px] font-semibold">Chat</h1>
                    <span className="text-[20px] font-bold">›</span>
                    <Home size={18} />
                    <span>›</span>
                    <span className="text-sm">APP</span>
                    <span>›</span>
                    <span className="text-sm">Chat</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4">
                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Users List */}
                            <div className="h-[590px] overflow-y-auto scrollbar-hide">
                                <ul className="space-y-2">
                                    {filteredUsers.map((user) => (
                                        <li
                                            key={user.id}
                                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${selectedUser.id === user.id
                                                    ? 'bg-blue-50 border text-black border-blue-200'
                                                    : 'hover:bg-gray-50'
                                                }`}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="ml-3 flex-1 min-w-0">
                                                <div className="font-medium truncate">
                                                    {user.name}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <div
                                                        className={`w-2 h-2 rounded-full mr-2 ${user.status === 'online'
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-400'
                                                            }`}
                                                    />
                                                    {user.lastSeen || user.status}
                                                </div>
                                            </div>
                                            {user.unreadCount && (
                                                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {user.unreadCount}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
                        
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <img
                                src={selectedUser.avatar}
                                alt={selectedUser.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="ml-4">
                                <div className="font-semibold">{selectedUser.name}</div>
                                <div className="text-sm text-gray-500">
                                    {selectedUser.status === 'online' ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto max-h-[450px]">
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] ${message.isMe
                                                    ? 'bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl rounded-br-sm'
                                                    : 'bg-gray-100 text-gray-800 rounded-r-2xl rounded-tl-2xl rounded-bl-sm'
                                                } p-4`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                            <div
                                                className={`text-xs mt-2 ${message.isMe ? 'text-blue-100' : 'text-gray-500'
                                                    }`}
                                            >
                                                {message.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200">
                            <div className="flex flex-col space-x-4">
                                <div className="flex-1 mb-8">
                                    <input
                                        type="text"
                                        placeholder="Enter text here.."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button className="p-2 text-white bg-[#ff5722] cursor-pointer rounded-lg transition-colors">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-white bg-[#ff5722] cursor-pointer rounded-lg transition-colors">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                    {/* <button
                                        onClick={handleSendMessage}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                    >
                                        Send
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}