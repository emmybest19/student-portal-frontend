import { useState } from 'react'
import { motion } from 'framer-motion'

function AdminStudentsPage() {
  const INITIAL_STUDENTS = [
    {
      id: 1,
      fullName: 'Adaeze Nwachukwu',
      matric: 'CVE/21/001',
      level: '300',
      email: 'adaeze.nwachukwu@student.edu',
      phone: '+234 801 234 5678',
      status: 'active',
      joiningDate: '2021-09-15',
    },
    {
      id: 2,
      fullName: 'John Ibrahim',
      matric: 'CVE/20/104',
      level: '400',
      email: 'john.ibrahim@student.edu',
      phone: '+234 802 345 6789',
      status: 'active',
      joiningDate: '2020-09-10',
    },
    {
      id: 3,
      fullName: 'Chioma Okafor',
      matric: 'CVE/22/045',
      level: '200',
      email: 'chioma.okafor@student.edu',
      phone: '+234 703 456 7890',
      status: 'active',
      joiningDate: '2022-09-12',
    },
  ]

  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    matric: '',
    level: '100',
    email: '',
    phone: '',
    status: 'active',
  })

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matric.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = filterLevel === 'all' || student.level === filterLevel
    return matchesSearch && matchesLevel
  })

  const handleOpenModal = (student = null) => {
    if (student) {
      setSelectedStudent(student)
      setFormData({
        fullName: student.fullName,
        matric: student.matric,
        level: student.level,
        email: student.email,
        phone: student.phone,
        status: student.status,
      })
    } else {
      setSelectedStudent(null)
      setFormData({
        fullName: '',
        matric: '',
        level: '100',
        email: '',
        phone: '',
        status: 'active',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedStudent(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Backend integration point - replace this with API call
    if (selectedStudent) {
      // UPDATE operation
      setStudents(students.map((s) => (s.id === selectedStudent.id ? { ...s, ...formData } : s)))
    } else {
      // CREATE operation
      const newStudent = {
        id: Date.now(),
        ...formData,
        joiningDate: new Date().toISOString().split('T')[0],
      }
      setStudents([...students, newStudent])
    }
    handleCloseModal()
  }

  const handleDeleteStudent = (id) => {
    // Backend integration point - replace this with API call
    if (window.confirm('Are you sure you want to remove this student?')) {
      setStudents(students.filter((s) => s.id !== id))
    }
  }

  const statsData = [
    { label: 'Total Students', value: students.length, icon: '👥' },
    { label: 'Level 100', value: students.filter((s) => s.level === '100').length, icon: '📚' },
    { label: 'Level 200', value: students.filter((s) => s.level === '200').length, icon: '📖' },
    { label: 'Level 300', value: students.filter((s) => s.level === '300').length, icon: '⭐' },
    { label: 'Level 400', value: students.filter((s) => s.level === '400').length, icon: '🏆' },
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
              Student Management
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Manage and track all student records
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            + Add Student
          </motion.button>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants} className="grid gap-3 md:grid-cols-5">
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
          placeholder="Search by name or matric number..."
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
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="rounded-lg border px-4 py-2 text-sm transition-colors duration-200 focus:outline-none"
        >
          <option value="all">All Levels</option>
          <option value="100">Level 100</option>
          <option value="200">Level 200</option>
          <option value="300">Level 300</option>
          <option value="400">Level 400</option>
        </select>
      </motion.div>

      {/* Students Table */}
      <motion.div variants={itemVariants} style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }} className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border-b">
                <th className="px-6 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Name
                </th>
                <th className="px-6 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Matric
                </th>
                <th className="px-6 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Level
                </th>
                <th className="px-6 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </th>
                <th className="px-6 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Status
                </th>
                <th className="px-6 py-3 text-center font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  style={{ borderColor: 'var(--border-color)' }}
                  className="border-b transition-colors hover:bg-opacity-50"
                >
                  <td className="px-6 py-4" style={{ color: 'var(--text-primary)' }}>
                    <span className="font-medium">{student.fullName}</span>
                  </td>
                  <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                    {student.matric}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                    >
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                    {student.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: student.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                        color: student.status === 'active' ? '#22c55e' : '#6b7280',
                      }}
                    >
                      {student.status === 'active' ? '✓ Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpenModal(student)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                      >
                        ✎
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 rounded-lg transition-colors text-white"
                        style={{ backgroundColor: '#ef4444' }}
                      >
                        🗑
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ backgroundColor: 'var(--card-bg)' }}
            className="relative w-full max-w-md rounded-lg p-6"
          >
            <div className="abs top-4 right-4">
              <button
                onClick={handleCloseModal}
                className="text-2xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                ×
              </button>
            </div>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {selectedStudent ? 'Edit Student' : 'Add New Student'}
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
                  Matric Number
                </label>
                <input
                  type="text"
                  name="matric"
                  value={formData.matric}
                  onChange={handleInputChange}
                  required
                  placeholder="CVE/YY/###"
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
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                  >
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                  </select>
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

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {selectedStudent ? 'Update Student' : 'Create Student'}
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

export default AdminStudentsPage

