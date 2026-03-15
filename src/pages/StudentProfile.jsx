import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { containerVariants, itemVariants, textVariants } from '../utils/animations'

const profileImageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

function StudentProfilePage() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const fileInputRef = useRef(null)
  
  const [isEditing, setIsEditing] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [formData, setFormData] = useState({
    fullName: 'Fatima Bello',
    email: 'fatima.bello@university.edu',
    matric: 'CVE/19/055',
    level: '300',
    phone: '+234 123 456 7890',
    address: 'Lagos, Nigeria',
    department: 'Civil Engineering',
  })

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Update user info
    setUser({ ...user, ...formData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <motion.div
      className="mx-auto max-w-4xl px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.h1
          variants={textVariants}
          className="text-3xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Student Profile
        </motion.h1>
        <motion.p
          variants={textVariants}
          className="mt-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          View and manage your profile information.
        </motion.p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        className="border rounded-2xl overflow-hidden transition-colors duration-200"
      >
        {/* Profile Header with Background */}
        <div
          style={{ backgroundColor: 'var(--color-primary)' }}
          className="h-32 transition-colors duration-200"
        />

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Photo Section */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-8 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Photo */}
            <motion.div
              variants={profileImageVariants}
              whileHover="hover"
              className="relative group"
            >
              <div
                style={{ borderColor: 'var(--border-color)' }}
                className="w-32 h-32 rounded-full border-4 overflow-hidden flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-16 h-16"
                    style={{ color: 'var(--text-secondary)' }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              {isEditing && (
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-0 right-0 rounded-full p-2 transition-colors duration-200"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                    <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </motion.button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <motion.h2
                variants={textVariants}
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {formData.fullName}
              </motion.h2>
              <motion.p
                variants={textVariants}
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {formData.department} • Level {formData.level}
              </motion.p>
              <motion.p
                variants={textVariants}
                className="text-xs mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {formData.matric}
              </motion.p>
            </div>

            {/* Edit Button */}
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: isEditing ? 'rgba(239, 68, 68, 0.2)' : 'var(--color-primary)',
                color: isEditing ? '#ef4444' : 'white',
              }}
              className="px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </motion.button>
          </motion.div>

          {/* Profile Details */}
          {!isEditing ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Academic Info */}
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Academic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Matric Number
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formData.matric}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Current Level
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formData.level} Level
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Department
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formData.department}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div style={{ borderColor: 'var(--border-color)' }} className="border-t transition-colors duration-200" />

              {/* Contact Info */}
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Email Address
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formData.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Phone Number
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formData.phone}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Address
                    </span>
                    <span className="text-sm font-semibold text-right" style={{ color: 'var(--text-primary)' }}>
                      {formData.address}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            // Edit Form
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants}>
                <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>

              {/* Address */}
              <motion.div variants={itemVariants}>
                <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                  className="flex-1 rounded-lg py-2.5 font-semibold text-sm transition-colors duration-200"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                  className="flex-1 rounded-lg py-2.5 font-semibold text-sm transition-colors duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StudentProfilePage

