import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api.js'

function AdminLecturersPage() {
  const [lecturers, setLecturers] = useState([])

  const fetchLecturers = async () => {
    try {
      const res = await api.get('/admin/lecturers')
      setLecturers(res.data.map((l) => ({ ...l, id: l._id })))
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchLecturers()
  }, [])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPosition, setFilterPosition] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedLecturer, setSelectedLecturer] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    position: 'Lecturer II',
    email: '',
    phone: '',
    specialization: '',
    officeLocation: '',
    status: 'active',
    yearsOfExperience: 0,
  })

  const filteredLecturers = lecturers.filter((lecturer) => {
    const matchesSearch =
      lecturer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPosition = filterPosition === 'all' || lecturer.position === filterPosition
    return matchesSearch && matchesPosition
  })

  const handleOpenModal = (lecturer = null) => {
    if (lecturer) {
      setSelectedLecturer(lecturer)
      setFormData({
        fullName: lecturer.fullName,
        position: lecturer.position,
        email: lecturer.email,
        phone: lecturer.phone,
        specialization: lecturer.specialization,
        officeLocation: lecturer.officeLocation,
        status: lecturer.status,
        yearsOfExperience: lecturer.yearsOfExperience,
      })
    } else {
      setSelectedLecturer(null)
      setFormData({
        fullName: '',
        position: 'Lecturer II',
        email: '',
        phone: '',
        specialization: '',
        officeLocation: '',
        status: 'active',
        yearsOfExperience: 0,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedLecturer(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedLecturer) {
        await api.put('/admin/lecturers/' + selectedLecturer.id, formData)
      } else {
        await api.post('/admin/lecturers', formData)
      }
      await fetchLecturers()
      handleCloseModal()
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleDeleteLecturer = async (id) => {
    if (window.confirm('Are you sure you want to remove this lecturer?')) {
      try {
        await api.delete('/admin/lecturers/' + id)
        await fetchLecturers()
      } catch (err) {
        alert(err.response?.data?.message || 'Something went wrong')
      }
    }
  }

  const positions = ['Professor', 'Senior Lecturer', 'Lecturer I', 'Lecturer II', 'Assistant Lecturer']
  const statsData = [
    { label: 'Total Lecturers', value: lecturers.length, icon: '👨‍🏫' },
    { label: 'Professors', value: lecturers.filter((l) => l.position === 'Professor').length, icon: '🎓' },
    { label: 'Senior Lecturers', value: lecturers.filter((l) => l.position === 'Senior Lecturer').length, icon: '📚' },
    { label: 'Active', value: lecturers.filter((l) => l.status === 'active').length, icon: '✅' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Lecturer Management
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Manage faculty members and their profiles
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            + Add Lecturer
          </motion.button>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants} className="grid gap-3 md:grid-cols-4">
        {statsData.map((stat, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="flex-1 rounded-lg border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none"
        />
        <select
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="rounded-lg border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none"
        >
          <option value="all">All Positions</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Lecturers Grid */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLecturers.map((lecturer) => (
          <motion.div
            key={lecturer.id}
            whileHover={{ y: -5 }}
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            className="rounded-lg border p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {lecturer.fullName}
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {lecturer.position}
                </p>
              </div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: lecturer.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                  color: lecturer.status === 'active' ? '#22c55e' : '#6b7280',
                }}
              >
                {lecturer.status === 'active' ? '✓ Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-2 mb-4 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold">📧 Email:</span> {lecturer.email}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold">📱 Phone:</span> {lecturer.phone}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold">🎯 Specialization:</span> {lecturer.specialization}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold">📍 Office:</span> {lecturer.officeLocation}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold">⏱️ Experience:</span> {lecturer.yearsOfExperience} years
              </p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenModal(lecturer)}
                className="flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDeleteLecturer(lecturer.id)}
                className="flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors text-white"
                style={{ backgroundColor: '#ef4444' }}
              >
                Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ backgroundColor: 'var(--card-bg)' }}
            className="relative w-full max-w-md rounded-lg p-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {selectedLecturer ? 'Edit Lecturer' : 'Add New Lecturer'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Office Location
                </label>
                <input
                  type="text"
                  name="officeLocation"
                  value={formData.officeLocation}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {selectedLecturer ? 'Update Lecturer' : 'Create Lecturer'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCloseModal}
                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg border"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default AdminLecturersPage

