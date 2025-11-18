'use client';
import { Home, UserPlus, Eye, EyeOff, ChevronLeft, Check, User, Users, ChevronDown, Droplet, Flag, Mail, Phone, Contact, IdCard, Calendar, Building2, Brain, Clock, BriefcaseBusiness, TrendingUp, UserRoundCog, GraduationCap, FileBadge, MoveRight, Pencil } from 'lucide-react'
import React, { useRef, useState } from 'react'

export default function AddStaffPage() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const totalSteps = 5;
    const steps = ["Personal Information", "Contact Information", "Professional Details", "Qualifications", "Account Setup"];

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(prev => Math.min(prev + 1, totalSteps));
        }
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const handleStepClick = (index: number) => {
        if (validateStep(step)) {
            setStep(index + 1);
        }
    };

    const [formData, setFormData] = useState({
        // Personal Info
        firstName: "", lastName: "", gender: "", dob: "", bloodGroup: "", maritalStatus: "", nationality: "",
        // Contact Info
        email: "", mobile: "", emergencyName: "", emergencyContact: "", address: "", city: "", state: "", postalCode: "", country: "",
        // Professional Info
        staffId: "", joinDate: "", designation: "", department: "", specialization: "", experience: "", employmentType: "", shift: "",
        // Qualifications
        education: "", certifications: "", licenseNumber: "", licenseExpiry: "", skills: "",
        // Account Info
        username: "", password: "", confirmPassword: "", bio: "", photo: null, agreed: false
    });

    const validateStep = (stepNumber: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (stepNumber === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!formData.gender) newErrors.gender = "Gender is required";
            if (!formData.dob) newErrors.dob = "Date of birth is required";
        }

        if (stepNumber === 2) {
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
            if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
            if (!formData.address.trim()) newErrors.address = "Address is required";
        }

        if (stepNumber === 3) {
            if (!formData.staffId.trim()) newErrors.staffId = "Staff ID is required";
            if (!formData.designation.trim()) newErrors.designation = "Designation is required";
            if (!formData.department) newErrors.department = "Department is required";
        }

        if (stepNumber === 4) {
            if (!formData.education.trim()) newErrors.education = "Education is required";
        }

        if (stepNumber === 5) {
            if (!formData.username.trim()) newErrors.username = "Username is required";
            if (!formData.password) newErrors.password = "Password is required";
            else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
            if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
            else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
            if (!agreed) newErrors.agreed = "You must agree to terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked, files } = e.target as any;

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        if (type === "checkbox") {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === "file" && files?.[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(5)) {
            setSubmitMessage({ type: 'error', text: 'Please fix all validation errors before submitting.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            const payload = {
                firstname: formData.firstName,
                lastname: formData.lastName,
                gender: formData.gender,
                dob: formData.dob,
                bloodgroup: formData.bloodGroup,
                maritalstatus: formData.maritalStatus,
                nationality: formData.nationality,
                email: formData.email,
                mobile: formData.mobile,
                emergencyname: formData.emergencyName,
                emergencycontact: formData.emergencyContact,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                postalcode: formData.postalCode,
                country: formData.country,
                staffid: formData.staffId,
                joindate: formData.joinDate,
                designation: formData.designation,
                department: formData.department,
                specialization: formData.specialization,
                experience: parseInt(formData.experience) || 0,
                employmenttype: formData.employmentType,
                shift: formData.shift,
                education: formData.education,
                certifications: formData.certifications,
                licensenumber: formData.licenseNumber,
                licenseexpiry: formData.licenseExpiry,
                skills: formData.skills,
                username: formData.username,
                password: formData.password,
                bio: formData.bio,
                agreed: agreed,
            };

            const response = await fetch("/api/staff", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitMessage({ type: 'success', text: '✅ Staff member added successfully!' });
                setFormData({
                    firstName: "", lastName: "", gender: "", dob: "", bloodGroup: "", maritalStatus: "", nationality: "",
                    email: "", mobile: "", emergencyName: "", emergencyContact: "", address: "", city: "", state: "", postalCode: "", country: "",
                    staffId: "", joinDate: "", designation: "", department: "", specialization: "", experience: "", employmentType: "", shift: "",
                    education: "", certifications: "", licenseNumber: "", licenseExpiry: "", skills: "",
                    username: "", password: "", confirmPassword: "", bio: "", photo: null, agreed: false
                });
                setAgreed(false);
                setStep(1);
            } else {
                throw new Error(result.error || result.message || 'Failed to add staff member');
            }
        } catch (error) {
            setSubmitMessage({
                type: 'error',
                text: error instanceof Error ? error.message : '❌ Failed to add staff member. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-4 md:px-6 py-3 mt-1">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm md:text-base flex-wrap">
                <h1 className="text-base md:text-lg font-semibold">Add Staffs</h1>
                <span className="hidden sm:inline">›</span>
                <Home size={18} className="text-gray-500 hidden sm:block" />
                <span className="hidden sm:inline">›</span>
                <span className="hidden sm:inline">Staffs</span>
                <span className="hidden sm:inline">›</span>
                <span className="hidden sm:inline">Add Staffs</span>
            </div>

            <div className="card mt-4 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-2">
                    <UserPlus className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                    <h2 className="text-base md:text-lg font-semibold">Add New Staff Member</h2>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mb-4">Complete all required fields for staff onboarding</p>

                {submitMessage.text && (
                    <div className={`mb-4 p-3 rounded-md text-xs md:text-sm ${submitMessage.type === 'success'
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                        }`}>
                        {submitMessage.text}
                    </div>
                )}

                {/* Desktop Progress Bar */}
                <div className="hidden md:flex items-center justify-between w-full mb-6">
                    {steps.map((label, index) => (
                        <React.Fragment key={index}>
                            <div onClick={() => handleStepClick(index)} className="flex items-center cursor-pointer select-none">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-colors duration-300 
                                    ${index + 1 === step ? "bg-blue-600 text-white" : index + 1 < step ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"}`}>
                                    {index + 1 < step ? <Pencil className="w-4 h-4 text-blue-600" /> : index + 1}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-600">{label}</span>
                            </div>
                            {index < steps.length - 1 && <div className="flex-1 h-[2px] mx-2 transition-colors duration-300 bg-gray-200"></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* Mobile Progress Bar */}
                <div className="md:hidden mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-sm">
                                {step}
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Step {step} of {steps.length}</div>
                                <div className="text-sm font-semibold text-gray-800">{steps[step - 1]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300 ease-in-out"
                            style={{ width: `${(step / steps.length) * 100}%` }}></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && <PersonalInfo formData={formData} handleChange={handleChange} nextStep={nextStep} errors={errors} />}
                    {step === 2 && <ContactInfoForm formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} />}
                    {step === 3 && <ProfessionalInfo formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} />}
                    {step === 4 && <Qualifications formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} />}
                    {step === 5 && <AccountInfo formData={formData} handleChange={handleChange} prevStep={prevStep} agreed={agreed} setAgreed={setAgreed} errors={errors} isSubmitting={isSubmitting} />}
                </form>
            </div>
        </div>
    )
}

function PersonalInfo({ formData, handleChange, nextStep, errors }: any) {
    return (
        <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
                <FloatingInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} icon={User} required error={errors.firstName} />
                <FloatingInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} icon={User} required error={errors.lastName} />
                <FloatingSelect label="Gender" name="gender" value={formData.gender} onChange={handleChange} icon={Users} required error={errors.gender}>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </FloatingSelect>
                <FloatingInput type="date" label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} required error={errors.dob} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 my-8 md:my-12'>
                <FloatingSelect label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} icon={Droplet}>
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                </FloatingSelect>
                <FloatingSelect label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                </FloatingSelect>
                <FloatingInput label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} icon={Flag} />
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={nextStep} className="border border-[#1447e6] text-white bg-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition text-sm md:text-base">
                    <MoveRight className="w-4 h-4 md:w-5 md:h-5" /> Next
                </button>
            </div>
        </div>
    )
}

function ContactInfoForm({ formData, handleChange, nextStep, prevStep, errors }: any) {
    return (
        <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <FloatingInput type="email" label="Email" name="email" value={formData.email} onChange={handleChange} icon={Mail} required error={errors.email} />
                <FloatingInput type="tel" label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} icon={Phone} required error={errors.mobile} />
                <FloatingInput label="Emergency Contact Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} icon={Contact} />
                <FloatingInput type="tel" label="Emergency Contact Number" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} icon={Phone} />
                <div className="md:col-span-2">
                    <FloatingTextarea label="Address" name="address" value={formData.address} onChange={handleChange} icon={Home} required error={errors.address} />
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5'>
                <FloatingInput label="City" name="city" value={formData.city} onChange={handleChange} />
                <FloatingInput label="State/Province" name="state" value={formData.state} onChange={handleChange} />
                <FloatingInput label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                <FloatingInput label="Country" name="country" value={formData.country} onChange={handleChange} />
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="border border-gray-300 text-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition text-sm md:text-base">
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
                </button>
                <button type="button" onClick={nextStep} className="border border-[#1447e6] text-white bg-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition text-sm md:text-base">
                    <MoveRight className="w-4 h-4 md:w-5 md:h-5" /> Next
                </button>
            </div>
        </div>
    )
}

function ProfessionalInfo({ formData, handleChange, nextStep, prevStep, errors }: any) {
    return (
        <div className="space-y-4 md:space-y-5">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <FloatingInput label="Staff ID" name="staffId" value={formData.staffId} onChange={handleChange} icon={IdCard} required error={errors.staffId} />
                <FloatingInput type="date" label="Join Date" name="joinDate" value={formData.joinDate} onChange={handleChange} />
                <FloatingInput label="Designation" name="designation" value={formData.designation} onChange={handleChange} icon={BriefcaseBusiness} required error={errors.designation} />
                <FloatingSelect label="Department" name="department" value={formData.department} onChange={handleChange} icon={Building2} required error={errors.department}>
                    <option value=""></option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                </FloatingSelect>
                <FloatingInput label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} icon={Brain} />
                <FloatingInput type="number" label="Experience (years)" name="experience" value={formData.experience} onChange={handleChange} icon={TrendingUp} />
                <FloatingSelect label="Employment Type" name="employmentType" value={formData.employmentType} onChange={handleChange} icon={UserRoundCog}>
                    <option value="">Select Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                </FloatingSelect>
                <FloatingSelect label="Shift" name="shift" value={formData.shift} onChange={handleChange} icon={Clock}>
                    <option value=""></option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                </FloatingSelect>
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="border border-gray-300 text-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition text-sm md:text-base">
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
                </button>
                <button type="button" onClick={nextStep} className="border border-[#1447e6] text-white bg-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition text-sm md:text-base">
                    <MoveRight className="w-4 h-4 md:w-5 md:h-5" /> Next
                </button>
            </div>
        </div>
    )
}

function Qualifications({ formData, handleChange, nextStep, prevStep, errors }: any) {
    return (
        <div className="space-y-4 md:space-y-5">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Qualifications & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="md:col-span-2">
                    <FloatingTextarea label="Education" name="education" value={formData.education} onChange={handleChange} icon={GraduationCap} required error={errors.education} rows={3} />
                </div>
                <div className="md:col-span-2">
                    <FloatingTextarea label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} icon={FileBadge} rows={2} />
                </div>
                <FloatingInput label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} icon={IdCard} />
                <FloatingInput type="date" label="License Expiry" name="licenseExpiry" value={formData.licenseExpiry} onChange={handleChange} icon={Calendar} />
                <div className="md:col-span-2">
                    <FloatingTextarea label="Skills" name="skills" value={formData.skills} onChange={handleChange} icon={Brain} rows={2} />
                </div>
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="border border-gray-300 text-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition text-sm md:text-base">
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
                </button>
                <button type="button" onClick={nextStep} className="border border-[#1447e6] text-white bg-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition text-sm md:text-base">
                    <MoveRight className="w-4 h-4 md:w-5 md:h-5" /> Next
                </button>
            </div>
        </div>
    )
}

function AccountInfo({ formData, handleChange, prevStep, agreed, setAgreed, errors, isSubmitting }: any) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => fileInputRef.current?.click();

    return (
        <div className="space-y-4 md:space-y-5">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Account Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="md:col-span-2">
                    <FloatingInput label="Username" name="username" value={formData.username} onChange={handleChange} icon={User} required error={errors.username} />
                </div>
                <FloatingInput type={showPassword ? "text" : "password"} label="Password" name="password" value={formData.password} onChange={handleChange}
                    showPassword={showPassword} setShowPassword={setShowPassword} required error={errors.password} />
                <FloatingInput type={showConfirmPassword ? "text" : "password"} label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} required error={errors.confirmPassword} />

                <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-medium mb-2">Profile Photo</label>
                    <div onClick={handleFileClick} className="border border-dashed border-gray-300 rounded-md p-4 md:p-5 flex items-center cursor-pointer hover:border-blue-500 transition h-20 md:h-[96px]">
                        <button type="button" className="bg-white border border-gray-300 rounded-full px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm text-[#1447e6] shadow-sm hover:bg-blue-50 font-medium">
                            Choose file
                        </button>
                        <span className="ml-1 text-xs md:text-sm text-gray-600">or drag and drop file here</span>
                    </div>
                    <input ref={fileInputRef} name="photo" type="file" accept="image/*" onChange={handleChange} className="hidden" />
                </div>

                <div className="md:col-span-2">
                    <FloatingTextarea label="Bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
                </div>

                <div className="md:col-span-2 flex items-center gap-2">
                    <input type="checkbox" id="agreed" name="agreed" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="agreed" className="text-xs md:text-sm">
                        I agree to the <a href="#" className="underline-none">terms and conditions</a>
                    </label>
                    {errors.agreed && <span className="text-red-500 text-xs">{errors.agreed}</span>}
                </div>
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="border border-gray-300 text-[#1447e6] px-5 md:px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 transition text-sm md:text-base">
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
                </button>
                <button type="submit" disabled={!agreed || isSubmitting}
                    className={`px-6 md:px-8 py-2 rounded-full flex items-center gap-2 transition text-sm md:text-base ${agreed && !isSubmitting
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-400 text-gray-600 cursor-not-allowed"
                        }`}>
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    )
}

function FloatingInput({ label, name, value, onChange, type = "text", icon: Icon, required = false, showPassword, setShowPassword, error }: any) {
    const isDate = type === "date";
    return (
        <div className="relative">
            <input type={type} name={name} value={value} onChange={onChange} placeholder=" " required={required}
                className={`peer w-full rounded-md border bg-white px-3 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all ${isDate ? '!px-3' : 'px-10'} ${error ? 'border-red-500' : ''}`} />
            <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {Icon && !isDate && <Icon className="absolute top-3.5 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
            {type === "password" && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-3.5 right-3 text-gray-500">
                    {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
            )}
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    )
}

function FloatingSelect({ label, name, value, onChange, icon: Icon, required = false, children, error }: any) {
    return (
        <div className="relative">
            <select name={name} value={value} onChange={onChange} required={required}
                className={`peer w-full appearance-none rounded-md border bg-white px-10 pt-4 pb-4 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all ${error ? 'border-red-500' : ''}`}>
                <option value=""></option>
                {children}
            </select>
            <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {Icon && <Icon className="absolute top-3.5 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
            <ChevronDown className="absolute top-4 right-10 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    )
}

function FloatingTextarea({ label, name, value, onChange, icon: Icon, required = false, rows = 3, error }: any) {
    return (
        <div className="relative">
            <textarea name={name} value={value} onChange={onChange} placeholder=" " required={required} rows={rows}
                className={`peer w-full rounded-md border bg-white px-3 pt-5 pb-3 text-xs md:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none ${error ? 'border-red-500' : ''}`} />
            <label className={`absolute left-3 px-1 bg-white transition-all duration-200 text-xs md:text-sm ${value ? "-top-2 text-xs text-blue-600" : "top-3.5 text-gray-500"} peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {Icon && <Icon className="absolute top-6 right-3 w-4 h-4 md:w-5 md:h-5 text-gray-500" />}
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
        </div>
    )
}