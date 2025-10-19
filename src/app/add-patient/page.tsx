'use client';

import { useState, ChangeEvent } from 'react';
import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  maritalStatus: string;
  nationalId: string;
  patientId: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  contactName: string;
  relationship: string;
  phoneNumber: string;
  bloodGroup: string;
  bloodPressure: string;
  sugarLevel: string;
  injuryCondition: string;
  allergies: string;
  chronicDiseases: string;
  currentMedications: string;
  insuranceProvider: string;
  policyNumber: string;
  coverageDetails: string;
  admissionDate: string;
  assignedDoctor: string;
  wardNumber: string;
  roomNumber: string;
  reasonForAdmission: string;
  document: File | null;
}

type FormErrors = Partial<Record<keyof FormData, string>>;
type FormTouched = Partial<Record<keyof FormData, boolean>>;

export default function PatientRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    maritalStatus: '',
    nationalId: '',
    patientId: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    stateProvince: '',
    zipPostalCode: '',
    contactName: '',
    relationship: '',
    phoneNumber: '',
    bloodGroup: '',
    bloodPressure: '',
    sugarLevel: '',
    injuryCondition: '',
    allergies: '',
    chronicDiseases: '',
    currentMedications: '',
    insuranceProvider: '',
    policyNumber: '',
    coverageDetails: '',
    admissionDate: '',
    assignedDoctor: '',
    wardNumber: '',
    roomNumber: '',
    reasonForAdmission: '',
    document: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const validateField = (name: keyof FormData, value: string | File | null): string => {
    let error = '';
    const strValue = typeof value === 'string' ? value : '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!strValue.trim()) error = 'This field is required';
        else if (strValue.length < 2) error = 'Must be at least 2 characters';
        break;
      case 'email':
        if (!strValue.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strValue)) error = 'Invalid email format';
        break;
      case 'mobile':
      case 'phoneNumber':
        if (!strValue.trim()) error = 'Phone number is required';
        else if (!/^\+?[\d\s-()]{10,}$/.test(strValue)) error = 'Invalid phone number';
        break;
      case 'nationalId':
        if (!strValue.trim()) error = 'National ID is required';
        break;
      case 'gender':
      case 'maritalStatus':
        if (!strValue) error = 'Please select an option';
        break;
      case 'dateOfBirth':
        if (!strValue) error = 'Date of birth is required';
        break;
      case 'address':
        if (!strValue.trim()) error = 'Address is required';
        break;
      case 'city':
      case 'stateProvince':
      case 'zipPostalCode':
        if (!strValue.trim()) error = 'This field is required';
        break;
      case 'contactName':
        if (!strValue.trim()) error = 'Emergency contact name is required';
        break;
      case 'relationship':
        if (!strValue.trim()) error = 'Relationship is required';
        break;
      case 'bloodGroup':
        if (!strValue) error = 'Blood group is required';
        break;
    }

    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData(prev => ({ ...prev, [fieldName]: value }));

    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }

    if (fieldName === 'dateOfBirth' && value) {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, age: age.toString() }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, document: file }));
  };

  const handleSubmit = () => {
    const newErrors: FormErrors = {};
    const requiredFields: (keyof FormData)[] = [
      'firstName', 'lastName', 'gender', 'dateOfBirth', 'maritalStatus',
      'nationalId', 'mobile', 'email', 'address', 'city', 'stateProvince', 'zipPostalCode',
      'contactName', 'relationship', 'phoneNumber', 'bloodGroup'
    ];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    const allTouched: FormTouched = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Patient registered successfully!');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '', lastName: '', gender: '', dateOfBirth: '', age: '', maritalStatus: '',
      nationalId: '', patientId: '', mobile: '', email: '', address: '', city: '',
      stateProvince: '', zipPostalCode: '', contactName: '', relationship: '', phoneNumber: '',
      bloodGroup: '', bloodPressure: '', sugarLevel: '', injuryCondition: '', allergies: '',
      chronicDiseases: '', currentMedications: '', insuranceProvider: '', policyNumber: '',
      coverageDetails: '', admissionDate: '', assignedDoctor: '', wardNumber: '', roomNumber: '',
      reasonForAdmission: '', document: null
    });
    setErrors({});
    setTouched({});
  };

  interface InputFieldProps {
    label: string;
    name: keyof FormData;
    type?: string;
    required?: boolean;
    disabled?: boolean;
  }

  const InputField = ({ label, name, type = 'text', required = false, disabled = false }: InputFieldProps) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        value={formData[name] as string}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={`peer w-full px-4 pt-6 pb-2 border rounded-lg outline-none transition-all ${errors[name] && touched[name]
            ? 'border-red-500 focus:border-red-600'
            : 'border-black focus:border-blue-500'
          } ${disabled ? 'bg-gray-100' : 'bg-white'}`}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData[name] || type === 'date'
            ? '-top-[9px] text-xs text-grey-400 bg-white px-1'
            : 'top-4 text-base text-gray-500 peer-focus:-top-[9px] peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1'
          }`}
      >
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      {errors[name] && touched[name] && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
          <AlertCircle size={12} />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  interface SelectFieldProps {
    label: string;
    name: keyof FormData;
    options: string[];
    required?: boolean;
  }

  const SelectField = ({ label, name, options, required = false }: SelectFieldProps) => (
    <div className="relative">
      <select
        name={name}
        id={name}
        value={formData[name] as string}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`peer w-full px-4 pt-6 pb-2 border rounded-lg outline-none transition-all appearance-none ${errors[name] && touched[name]
            ? 'border-red-500 focus:border-red-600'
            : 'border-black focus:border-blue-500'
          } ${!formData[name] ? 'text-gray-500' : 'text-gray-900'}`}
      >
        <option value=""></option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData[name]
            ? 'top-2 text-xs text-blue-600'
            : 'top-4 text-base text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600'
          }`}
      >
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {errors[name] && touched[name] && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
          <AlertCircle size={12} />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  interface TextAreaFieldProps {
    label: string;
    name: keyof FormData;
    required?: boolean;
  }

  const TextAreaField = ({ label, name, required = false }: TextAreaFieldProps) => (
    <div className="relative">
      <textarea
        name={name}
        id={name}
        value={formData[name] as string}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={3}
        className={`peer w-full px-4 pt-6 pb-2 border rounded-lg outline-none transition-all resize-none ${errors[name] && touched[name]
            ? 'border-red-500 focus:border-red-600'
            : 'border-black focus:border-blue-500'
          }`}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData[name]
            ? 'top-2 text-xs text-blue-600'
            : 'top-4 text-base text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600'
          }`}
      >
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      {errors[name] && touched[name] && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
          <AlertCircle size={12} />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center space-x-2 text-gray-700 bg-[#ECF0F9] px-4 sm:px-6 lg:px-8 pt-2">
        <h1 className="text-lg font-semibold text-gray-900">Add Patient</h1>
        <span className="text-gray-500">›</span>
        <Link href="/">
          <Home size={18} className="text-gray-500" />
        </Link>
        <span className="text-gray-500">›</span>
        <span className="text-gray-600">Patients</span>
        <span className="text-gray-500">›</span>
        <span className="text-gray-600">Add Patient</span>
      </div>
      <div className="min-h-screen bg-[#ECF0F9]  px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-[17x] font-bold text-gray-900 mb-1">Patient Registration Form</h1>
          <p className="text-gray-600 mb-8 text-[14px]">Fill in the details to add a patient registration</p>
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-600">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField label="First name" name="firstName" required />
                <InputField label="Last name" name="lastName" required />
                <SelectField
                  label="Gender"
                  name="gender"
                  options={['Male', 'Female', 'Other']}
                  required
                />
                <InputField label="Date Of Birth" name="dateOfBirth" type="date" required />
                <InputField label="Age" name="age" disabled />
                <SelectField
                  label="Marital Status"
                  name="maritalStatus"
                  options={['Single', 'Married', 'Divorced', 'Widowed']}
                  required
                />
                <InputField label="National ID" name="nationalId" required />
                <InputField label="Patient ID (Auto-generated if left empty)" name="patientId" />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-600">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField label="Mobile" name="mobile" type="tel" required />
                <InputField label="Email" name="email" type="email" required />
              </div>
              <div className="mb-6">
                <TextAreaField label="Address" name="address" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InputField label="City" name="city" required />
                <InputField label="State/Province" name="stateProvince" required />
                <InputField label="Zip/Postal Code" name="zipPostalCode" required />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-600">Emergency Contact</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InputField label="Contact Name" name="contactName" required />
                <InputField label="Relationship" name="relationship" required />
                <InputField label="Phone Number" name="phoneNumber" type="tel" required />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-600">Medical Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <SelectField
                  label="Blood Group"
                  name="bloodGroup"
                  options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                  required
                />
                <InputField label="Blood Pressure" name="bloodPressure" />
                <InputField label="Sugar Level" name="sugarLevel" />
                <InputField label="Injury/Condition" name="injuryCondition" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <TextAreaField label="Allergies" name="allergies" />
                <TextAreaField label="Chronic Diseases" name="chronicDiseases" />
                <TextAreaField label="Current Medications" name="currentMedications" />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-600">Insurance Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InputField label="Insurance Provider" name="insuranceProvider" />
                <InputField label="Policy Number" name="policyNumber" />
                <InputField label="Coverage Details" name="coverageDetails" />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-600">Admission Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField label="Admission Date" name="admissionDate" type="date" />
                <InputField label="Assigned Doctor" name="assignedDoctor" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <InputField label="Ward Number" name="wardNumber" />
                <InputField label="Room Number" name="roomNumber" />
                <TextAreaField label="Reason for Admission" name="reasonForAdmission" />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-600">Documents</h2>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="document"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="document" className="cursor-pointer">
                  <div className="text-blue-600 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-blue-600 font-medium mb-1">Choose file</p>
                  <p className="text-gray-500 text-sm">or drag and drop file here</p>
                  {formData.document && (
                    <p className="text-green-600 text-sm mt-2">✓ {formData.document.name}</p>
                  )}
                </label>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-gray-400 text-white rounded-lg font-medium hover:bg-gray-500 transition-colors cursor-pointer"
              >
                Register Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}