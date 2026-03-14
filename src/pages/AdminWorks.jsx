import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api.js'

function AdminWorksPage() {
  const [works, setWorks] = useState([])

  const fetchWorks = async () => {
    try {
      const res = await api.get('/admin/works')
      setWorks(res.data.map((w) => ({ ...w, id: w._id })))
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchWorks()
  }, [])
  const [showModal, setShowModal] = useState(false)
  const [selectedWork, setSelectedWork] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    deadline: '',
    status: 'active',
    category: 'Assignment',
  })

  const filteredWorks =
    filterStatus === 'all' ? works : works.filter((w) => w.status === filterStatus)

  const handleOpenModal = (work = null) => {
    if (work) {
      setSelectedWork(work)
      setFormData({
        title: work.title,
        description: work.description,
        owner: work.owner,
        deadline: work.deadline,
        status: work.status,
        category: work.category,
      })
    } else {
      setSelectedWork(null)
      setFormData({
        title: '',
        description: '',
        owner: '',
        deadline: '',
        status: 'active',
        category: 'Assignment',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedWork(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedWork) {
        await api.put('/admin/works/' + selectedWork.id, formData)
      } else {
        await api.post('/admin/works', formData)
      }
      await fetchWorks()
      handleCloseModal()
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleDeleteWork = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await api.delete('/admin/works/' + id)
        await fetchWorks()
      } catch (err) {
        alert(err.response?.data?.message || 'Something went wrong')
      }
    }
  }

  const statsData = [
    { label: 'Total Works', value: works.length, icon: '📋' },
    { label: 'Active', value: works.filter((w) => w.status === 'active').length, icon: '✅' },
    { label: 'Completed', value: works.filter((w) => w.status === 'completed').length, icon: '🎉' },
    { label: 'Total Submissions', value: works.reduce((sum, w) => sum + w.submissions, 0), icon: '📤' },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Assignments & Projects
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Manage coursework, assignments, and student projects
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            + New Work
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

      {/* Filter Tabs */}
      <motion.div variants={itemVariants} className="flex gap-3">
        {[
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Completed', value: 'completed' },
        ].map((tab) => (
          <motion.button
            key={tab.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterStatus(tab.value)}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{
              backgroundColor: filterStatus === tab.value ? 'var(--color-primary)' : 'var(--card-bg)',
              color: filterStatus === tab.value ? 'white' : 'var(--text-primary)',
              border: `2px solid ${filterStatus === tab.value ? 'var(--color-primary)' : 'var(--border-color)'}`,
            }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Works List */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ y: -5 }}
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
              }}
              className="rounded-lg border p-6 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    {work.title}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {work.owner}
                  </p>
                </div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor:
                      work.status === 'active'
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(107, 114, 128, 0.1)',
                    color: work.status === 'active' ? '#22c55e' : '#6b7280',
                  }}
                >
                  {work.status === 'active' ? '✓ Active' : 'Completed'}
                </span>
              </div>

              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                {work.description}
              </p>

              <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    📌 Category: {work.category}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                    }}
                  >
                    {work.submissions} submissions
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  📅 Deadline: {work.deadline}
                </p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenModal(work)}
                  className="flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteWork(work.id)}
                  className="flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors text-white"
                  style={{ backgroundColor: '#ef4444' }}
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ backgroundColor: 'var(--card-bg)' }}
              className="relative w-full max-w-2xl rounded-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-2xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                ×
              </button>

              <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                {selectedWork ? 'Edit Assignment/Project' : 'Create New Assignment/Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="space-y-1">
                  <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Bridge Design Project"
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
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Detailed description of the assignment or project"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                    >
                      <option value="Assignment">Assignment</option>
                      <option value="Project">Project</option>
                      <option value="Quiz">Quiz</option>
                      <option value="Exam">Exam</option>
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
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Target Audience (Level/Owner)
                  </label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 400 level students"
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
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

                <div className="flex gap-3 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {selectedWork ? 'Update Work' : 'Create Work'}
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
      </AnimatePresence>
    </motion.div>
  )
}

export default AdminWorksPage

