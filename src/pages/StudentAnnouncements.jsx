import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api.js'

function StudentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/student/announcements')
      .then((res) => {
        const mapped = res.data.map((a) => ({
          id: a._id,
          title: a.title,
          body: a.body,
          date: new Date(a.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          read: false,
          priority: a.priority,
          category: a.category,
        }))
        setAnnouncements(mapped)
      })
      .catch((err) => console.error('Failed to fetch announcements:', err))
      .finally(() => setLoading(false))
  }, [])
  const [filter, setFilter] = useState('all')

  const filteredAnnouncements =
    filter === 'unread' ? announcements.filter((a) => !a.read) : filter === 'read' ? announcements.filter((a) => a.read) : announcements

  const unreadCount = announcements.filter((a) => !a.read).length

  const toggleReadStatus = (id) => {
    setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, read: !a.read } : a)))
  }

  const markAllAsRead = () => {
    setAnnouncements(announcements.map((a) => ({ ...a, read: true })))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'Campus':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'Opportunities':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Announcements
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {unreadCount > 0 ? (
                <>
                  You have <span className="font-semibold text-red-500">{unreadCount}</span> unread announcement
                  {unreadCount !== 1 ? 's' : ''}
                </>
              ) : (
                'All announcements read'
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              Mark All as Read
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <div className="flex gap-3">
          {[
            { label: 'All', value: 'all' },
            { label: 'Unread', value: 'unread' },
            { label: 'Read', value: 'read' },
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
        </div>
      </motion.div>

      {/* Announcements List */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <motion.div
              key={announcement.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="group cursor-pointer"
            >
              <motion.div
                onClick={() => toggleReadStatus(announcement.id)}
                style={{
                  backgroundColor: announcement.read ? 'var(--card-bg)' : 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  borderLeft: announcement.read ? '4px solid var(--border-color)' : '4px solid var(--color-primary)',
                }}
                className="rounded-lg border p-5 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Unread Indicator Dot */}
                  {!announcement.read && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-1 h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <h2
                        className={`text-lg font-semibold transition-colors duration-200 ${
                          announcement.read ? 'opacity-60' : 'font-bold'
                        }`}
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {announcement.title}
                      </h2>
                    </div>

                    <p
                      className={`text-sm leading-relaxed transition-colors duration-200 ${announcement.read ? 'opacity-70' : ''}`}
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {announcement.body}
                    </p>

                    {/* Tags and Date */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                      </span>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(announcement.category)}`}>
                        {announcement.category}
                      </span>
                      <span className="ml-auto text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {announcement.date}
                      </span>
                    </div>
                  </div>

                  {/* Mark as Read/Unread Button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleReadStatus(announcement.id)
                    }}
                    className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: announcement.read ? 'var(--bg-tertiary)' : 'var(--color-primary)' }}
                  >
                    {announcement.read ? (
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V15a1 1 0 11-2 0V5.414L5.707 10.707a1 1 0 01-1.414-1.414l6-6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants} className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 mb-4 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: 'var(--text-secondary)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {filter === 'unread' ? 'No unread announcements' : filter === 'read' ? 'No read announcements' : 'No announcements yet'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default StudentAnnouncementsPage

