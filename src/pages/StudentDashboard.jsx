import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import api from '../services/api.js'

function StudentDashboardPage() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    api.get('/student/dashboard')
      .then((res) => setDashboardData(res.data))
      .catch((err) => console.error('Failed to fetch dashboard data:', err))
  }, [])

  // Static data for achievements and deadlines (no backend endpoint)
  const studentData = {
    totalCreditsEarned: dashboardData?.totalCreditsEarned || 0,
    totalCreditsRequired: dashboardData?.totalCreditsRequired || 120,
    attendanceRate: dashboardData?.attendanceRate || 0,
    academicHonors: ['Dean\'s List (Semester 2)', 'Excellence in Mathematics'],
    upcomingDeadlines: [
      { title: 'Exam Registration', date: 'Mar 20, 2026' },
      { title: 'Project Submission', date: 'Mar 25, 2026' },
      { title: 'Course Materials Review', date: 'Mar 30, 2026' },
    ],
    recentAchievements: [
      { title: 'Perfect Attendance', icon: '🎯' },
      { title: 'High GPA', icon: '⭐' },
      { title: 'Active Participant', icon: '📚' },
      { title: 'Scholarship Recipient', icon: '🏆' },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const progressPercentage = (studentData.totalCreditsEarned / studentData.totalCreditsRequired) * 100

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Welcome Section with Student Info */}
      <motion.div variants={itemVariants}>
        <div
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          }}
          className="rounded-xl p-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 7a1 1 0 11-2 0 1 1 0 012 0zm5-2a1 1 0 100-2 1 1 0 000 2zm-8 4a1 1 0 100-2 1 1 0 000 2zm13 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="relative z-10">
            <p className="text-sm font-semibold opacity-90">Welcome back, 👋</p>
            <div className="mt-2">
              <h1 className="text-4xl font-bold">{user?.fullName || 'Student'}</h1>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg opacity-90">{user?.department || 'Civil Engineering'} Department</span>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-80">
              You're doing great! Keep up the excellent academic performance. Your success matters to us.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Stats Grid */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Current Level', value: user?.level || '300', icon: '📊' },
          { label: 'CGPA', value: dashboardData?.cgpa || '0.00', icon: '⭐', highlight: true },
          { label: 'Credits Completed', value: `${studentData.totalCreditsEarned}/${studentData.totalCreditsRequired}`, icon: '📚' },
          { label: 'Attendance', value: `${studentData.attendanceRate}%`, icon: '✅' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -5 }}
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: stat.highlight ? 'var(--color-primary)' : 'var(--border-color)',
              borderWidth: stat.highlight ? '2px' : '1px',
            }}
            className="rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Section */}
      <motion.div variants={itemVariants}>
        <div style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }} className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Degree Progress
          </h2>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Credit Units Completed
              </span>
              <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                {Math.round(progressPercentage)}%
              </span>
            </div>

            <div
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              className="h-3 rounded-full border overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="h-full rounded-full"
              />
            </div>

            <p className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              {studentData.totalCreditsEarned} of {studentData.totalCreditsRequired} credits earned
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-xs font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>
                Registered Courses
              </p>
              <p className="mt-1 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {dashboardData?.registeredCourses || 0}
              </p>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-xs font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>
                Completed Courses
              </p>
              <p className="mt-1 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {dashboardData?.completedCourses || 0}
              </p>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-xs font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>
                Remaining Courses
              </p>
              <p className="mt-1 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {dashboardData?.remainingCourses || 0}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Achievements and Recent Deadlines */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        {/* Achievements */}
        <div style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }} className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Your Achievements 🌟
          </h2>
          <div className="grid gap-3">
            {studentData.recentAchievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <span className="text-xl">{achievement.icon}</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {achievement.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }} className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Upcoming Deadlines 📅
          </h2>
          <div className="space-y-3">
            {studentData.upcomingDeadlines.map((deadline, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {deadline.title}
                  </span>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {deadline.date}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Academic Honors Section */}
      <motion.div variants={itemVariants}>
        <div style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }} className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Academic Distinctions 🎓
          </h2>
          <div className="flex flex-wrap gap-2">
            {studentData.academicHonors.map((honor, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                }}
              >
                {honor}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StudentDashboardPage

