import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api.js'

function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState([])

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/admin/achievements')
      setAchievements(res.data.map((a) => ({ ...a, id: a._id })))
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchAchievements()
  }, [])
  const [showModal, setShowModal] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    category: 'Academic',
    description: '',
    icon: '🏆',
  })

  const filteredAchievements =
    filterCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === filterCategory)

  const categories = ['Academic', 'Competition', 'Research', 'Sports', 'Social']
  const iconOptions = ['🏆', '🥇', '🥈', '🥉', '⭐', '🌟', '✨', '🎓', '📚', '🚣', '🔬', '🎨', '🏅']

  const handleOpenModal = (achievement = null) => {
    if (achievement) {
      setSelectedAchievement(achievement)
      setFormData({
        title: achievement.title,
        year: achievement.year,
        category: achievement.category,
        description: achievement.description,
        icon: achievement.icon,
      })
    } else {
      setSelectedAchievement(null)
      setFormData({
        title: '',
        year: new Date().getFullYear(),
        category: 'Academic',
        description: '',
        icon: '🏆',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedAchievement(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedAchievement) {
        await api.put('/admin/achievements/' + selectedAchievement.id, formData)
      } else {
        await api.post('/admin/achievements', formData)
      }
      await fetchAchievements()
      handleCloseModal()
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleDeleteAchievement = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await api.delete('/admin/achievements/' + id)
        await fetchAchievements()
      } catch (err) {
        alert(err.response?.data?.message || 'Something went wrong')
      }
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' }
      case 'Competition':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' }
      case 'Research':
        return { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' }
      case 'Sports':
        return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' }
      case 'Social':
        return { bg: 'rgba(250, 204, 21, 0.1)', text: '#facc15' }
      default:
        return { bg: 'var(--bg-secondary)', text: 'var(--text-primary)' }
    }
  }

  const statsData = [
    { label: 'Total Achievements', value: achievements.length, icon: '🏆' },
    { label: 'This Year', value: achievements.filter((a) => a.year === new Date().getFullYear()).length, icon: '⭐' },
    { label: 'Last Year', value: achievements.filter((a) => a.year === new Date().getFullYear() - 1).length, icon: '📚' },
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
              Achievements & Awards
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Showcase departmental achievements and awards
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            + Add Achievement
          </motion.button>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants} className="grid gap-3 md:grid-cols-3">
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
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {['all', ...categories].map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterCategory(cat)}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{
              backgroundColor:
                filterCategory === cat ? 'var(--color-primary)' : 'var(--card-bg)',
              color: filterCategory === cat ? 'white' : 'var(--text-primary)',
              border: `2px solid ${
                filterCategory === cat ? 'var(--color-primary)' : 'var(--border-color)'
              }`,
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Achievements Grid */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
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
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{achievement.icon}</span>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: getCategoryColor(achievement.category).bg,
                    color: getCategoryColor(achievement.category).text,
                  }}
                >
                  {achievement.category}
                </span>
              </div>

              <h3
                className="text-lg font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {achievement.title}
              </h3>

              <p
                className="text-sm mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                {achievement.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  📅 {achievement.year}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleOpenModal(achievement)}
                    className="p-2 rounded-lg transition-colors text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    ✎
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteAchievement(achievement.id)}
                    className="p-2 rounded-lg transition-colors text-white"
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
                {selectedAchievement ? 'Edit Achievement' : 'Add New Achievement'}
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
                    placeholder="Achievement title"
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
                    rows={3}
                    placeholder="Describe the achievement"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      min="2000"
                      max={new Date().getFullYear() + 1}
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
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      Icon
                    </label>
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none"
                    >
                      {iconOptions.map((ico) => (
                        <option key={ico} value={ico}>
                          {ico}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Icon Preview */}
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Preview
                  </p>
                  <p className="text-5xl">{formData.icon}</p>
                </div>

                <div className="flex gap-3 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {selectedAchievement ? 'Update Achievement' : 'Create Achievement'}
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

export default AdminAchievementsPage

