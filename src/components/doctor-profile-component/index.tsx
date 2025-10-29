"use client"
import React, { useState } from 'react';
import { Home, MapPin, Phone, Mail, Settings, User, GraduationCap, Briefcase, Award, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DoctorProfileComponent() {
  const [activeTab, setActiveTab] = useState('aboutme');

  return (
    <div className="min-h-screen bg-[#e8ebf3]">
      {/* Breadcrumb */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Profile</span>
          <span className="text-gray-400">›</span>
          <Home size={16} className="text-gray-500" />
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Doctors</span>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Profile</span>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-8 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop" 
                  alt="Dr. John Smith"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Profile Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Dr. John Smith</h1>
                <p className="text-gray-600 mb-4">MD - Cardiologist</p>
                
                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center text-gray-700">
                    <MapPin size={16} className="text-green-600 mr-2" />
                    <span>123 Medical Center Dr, New York, NY 10001</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone size={16} className="text-blue-500 mr-2" />
                    <span>+1 (123) 456-7890</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail size={16} className="text-red-500 mr-2" />
                    <span>john.smith@example.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Icon */}
            <button className="w-12 h-12 rounded-lg bg-[#5b73e8] text-white flex items-center justify-center hover:bg-[#4a5fc7] transition-colors">
              <Settings size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-4 mt-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-[#5b73e8] mb-1">564</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-[#5b73e8] mb-1">18000</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-[#5b73e8] mb-1">565</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-5 relative">
            <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1,286</div>
            <div className="text-sm text-gray-600 mb-3">Patients</div>
            <div className="flex items-center text-xs text-green-600">
              <span className="mr-1">↗</span>
              <span className="font-semibold">12%</span>
              <span className="text-gray-500 ml-2">Target: 1,500</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 relative">
            <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
              <Briefcase size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">96</div>
            <div className="text-sm text-gray-600 mb-3">Surgeries</div>
            <div className="flex items-center text-xs text-green-600">
              <span className="mr-1">↗</span>
              <span className="font-semibold">8%</span>
              <span className="text-gray-500 ml-2">Target: 100</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 relative">
            <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-sm text-gray-600 mb-3">Success Rate</div>
            <div className="flex items-center text-xs text-green-600">
              <span className="mr-1">↗</span>
              <span className="font-semibold">5%</span>
              <span className="text-gray-500 ml-2">Target: 90%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 relative">
            <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">15 min</div>
            <div className="text-sm text-gray-600 mb-3">Avg. Wait Time</div>
            <div className="flex items-center text-xs text-red-500">
              <span className="mr-1">↘</span>
              <span className="font-semibold">25%</span>
              <span className="text-gray-500 ml-2">Target: 20 min</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* About Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dr. Smith is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. He specializes in interventional cardiology and has performed over 1,000 cardiac catheterizations and stent placements. Dr. Smith is dedicated to providing compassionate care and the latest evidence-based treatments to his patients.
              </p>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700">Cardiac Catheterization</span>
                    <span className="text-sm font-semibold text-gray-600">95%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5b73e8] rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700">Echocardiography</span>
                    <span className="text-sm font-semibold text-gray-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5b73e8] rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700">Patient Care</span>
                    <span className="text-sm font-semibold text-gray-600">90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5b73e8] rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700">Research</span>
                    <span className="text-sm font-semibold text-gray-600">70%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5b73e8] rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tabs Header */}
            <div className="border-b border-gray-200 px-2">
              <div className="flex items-center justify-between">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center flex-1 justify-center">
                  <button 
                    onClick={() => setActiveTab('aboutme')}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'aboutme' 
                        ? 'text-gray-900 border-[#5b73e8]' 
                        : 'text-gray-600 border-transparent hover:text-gray-800'
                    }`}
                  >
                    <User size={18} />
                    <span>About Me</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('education')}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'education' 
                        ? 'text-gray-900 border-[#5b73e8]' 
                        : 'text-gray-600 border-transparent hover:text-gray-800'
                    }`}
                  >
                    <GraduationCap size={18} />
                    <span>Education</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('experience')}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'experience' 
                        ? 'text-gray-900 border-[#5b73e8]' 
                        : 'text-gray-600 border-transparent hover:text-gray-800'
                    }`}
                  >
                    <Briefcase size={18} />
                    <span>Experience</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('certifications')}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'certifications' 
                        ? 'text-gray-900 border-[#5b73e8]' 
                        : 'text-gray-600 border-transparent hover:text-gray-800'
                    }`}
                  >
                    <Award size={18} />
                    <span>Certifications</span>
                  </button>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'aboutme' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-4 gap-6 mb-8">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 mb-2">Full Name</h3>
                      <p className="text-sm text-gray-800">Dr. John Smith</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 mb-2">Specialty</h3>
                      <p className="text-sm text-gray-800">Cardiologist</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 mb-2">Phone</h3>
                      <p className="text-sm text-gray-800">+1 (123) 456-7890</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 mb-2">Email</h3>
                      <p className="text-sm text-gray-800">john.smith@example.com</p>
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Dr. Smith is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. He specializes in interventional cardiology and has performed over 1,000 cardiac catheterizations and stent placements. Dr. Smith is dedicated to providing compassionate care and the latest evidence-based treatments to his patients.
                  </p>

                  {/* Navigation arrows */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <button className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex-1 mx-4 h-1 bg-gray-300 rounded">
                      <div className="h-full bg-gray-600 rounded" style={{ width: '25%' }}></div>
                    </div>
                    <button className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Education</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">M.D.</h3>
                      <p className="text-sm text-gray-600 mb-1">Harvard Medical School</p>
                      <p className="text-sm text-gray-500">2005</p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">Residency in Internal Medicine</h3>
                      <p className="text-sm text-gray-600 mb-1">Massachusetts General Hospital</p>
                      <p className="text-sm text-gray-500">2008</p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">Fellowship in Cardiovascular Disease</h3>
                      <p className="text-sm text-gray-600 mb-1">Cleveland Clinic</p>
                      <p className="text-sm text-gray-500">2011</p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">Fellowship in Interventional Cardiology</h3>
                      <p className="text-sm text-gray-600 mb-1">Johns Hopkins Hospital</p>
                      <p className="text-sm text-gray-500">2012</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Professional Experience</h2>
                  
                  <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
                    <p>
                      <strong className="text-gray-800">Attending Cardiologist</strong><br />
                      New York Medical Center | 2012 - Present<br />
                      Leading the interventional cardiology department and performing complex cardiac procedures including angioplasty, stenting, and advanced cardiac catheterization.
                    </p>
                    
                    <p>
                      <strong className="text-gray-800">Clinical Instructor</strong><br />
                      Columbia University Medical Center | 2015 - Present<br />
                      Teaching medical students and residents in cardiology, supervising clinical rotations, and conducting research in cardiovascular medicine.
                    </p>
                    
                    <p>
                      <strong className="text-gray-800">Research Fellow</strong><br />
                      National Institutes of Health | 2010 - 2012<br />
                      Conducted groundbreaking research on novel treatments for heart failure and published multiple peer-reviewed articles in leading medical journals.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Certifications & Awards</h2>
                  
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>• Board Certified in Cardiovascular Disease - American Board of Internal Medicine</p>
                    <p>• Board Certified in Interventional Cardiology - American Board of Internal Medicine</p>
                    <p>• Fellow of the American College of Cardiology (FACC)</p>
                    <p>• Advanced Cardiac Life Support (ACLS) Certification</p>
                    <p>• Top Doctor Award - New York Magazine (2020, 2021, 2022)</p>
                    <p>• Excellence in Patient Care Award - New York Medical Center (2019)</p>
                    <p>• Outstanding Research Award - American Heart Association (2018)</p>
                    <p>• Best Cardiologist Award - Patients' Choice Awards (2017-2023)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}