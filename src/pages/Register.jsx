import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../services/api.js'
import AuthLayout from '../layouts/AuthLayout.jsx'

const inputVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.4,
    },
  }),
}

function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    matricNumber: '',
    level: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
    // Check if all fields are filled
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.matricNumber.trim()) {
      setError('Matric number is required')
      return false
    }
    if (!formData.level) {
      setError('Level of study is required')
      return false
    }
    if (!formData.password.trim()) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await api.post('/auth/register', formData)

      // Show success message
      setSuccessMessage('✅ Registration successful! Redirecting to login...')

      // Clear form
      setFormData({
        fullName: '',
        email: '',
        matricNumber: '',
        level: '',
        password: '',
      })

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Register as a student to access the portal."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-3 text-sm font-medium"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
              borderColor: '#fecaca',
              borderWidth: '1px',
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-3 text-sm font-medium"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#16a34a',
              borderColor: '#bbf7d0',
              borderWidth: '1px',
            }}
          >
            {successMessage}
          </motion.div>
        )}
        <motion.div
          className="space-y-1"
          custom={0}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">Full name</label>
          <motion.input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
            placeholder="Surname Firstname"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div
          className="space-y-1"
          custom={1}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">Email</label>
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
            placeholder="you@example.com"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div
          className="space-y-1"
          custom={2}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">Matric Number</label>
          <motion.input
            type="text"
            name="matricNumber"
            value={formData.matricNumber}
            onChange={handleChange}
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
            placeholder="e.g., CVE/21/001"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div
          className="space-y-1"
          custom={3}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">Level of Study</label>
          <motion.select
            name="level"
            value={formData.level}
            onChange={handleChange}
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
            whileFocus={{ scale: 1.02 }}
          >
            <option value="">Select your level</option>
            <option value="100">Level 100 (Year 1)</option>
            <option value="200">Level 200 (Year 2)</option>
            <option value="300">Level 300 (Year 3)</option>
            <option value="400">Level 400 (Final Year)</option>
          </motion.select>
        </motion.div>

        <motion.div
          className="space-y-1"
          custom={4}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">Password</label>
          <motion.input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
            placeholder="Create a strong password"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          custom={5}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? 'Creating account...' : 'Get started'}
        </motion.button>

        <motion.p
          className="pt-2 text-center text-xs"
          style={{ color: 'var(--text-secondary)' }}
          custom={6}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          Already registered?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage

