import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Home, MessageCircle, User, Settings, Clock, Download, 
  Calendar, Pill, Activity, Droplet, Heart, FileText 
} from 'lucide-react';
import { useGlobal } from '../contexts/GlobalContext';

interface DashboardPageProps {
  setCurrentPage: (page: any) => void;
}

const consultations: any[] = [
  {
    id: 1,
    date: 'Nov 7, 2025',
    time: '2:30 PM',
    summary: 'Headache and fever symptoms',
    prescription: 'Paracetamol 500mg, 3x daily',
  },
  {
    id: 2,
    date: 'Nov 5, 2025',
    time: '10:15 AM',
    summary: 'Sleep improvement consultation',
    prescription: 'Sleep hygiene recommendations',
  },
  {
    id: 3,
    date: 'Nov 3, 2025',
    time: '4:45 PM',
    summary: 'Dietary advice for weight management',
    prescription: 'Custom meal plan provided',
  },
  {
    id: 4,
    date: 'Oct 30, 2025',
    time: '11:00 AM',
    summary: 'Seasonal allergy symptoms',
    prescription: 'Antihistamine as needed',
  },
];

export function DashboardPage({ setCurrentPage }: DashboardPageProps) {
  const [activeNav, setActiveNav] = useState('home');

  const { username, setUsername } = useGlobal();
  const { formData, setFormData } = useGlobal();

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassedThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassedThisYear) {
      age -= 1;
    }

    return age;
  };

  let age: any = "not defined";
  if (formData.dateOfBirth.toLowerCase() !== "null" || formData.dateOfBirth.toLowerCase() !== "none") {
    age = calculateAge(formData.dateOfBirth);
  }

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white/70 backdrop-blur-lg border-r border-blue-100 p-6 hidden md:block"
      >
        <div className="space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              onClick={() => {
                setActiveNav(item.id);
                if (item.id === 'profile') {
                  setCurrentPage('profile');
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeNav === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="mb-2">Welcome back, {formData.name}</h1>
            <p className="text-gray-600">Here's your health overview</p>
          </motion.div>

          {/* Medical ID Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-green-400 text-white shadow-xl overflow-hidden relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">Medical ID</h3>
                    <p className="text-blue-100 text-sm">Emergency Information</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors text-sm">
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Age</p>
                  <p className="text-white">{age} years</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-1">Blood Group</p>
                  <p className="text-white">{formData.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-1">Height</p>
                  <p className="text-white">{formData.height} cm</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-1">Weight</p>
                  <p className="text-white">{formData.weight} kg</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-blue-100 text-sm mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-sm">
                    {formData.allergies}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Health Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Heart, label: 'Heart Rate', value: '72 bpm', color: 'from-red-500 to-pink-500' },
              { icon: Activity, label: 'Steps Today', value: '8,432', color: 'from-blue-500 to-cyan-500' },
              { icon: Droplet, label: 'Hydration', value: '6/8 glasses', color: 'from-cyan-500 to-blue-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl">{stat.value}</span>
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Past Consultations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2>Past Consultations</h2>
              <button 
                onClick={() => setCurrentPage('chat')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full hover:shadow-lg transition-all text-sm"
              >
                New Chat
              </button>
            </div>

            <div className="space-y-4">
              {consultations.map((consultation, index) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-gray-800">{consultation.summary}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {consultation.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {consultation.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
                        <Pill className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-green-700 mb-1">Prescription</p>
                          <p className="text-sm text-gray-700">{consultation.prescription}</p>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Download className="w-5 h-5 text-blue-600" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage('chat')}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-left shadow-xl hover:shadow-2xl transition-all"
            >
              <MessageCircle className="w-8 h-8 mb-3" />
              <h3 className="text-white mb-2">Start New Consultation</h3>
              <p className="text-blue-100 text-sm">Get instant AI health advice</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white text-left shadow-xl hover:shadow-2xl transition-all"
            >
              <FileText className="w-8 h-8 mb-3" />
              <h3 className="text-white mb-2">Upload Medical Reports</h3>
              <p className="text-green-100 text-sm">Store and manage your health records</p>
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
