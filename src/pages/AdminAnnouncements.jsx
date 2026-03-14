import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api.js'

function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get('/admin/announcements')
      setAnnouncements(res.data.map((a) => ({
        ...a,
        id: a._id,
        createdDate: a.createdAt ? new Date(a.createdAt).toISOString().split('T')[0] : '',
      })))
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])
  const [showModal, setShowModal] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    priority: 'medium',
    category: 'Academic',
    status: 'published',
  })

  const filteredAnnouncements =
    filter === 'all'
      ? announcements
      : announcements.filter((a) => a.priority === filter)

  const handleOpenModal = (announcement = null) => {
    if (announcement) {
      setSelectedAnnouncement(announcement)
      setFormData({
        title: announcement.title,
        body: announcement.body,
        priority: announcement.priority,
        category: announcement.category,
        status: announcement.status,
      })
    } else {
      setSelectedAnnouncement(null)
      setFormData({
        title: '',
        body: '',
        priority: 'medium',
        category: 'Academic',
        status: 'published',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedAnnouncement(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedAnnouncement) {
        await api.put('/admin/announcements/' + selectedAnnouncement.id, formData)
      } else {
        await api.post('/admin/announcements', formData)
      }
      await fetchAnnouncements()
      handleCloseModal()
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await api.delete('/admin/announcements/' + id)
        await fetchAnnouncements()
      } catch (err) {
        alert(err.response?.data?.message || 'Something went wrong')
      }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' }
      case 'medium':
        return { bg: 'rgba(250, 204, 21, 0.1)', text: '#facc15' }
      case 'low':
        return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' }
      default:
        return { bg: 'var(--bg-secondary)', text: 'var(--text-secondary)' }
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' }
      case 'Campus':
        return { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' }
      case 'Opportunities':
        return { bg: 'rgba(99, 102, 241, 0.1)', text: '#6366f1' }
      default:
        return { bg: 'var(--bg-secondary)', text: 'var(--text-secondary)' }
    }
  }

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
              Announcements
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Create and manage announcements for students
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            + New Announcement
          </motion.button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid gap-3 md:grid-cols-3">
        {[
          { label: 'Total Announcements', value: announcements.length, icon: '📢' },
          { label: 'Published', value: announcements.filter((a) => a.status === 'published').length, icon: '✅' },
          { label: 'High Priority', value: announcements.filter((a) => a.priority === 'high').length, icon: '🔴' },
        ].map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }} className="rounded-lg border p-4">
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
          { label: 'High Priority', value: 'high' },
          { label: 'Medium Priority', value: 'medium' },
          { label: 'Low Priority', value: 'low' },
        ].map((tab) => (
          <motion.button
            key={tab.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(tab.value)}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{
              backgroundColor: filter === tab.value ? 'var(--color-primary)' : 'var(--card-bg)',
              color: filter === tab.value ? 'white' : 'var(--text-primary)',
              border: `2px solid ${filter === tab.value ? 'var(--color-primary)' : 'var(--border-color)'}`,
            }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Announcements List */}
      <motion.div variants={itemVariants} className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredAnnouncements.map((announcement) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.01 }}
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
              }}
              className="rounded-lg border p-5 group cursor-pointer transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    <h2
                      className="text-lg font-semibold flex-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {announcement.title}
                    </h2>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {announcement.body}
                  </p>

                  {/* Tags and Info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: getPriorityColor(announcement.priority).bg,
                        color: getPriorityColor(announcement.priority).text,
                      }}
                    >
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                    </span>
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: getCategoryColor(announcement.category).bg,
                        color: getCategoryColor(announcement.category).text,
                      }}
                    >
                      {announcement.category}
                    </span>
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: announcement.status === 'published' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                        color: announcement.status === 'published' ? '#22c55e' : '#6b7280',
                      }}
                    >
                      {announcement.status === 'published' ? '📤 Published' : '📝 Draft'}
                    </span>
                    <span className="ml-auto text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {announcement.createdDate}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleOpenModal(announcement)}
                    className="flex items-center justify-center h-8 w-8 rounded-lg transition-colors duration-200 text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    ✎
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="flex items-center justify-center h-8 w-8 rounded-lg transition-colors duration-200 text-white"
                    style={{ backgroundColor: '#ef4444' }}
                  >
                    🗑
                  </motion.button>
                </div>
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
                {selectedAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
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
                    placeholder="Enter announcement title"
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
                    Message
                  </label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Enter announcement message"
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
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

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
                      <option value="Academic">Academic</option>
                      <option value="Campus">Campus</option>
                      <option value="Opportunities">Opportunities</option>
                    </select>
                  </div>
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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {selectedAnnouncement ? 'Update Announcement' : 'Create Announcement'}
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

export default AdminAnnouncementsPage

