import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function DashboardRecords() {
  const appointments = [
    { id: 1, patient: 'John Doe', patientImg: '/assets/patient-1.jpg', doctor: 'Dr.Jacob Ryan', date: '12/05/2016', disease: 'Fever', diseaseColor: 'red' },
    { id: 2, patient: 'Sarah Smith', patientImg: '/assets/sidebar/patient.jpg', doctor: 'Dr.Rajesh', date: '12/05/2016', disease: 'Cholera', diseaseColor: 'green' },
    { id: 3, patient: 'Airi Satou', patientImg: '/assets/sidebar/patient.jpg', doctor: 'Dr.Jay Soni', date: '12/05/2016', disease: 'Jaundice', diseaseColor: 'purple' },
    { id: 4, patient: 'Angelica ...', patientImg: '/assets/patient-1.jpg', doctor: 'Dr.John Deo', date: '12/05/2016', disease: 'Typhoid', diseaseColor: 'purple' },
    { id: 5, patient: 'Ashton Cox', patientImg: '/assets/sidebar/patient.jpg', doctor: 'Dr.Megha Trivedi', date: '12/05/2016', disease: 'Malaria', diseaseColor: 'orange' },
    { id: 6, patient: 'Cara Stevens', patientImg: '/assets/patient-1.jpg', doctor: 'Dr.Sarah Smith', date: '12/05/2016', disease: 'Infection', diseaseColor: 'cyan' },
    { id: 7, patient: 'Michael Bro', patientImg: '/assets/patient-1.jpg', doctor: 'Dr.Anna Taylor', date: '12/05/2016', disease: 'Pneumonia', diseaseColor: 'blue' }
  ];

  const doctors = [
    { id: 1, name: 'Dr.Megha Tr', qualification: '(BHMS)', status: 'Available', image: '/assets/sidebar/patient.jpg' },
    { id: 2, name: 'Dr.John Deo', qualification: '(MBBS,MS)', status: 'Available', image: '/assets/patient-1.jpg' },
    { id: 3, name: 'Dr.Jacob Ry', qualification: '(MBBS,MD)', status: 'Absent', image: '/assets/patient-1.jpg' },
    { id: 4, name: 'Dr.Jay Soni', qualification: '(MBBS)', status: 'Available', image: '/assets/sidebar/patient.jpg' },
    { id: 5, name: 'Dr.Linda Ca', qualification: '(MBBS, DNB)', status: 'Available', image: '/assets/sidebar/patient.jpg' },
    { id: 6, name: 'Dr.Rajesh Ku', qualification: '(MD, FRCP)', status: 'Absent', image: '/assets/patient-1.jpg' },
    { id: 7, name: 'Dr.Nina Pate', qualification: '(BDS)', status: 'Available', image: '/assets/sidebar/patient.jpg' },
    { id: 8, name: 'Dr.Michael U', qualification: '(MBBS, MD)', status: 'Available', image: '/assets/patient-1.jpg' }
  ];

  const operations = [
    { id: 1, patient: 'John D...', patientImg: '/assets/patient-1.jpg', doctors: [{ img: '/assets/sidebar/patient.jpg' }, { img: '/assets/patient-1.jpg' }], doctorCount: 2, date: '12-08-2019', duration: '3 hours', anesthesia: 'General', followUp: '12-09-2019', disease: 'Cancer' },
    { id: 2, patient: 'Jens B...', patientImg: '/assets/sidebar/patient.jpg', doctors: [{ img: '/assets/patient-1.jpg' }, { img: '/assets/sidebar/patient.jpg' }], doctorCount: 1, date: '14-08-2019', duration: '2 hours', anesthesia: 'Local', followUp: '14-09-2019', disease: 'Fracture' },
    { id: 3, patient: 'Alice J...', patientImg: '/assets/patient-1.jpg', doctors: [{ img: '/assets/patient-1.jpg' }, { img: '/assets/sidebar/patient.jpg' }], doctorCount: 3, date: '20-08-2019', duration: '1.5 hours', anesthesia: 'General', followUp: '20-09-2019', disease: 'Appendicitis' },
    { id: 4, patient: 'Robert...', patientImg: '/assets/patient-1.jpg', doctors: [{ img: '/assets/sidebar/patient.jpg' }, { img: '/assets/sidebar/patient.jpg' }], doctorCount: 1, date: '25-08-2019', duration: '2 hours', anesthesia: 'Local', followUp: '25-09-2019', disease: 'Hernia' },
    { id: 5, patient: 'Sophia...', patientImg: '/assets/sidebar/patient.jpg', doctors: [{ img: '/assets/sidebar/patient.jpg' }, { img: '/assets/patient-1.jpg' }], doctorCount: 4, date: '30-08-2019', duration: '2.5 hours', anesthesia: 'General', followUp: '30-09-2019', disease: 'Gallstones' },
    { id: 6, patient: 'Liam D...', patientImg: '/assets/patient-1.jpg', doctors: [{ img: '/assets/patient-1.jpg' }, { img: '/assets/sidebar/patient.jpg' }], doctorCount: 2, date: '05-09-2019', duration: '2 hours', anesthesia: 'Local', followUp: '05-10-2019', disease: 'Knee Injury' },
    { id: 7, patient: 'Emma...', patientImg: '/assets/sidebar/patient.jpg', doctors: [{ img: '/assets/patient-1.jpg' }, { img: '/assets/patient-1.jpg' }], doctorCount: 1, date: '10-09-2019', duration: '1 hour', anesthesia: 'Local', followUp: '10-10-2019', disease: 'Cataract' }
  ];

  const getDiseaseColorClass = (color: string): string => {
    const colors: Record<string, string> = {
      red: 'border-red-500 text-red-600 bg-red-100',
      green: 'border-green-500 text-green-600 bg-green-100',
      purple: 'border-purple-500 text-purple-600 bg-purple-100',
      orange: 'border-orange-500 text-orange-600 bg-orange-100',
      cyan: 'border-blue-500 text-blue-600 bg-blue-100',
      blue: 'border-blue-500 text-blue-600 bg-blue-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 h-[700px] overflow-y-auto flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Appointments</h2>
            <button className="text-blue-600 font-semibold hover:text-blue-700">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 font-semibold md:text-sm ">Patient Name</th>
                  <th className="text-left py-4 px-2 font-semibold md:text-sm">Assigned Doctor</th>
                  <th className="text-left py-4 px-2 font-semibold md:text-sm">Date</th>
                  <th className="text-left py-4 px-2 font-semibold md:text-sm">Diseases</th>
                  <th className="text-left py-4 px-2 font-semibold md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-100 transition">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <img src={apt.patientImg} alt={apt.patient} className="w-10 h-10 rounded-full object-cover" />
                        <span className="font-medium text-gray-800">{apt.patient}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-blue-600 font-medium">{apt.doctor}</span>
                    </td>
                    <td className="py-4 px-2">{apt.date}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDiseaseColorClass(apt.diseaseColor)}`}>
                        {apt.disease}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Status Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-[700px] overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Doctor Status</h2>
            <button className="text-blue-600 font-semibold hover:text-blue-700">View All</button>
          </div>

            <div className='flex items-center justify-between border-b border-gray-100 last:border-0'>
                  <div className="text-left p-2 font-semibold  w-1/2">Doctor Name</div>
                  <div className="text-right p-2 font-semibold w-1/2">Status</div>
            </div>

          <div className="space-y-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-2xl">
                        <img src={doc.image} alt={doc.image} className="w-10 h-10 rounded-full object-cover" />
                    
                  </div>
                  <div>
                    <div className="font-semibold text-blue-600">{doc.name}</div>
                    <div className="text-sm">{doc.qualification}</div>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  doc.status === 'Available' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operations Table */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Operations</h2>
            <button className="text-blue-600 font-semibold hover:text-blue-700">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Patient Name</th>
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Doctors Team</th>
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Date Of Operation</th>
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Duration</th>
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Anesthesia Type</th>
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Follow-Up Date</th>
                  <th className="text-center py-4 px-3 font-semibold md:text-sm">Report</th>
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Diseases</th>
                  <th className="text-left py-4 px-3 font-semibold md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {operations.map((op) => (
                  <tr key={op.id} className="border-b border-gray-100 transition">
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <img src={op.patientImg} alt={op.patient} className="w-10 h-10 rounded-full object-cover" />
                        <span className="font-medium text-gray-800">{op.patient}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center">
                        {op.doctors.slice(0, 2).map((doctor, idx) => (
                          <img 
                            key={idx} 
                            src={doctor.img} 
                            alt={`Doctor ${idx + 1}`}
                            className={`w-8 h-8 rounded-full object-cover border-2 border-white ${idx > 0 ? '-ml-2' : ''}`}
                          />
                        ))}
                        {op.doctorCount > 2 && (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold -ml-2 border-2 border-white">
                            +{op.doctorCount - 2}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-3">{op.date}</td>
                    <td className="py-4 px-3">{op.duration}</td>
                    <td className="py-4 px-3">{op.anesthesia}</td>
                    <td className="py-4 px-3">{op.followUp}</td>
                    <td className="py-4 px-3">
                      <div className="flex justify-center">
                        <button className="text-red-500 hover:text-red-600 transition">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-gray-800 font-medium">{op.disease}</span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}