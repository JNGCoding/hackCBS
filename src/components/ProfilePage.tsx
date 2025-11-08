import { use, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, Upload,
  Heart, Activity, Weight, Ruler, Droplet, AlertCircle
} from 'lucide-react';
import { useGlobal } from '../contexts/GlobalContext';
import { sendPlainText } from '../services/BackendBridge';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload
  };

  const healthStats = [
    { icon: Heart, label: 'Heart Rate', value: '72', unit: 'bpm', color: 'from-red-500 to-pink-500' },
    { icon: Activity, label: 'BMI', value: '22.9', unit: '', color: 'from-blue-500 to-cyan-500' },
    { icon: Droplet, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', color: 'from-purple-500 to-pink-500' },
    { icon: Weight, label: 'Weight', value: formData.weight, unit: 'kg', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your health information</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isEditing) {
                //* Change elements here
                setTimeout(async () => {
                  await sendPlainText("account/infochange", username + "~" + "USERNAME" + "~" + formData.name);
                  await sendPlainText("account/infochange", username + "~" + "BIRTHDATE" + "~" + formData.dateOfBirth);
                  await sendPlainText("account/infochange", username + "~" + "PHONE" + "~" + formData.phone);
                  await sendPlainText("account/infochange", username + "~" + "GENDER" + "~" + formData.gender);
                  await sendPlainText("account/infochange", username + "~" + "LOCATION" + "~" + formData.location);
                  await sendPlainText("account/infochange", username + "~" + "BLOODGROUP" + "~" + formData.bloodGroup);                  
                  await sendPlainText("account/infochange", username + "~" + "HEIGHT_IN_CM" + "~" + formData.height);
                  await sendPlainText("account/infochange", username + "~" + "WEIGHT" + "~" + formData.weight);
                  await sendPlainText("account/infochange", username + "~" + "ALLERGIES" + "~" + formData.allergies);                  
                }, 0);

                console.log("INFO CHANGED!");
              }

              setIsEditing(!isEditing)
            }}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
              isEditing
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg'
                : 'bg-white/70 backdrop-blur-lg border border-blue-100 text-gray-700 hover:border-blue-300'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </>
            )}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-lg"
            >
              <h3 className="mb-6 flex items-center gap-2 text-gray-800">
                <User className="w-6 h-6 text-blue-500" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <p className="text-gray-800">{formData.email}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{new Date(formData.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Gender</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.location}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Medical Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-lg"
            >
              <h3 className="mb-6 flex items-center gap-2 text-gray-800">
                <Heart className="w-6 h-6 text-red-500" />
                Medical Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Blood Group</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.bloodGroup}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Height (cm)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.height} cm</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Weight (kg)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.weight} kg</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Emergency Contact</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.emergencyContact}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-2">Allergies</label>
                  {isEditing ? (
                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.allergies}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Upload Medical Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-lg"
            >
              <h3 className="mb-6 flex items-center gap-2 text-gray-800">
                <Upload className="w-6 h-6 text-green-500" />
                Upload Medical Reports
              </h3>

              <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                whileHover={{ scale: 1.01 }}
                className={`p-12 rounded-2xl border-2 border-dashed transition-all text-center ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50'
                }`}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <p className="text-gray-700 mb-2">Drag and drop your files here</p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full hover:shadow-lg transition-all">
                  Browse Files
                </button>
                <p className="text-gray-400 text-xs mt-4">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Health Stats */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-green-400 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white">{formData.name}</h3>
                  <p className="text-blue-100 text-sm">{age} years old</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-blue-100">
                  <Mail className="w-4 h-4" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Phone className="w-4 h-4" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <MapPin className="w-4 h-4" />
                  <span>{formData.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-3xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-lg"
            >
              <h3 className="mb-6 text-gray-800">Health Stats</h3>
              <div className="space-y-4">
                {healthStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-blue-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="text-gray-800">
                      {stat.value} <span className="text-sm text-gray-500">{stat.unit}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-yellow-50 border border-yellow-200"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-900 mb-2">Medical Alert</p>
                  <p className="text-sm text-yellow-800">
                    Allergic to: {formData.allergies}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
