"use client"
import React, { useState } from 'react';
import { Home, Settings, Smile, Phone } from 'lucide-react';

export default function StaffProfileComponent() {
  const [leftTab, setLeftTab] = useState('about');
  const [rightTab, setRightTab] = useState('aboutme');

  return (
    <div className="min-h-screen bg-[#f4f4f9]">
      {/* Breadcrumb */}
      <div className="px-6 py-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-semibold">Profile</span>
          <span>›</span>
          <Home size={16} />
          <span>›</span>
          <span>Staffs</span>
          <span>›</span>
          <span>Profile</span>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
          {/* Left Sidebar */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="bg-[#2c3e50] text-white text-center pt-8 pb-16 relative">
              <h2 className="text-2xl font-semibold mb-1">Jayna Patil</h2>
              <p className="text-sm text-gray-300">Nurse</p>
              
              {/* Profile Image */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" 
                    alt="Jayna Patil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Address and Phone */}
            <div className="pt-20 pb-6 px-6 text-center border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                456, Estern evenue, Courtage area,<br />New York
              </p>
              <div className="flex items-center justify-center text-sm text-gray-700">
                <Phone size={14} className="mr-2" />
                <span>264-625-2583</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 py-6 px-4 border-b border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">564</div>
                <div className="text-xs text-gray-500 mt-1">Following</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl font-bold text-gray-800">18k</div>
                <div className="text-xs text-gray-500 mt-1">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">565</div>
                <div className="text-xs text-gray-500 mt-1">Post</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-gray-200">
              <button
                onClick={() => setLeftTab('about')}
                className={`py-3 text-sm font-medium transition-colors ${
                  leftTab === 'about'
                    ? 'text-[#5b73e8] border-b-2 border-[#5b73e8]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setLeftTab('skills')}
                className={`py-3 text-sm font-medium transition-colors ${
                  leftTab === 'skills'
                    ? 'text-[#5b73e8] border-b-2 border-[#5b73e8]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Skills
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {leftTab === 'about' ? (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                  
                  <div>
                    <h3 className="text-xs text-gray-500 mb-2">Email address:</h3>
                    <p className="text-sm text-gray-800">john@gmail.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs text-gray-500 mb-2">Phone:</h3>
                    <p className="text-sm text-gray-800">+91 1234567890</p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>Skills content goes here...</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tabs Header */}
            <div className="border-b border-gray-200">
              <div className="flex items-center">
                <button 
                  onClick={() => setRightTab('aboutme')}
                  className={`flex items-center space-x-2 w-[50%] text-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    rightTab === 'aboutme' 
                      ? 'text-gray-800 border-[#5b73e8]' 
                      : 'text-gray-600 border-transparent hover:text-gray-800'
                  }`}
                >
                  <Smile size={18} />
                  <span>About Me</span>
                </button>
                <button 
                  onClick={() => setRightTab('settings')}
                  className={`flex items-center space-x-2 w-[50%] text-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    rightTab === 'settings' 
                      ? 'text-gray-800 border-[#5b73e8]' 
                      : 'text-gray-600 border-transparent hover:text-gray-800'
                  }`}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {rightTab === 'aboutme' ? (
                <>
                  {/* About Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">About</h2>
                    
                    {/* Info Grid */}
                    <div className="grid grid-cols-4 gap-6 mb-6">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-600 mb-2">Full Name</h3>
                        <p className="text-sm text-gray-500">Jayna Patil</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-600 mb-2">Mobile</h3>
                        <p className="text-sm text-gray-500">(123) 456 7890</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-600 mb-2">Email</h3>
                        <p className="text-sm text-gray-500">johndeo@example.com</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-600 mb-2">Location</h3>
                        <p className="text-sm text-gray-500">India</p>
                      </div>
                    </div>

                    {/* Bio Paragraphs */}
                    <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                      <p>
                        Completed my graduation in Arts from the well known and renowned institution of India – SARDAR PATEL ARTS COLLEGE, BARODA in 2000-01, which was affiliated to M.S. University. I ranker in University exams from the same university from 1996-01.
                      </p>
                      <p>
                        Worked as Professor and Head of the department at Sarda Collage, Rajkot, Gujarat from 2003-2015
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </p>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Education</h2>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>M.S.N.,Gujarat University, Ahmedabad,India.</p>
                      <p>B.S.N.,Gujarat University, Ahmedabad, India.</p>
                      <p>A.S.D.,Shaurashtra University, Rajkot, India</p>
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Experience</h2>
                    <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                      <p>
                        One year nursing internship from April-2009 to march-2010 at B. J. Medical College, Ahmedabad.
                      </p>
                      <p>
                        I have worked as a part time Nursing in Apang manav mandal from 1st june 2004 to 31st jan 2005.
                      </p>
                      <p>
                        2.5 Years Worked at Mahatma Gandhi General Hospital, Surendranagar.
                      </p>
                    </div>
                  </div>

                  {/* Conferences Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Conferences, Cources & Workshop Attended</h2>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Security Settings Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-6">Security Settings</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                      />
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                      />
                      <button className="px-6 py-2.5 bg-[#0d6efd] text-white text-sm font-medium rounded hover:bg-[#0b5ed7] transition-colors">
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Account Settings Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-6">Account Settings</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8]"
                        />
                      </div>
                      <textarea
                        placeholder="Address"
                        className="w-full px-4 py-3 bg-[#e8ebf3] text-gray-700 placeholder-gray-500 rounded border-0 focus:outline-none focus:ring-2 focus:ring-[#5b73e8] resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#5b73e8]"
                        />
                        <span className="text-sm text-gray-700">Profile Visibility For Everyone</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#5b73e8]"
                        />
                        <span className="text-sm text-gray-700">New task notifications</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#5b73e8]"
                        />
                        <span className="text-sm text-gray-700">New friend request notifications</span>
                      </label>
                    </div>
                    <button className="mt-6 px-6 py-2.5 bg-[#0d6efd] text-white text-sm font-medium rounded hover:bg-[#0b5ed7] transition-colors">
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}