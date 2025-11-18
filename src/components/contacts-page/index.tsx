'use client';

import { CirclePlus, Download, Home, RotateCw, Trash2, Edit, Phone, Mail, MapPin, User, Calendar, FileText, X, Save } from 'lucide-react';
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Contact {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    mobile: string;
    address: string;
    note: string;
    avatar: string;
    selected: boolean;
}

// Reusable Input Component
interface ReusableInputProps {
    label: string;
    type?: "text" | "number" | "email" | "password" | "date" | "textarea";
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    icon?: React.ReactNode;
}

const ReusableInput: React.FC<ReusableInputProps> = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder = " ",
    required = false,
    className = "",
    icon
}) => {
    const [isFocused, setIsFocused] = useState(false);

    if (type === "textarea") {
        return (
            <div className={`relative ${className}`}>
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    required={required}
                    rows={3}
                    className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all resize-none"
                />
                <label
                    className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${value || isFocused ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"
                        } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
                >
                    {label}{required && "*"}
                </label>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                required={required}
                className="peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-800 focus:border-[#005CBB] focus:ring-2 focus:ring-[#005CBB] outline-none transition-all"
            />
            {icon && (
                <div className="absolute right-3 top-3 text-gray-400">
                    {icon}
                </div>
            )}
            <label
                className={`absolute left-3 px-[4px] bg-white transition-all duration-200 ${value || isFocused ? "-top-2 text-xs text-[#005CBB]" : "top-3 text-gray-500"
                    } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#005CBB]`}
            >
                {label}{required && "*"}
            </label>
        </div>
    );
};

// Contact Modal Component
interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    contact?: Contact | null;
    onSubmit: (contact: Omit<Contact, 'id' | 'selected'>) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
    isOpen,
    onClose,
    mode,
    contact,
    onSubmit
}) => {
    const [formData, setFormData] = useState<Omit<Contact, 'id' | 'selected'>>({
        name: '',
        email: '',
        birthDate: '',
        mobile: '',
        address: '',
        note: '',
        avatar: '/assets/patient-1.jpg'
    });

    useEffect(() => {
        if (mode === 'edit' && contact) {
            const { id, selected, ...rest } = contact;
            setFormData(rest);
        } else {
            setFormData({
                name: '',
                email: '',
                birthDate: '',
                mobile: '',
                address: '',
                note: '',
                avatar: '/assets/patient-1.jpg'
            });
        }
    }, [mode, contact, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-lg w-[63vw] max-h-[80vh] overflow-hidden">
                <div className="flex items-center justify-between border-b !border-gray-300 px-5 py-3">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                            {formData.avatar ? (
                                <img
                                    src={formData.avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-6 h-6 text-gray-600" />
                            )}
                        </div>
                        <h2 className="text-lg font-semibold">
                            {mode === 'add' ? 'New Contact' : `Edit Contact - ${contact?.name}`}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        type="button"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[65vh] overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-2 gap-8">
                        {/* Name */}
                        <ReusableInput
                            label="Name"
                            value={formData.name}
                            onChange={(value) => handleInputChange('name', value)}
                            required
                            icon={<User className="w-4 h-4" />}
                        />

                        {/* Email */}
                        <ReusableInput
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(value) => handleInputChange('email', value)}
                            required
                            icon={<Mail className="w-4 h-4" />}
                        />

                        {/* Mobile */}
                        <ReusableInput
                            label="Mobile"
                            type="number"
                            value={formData.mobile}
                            onChange={(value) => handleInputChange('mobile', value)}
                            required
                            icon={<Phone className="w-4 h-4" />}
                        />

                        {/* Birth Date */}
                        <ReusableInput
                            label="Birth Date"
                            type="date"
                            value={formData.birthDate}
                            onChange={(value) => handleInputChange('birthDate', value)}
                            required
                            icon={<Calendar className="w-4 h-4" />}
                        />
                    </div>

                    {/* Address */}
                    <ReusableInput
                        label="Address"
                        type="textarea"
                        value={formData.address}
                        onChange={(value) => handleInputChange('address', value)}
                    />

                    {/* Note */}
                    <ReusableInput
                        label="Note"
                        type="textarea"
                        value={formData.note}
                        onChange={(value) => handleInputChange('note', value)}
                    />

                    {/* Submit Buttons */}
                    <div className="flex gap-2 pt-3">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-[#005cbb] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#004a99]"
                        >
                            <Save className="w-4 h-4" />
                            {mode === 'add' ? 'Add Contact' : 'Save Changes'}
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="bg-[#ba1a1a] text-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-[#9a1515]"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function ContactsPage() {
    const [detailDropdown, setDetailDropdown] = useState(false);
    const detailref = useRef<HTMLDivElement | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    // Sample contact data
    const sampleContactData: Contact[] = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            birthDate: "1990-05-15",
            mobile: "+1 (555) 123-4567",
            address: "123 Main St, New York, NY 10001",
            note: "Important client",
            avatar: "/assets/patient-1.jpg",
            selected: false
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            birthDate: "1985-08-22",
            mobile: "+1 (555) 234-5678",
            address: "456 Oak Ave, Los Angeles, CA 90210",
            note: "Regular customer",
            avatar: "/assets/patient-1.jpg",
            selected: false
        },
        {
            id: 3,
            name: "Robert Johnson",
            email: "robert.j@example.com",
            birthDate: "1992-12-03",
            mobile: "+1 (555) 345-6789",
            address: "789 Pine Rd, Chicago, IL 60601",
            note: "VIP client",
            avatar: "/assets/patient-1.jpg",
            selected: false
        },
        {
            id: 4,
            name: "Maria Garcia",
            email: "maria.garcia@example.com",
            birthDate: "1988-03-18",
            mobile: "+1 (555) 456-7890",
            address: "321 Elm St, Miami, FL 33101",
            note: "New contact",
            avatar: "/assets/patient-1.jpg",
            selected: false
        },
        {
            id: 5,
            name: "David Lee",
            email: "david.lee@example.com",
            birthDate: "1995-07-29",
            mobile: "+1 (555) 567-8901",
            address: "654 Maple Dr, Seattle, WA 98101",
            note: "Business partner",
            avatar: "/assets/patient-1.jpg",
            selected: false
        }
    ];

    // Fetch data from API
    const fetchContacts = async () => {
        setLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setContacts(sampleContactData);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Click outside dropdown
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
        fetchContacts().then(() => {
            setTimeout(() => setAnimate(false), 300);
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            contacts.map((item) => ({
                "Name": item.name,
                "Email": item.email,
                "Birth Date": item.birthDate,
                "Mobile": item.mobile,
                "Address": item.address,
                "Note": item.note,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "contacts.xlsx");
    };

    const removeData = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one contact to delete.");
            return;
        }
        if (window.confirm(`Delete ${selectedIds.length} contact(s)?`)) {
            setContacts(prev => prev.filter(p => !selectedIds.includes(p.id)));
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? contacts.map(p => p.id) : []);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("selectAll") as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate =
                selectedIds.length > 0 && selectedIds.length < contacts.length;
        }
    }, [selectedIds, contacts]);

    const checkboxItems = [
        { label: "Checkbox", checked: true },
        { label: "Name", checked: true },
        { label: "Email", checked: true },
        { label: "Birth Date", checked: true },
        { label: "Mobile", checked: true },
        { label: "Address", checked: true },
        { label: "Actions", checked: true },
    ];

    const deleteContact = (id: number) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            setContacts(prev => prev.filter(contact => contact.id !== id));
        }
    };

    const handleAddClick = () => {
        setModalMode('add');
        setEditingContact(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (contact: Contact) => {
        setModalMode('edit');
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (contactData: Omit<Contact, 'id' | 'selected'>) => {
        if (modalMode === 'add') {
            const newContact: Contact = {
                ...contactData,
                id: Math.max(...contacts.map(c => c.id), 0) + 1,
                selected: false
            };
            setContacts(prev => [...prev, newContact]);
            alert("Contact added successfully!");
        } else if (modalMode === 'edit' && editingContact) {
            setContacts(prev =>
                prev.map(c => c.id === editingContact.id ? { ...contactData, id: editingContact.id, selected: editingContact.selected } : c)
            );
            alert("Contact updated successfully!");
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='px-4 sm:px-6 py-[20px] mt-0'>
                <div className="flex items-center justify-between relative top-[-5px]">
                    <div className="flex items-center flex-wrap space-x-2">
                        <h1 className="text-[20px] font-semibold">Contacts</h1>
                        <span className="text-[20px] font-bold">›</span>
                        <Home size={18} />
                        <span>›</span>
                        <span className="text-sm">Home</span>
                        <span>›</span>
                        <span className="text-sm">Contacts</span>
                    </div>
                </div>

                <div className="h-auto mt-3">
                    <div className="max-w-full">
                        <div className="bg-[#f8f9fa] rounded-t-xl shadow-md overflow-hidden">
                            {/* Header */}
                            <div className="pr-[15px] pl-[20px] py-[8px] border-b border-gray-200 flex max-[390px]:gap-2 items-center flex-wrap">
                                <div className='flex items-center flex-[35%]'>
                                    <h1 className="m-0 text-[17px] leading-[28px] pr-[10px] font-medium">Contacts</h1>
                                    <label className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full max-w-[212px] h-[45px] rounded-[5px] border-0 bg-white text-[14px] font-medium px-[50px] py-2 focus:outline-none"
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
                                            onClick={removeData}
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

                                    <button
                                        onClick={handleAddClick}
                                        className="flex justify-center items-center w-10 h-10 rounded-full text-[#4caf50] hover:bg-[#CED5E6] transition cursor-pointer"
                                        title="Add"
                                    >
                                        <CirclePlus className='w-[22px] h-[22px]' />
                                    </button>

                                    <button onClick={handleRefresh} className="flex justify-center items-center w-10 h-10 rounded-full text-[#795548] hover:bg-[#CED5E6] transition cursor-pointer" title="Refresh">
                                        <RotateCw className='w-[20px] h-[20px]' />
                                    </button>

                                    <button onClick={handleDownloadXLSX} className="flex justify-center items-center w-10 h-10 rounded-full text-[#2196f3] hover:bg-[#CED5E6] transition cursor-pointer" title="XLSX Download">
                                        <Download className='w-[20px] h-[20px]' />
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className='overflow-auto scrollbar-hide'>
                                <div className="overflow-x-auto scrollbar-hide">
                                    {loading ? (
                                        <div className="p-8 text-center text-gray-500">Loading contacts...</div>
                                    ) : contacts.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No contacts found</div>
                                    ) : (
                                        <>
                                            {/* Desktop Table */}
                                            <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                                                <thead className="bg-white">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3 pl-[37px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            <input
                                                                type="checkbox"
                                                                id="selectAll"
                                                                onChange={(e) => handleSelectAll(e.target.checked)}
                                                                className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                            />
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Birth Date</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody className={`bg-white divide-y divide-gray-200 transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                    {contacts.map((contact) => (
                                                        <tr key={contact.id} className="transition-colors duration-150 hover:bg-gray-50">
                                                            <td className="px-4 py-3 pl-[37px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedIds.includes(contact.id)}
                                                                    onChange={() => handleCheckboxChange(contact.id)}
                                                                    className="h-[18px] w-[18px] rounded-[2px] border-[2px] border-[#1a1b1f]"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                                                        {contact.avatar ? (
                                                                            <img
                                                                                src={contact.avatar}
                                                                                alt={contact.name}
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <User className="w-4 h-4 text-gray-600" />
                                                                        )}
                                                                    </div>
                                                                    <span>{contact.name}</span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                                    {contact.email}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                {new Date(contact.birthDate).toLocaleDateString()}
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                                    {contact.mobile}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                                    <span className="max-w-[200px] truncate">{contact.address}</span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(contact)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteContact(contact.id)}
                                                                        className="text-[#ff5200] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {/* Mobile View */}
                                            <div className={`px-4 md:hidden shadow-sm bg-white transition-all duration-500 ${animate ? "animate-slideDown" : ""}`}>
                                                {contacts.map((contact) => (
                                                    <div key={contact.id} className="border-b border-gray-200 py-4">
                                                        {/* Checkbox Row */}
                                                        <div className="flex items-center h-13 justify-start py-2 border-b border-[#dadada]">
                                                            <input
                                                                checked={selectedIds.includes(contact.id)}
                                                                onChange={() => handleCheckboxChange(contact.id)}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-blue-600 rounded"
                                                            />
                                                        </div>

                                                        <div className="text-sm text-gray-800">
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4 py-3">
                                                                <span className="font-semibold w-20">Name:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                                                        {contact.avatar ? (
                                                                            <img
                                                                                src={contact.avatar}
                                                                                alt={contact.name}
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <User className="w-3 h-3 text-gray-600" />
                                                                        )}
                                                                    </div>
                                                                    <span className="font-medium">{contact.name}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-20">Email:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                                    <span>{contact.email}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-20">Birth Date:</span>
                                                                <span>{new Date(contact.birthDate).toLocaleDateString()}</span>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-20">Mobile:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                                    <span>{contact.mobile}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <span className="font-semibold w-20">Address:</span>
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                                    <span>{contact.address}</span>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center h-13 space-x-3 border-b border-[#dadada] gap-4">
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(contact)}
                                                                        className="text-[#6777ef] hover:bg-[#E0E1E3] p-1 rounded-full cursor-pointer"
                                                                    >
                                                                        <Edit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteContact(contact.id)}
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Paginator totalItems={contacts.length} />
                </div>
            </div>

            {/* Contact Modal */}
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                contact={editingContact}
                onSubmit={handleModalSubmit}
            />

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

// Paginator Component
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