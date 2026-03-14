import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
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

function LoginPage() {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/student')
    }
  }, [user, navigate])

  // Load remembered email if exists
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password.trim()) {
      setError('Password is required')
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
      const { data } = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      })

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      // Set user in AuthContext
      login(data.user, data.token)

      // Show success message
      setSuccessMessage('✅ Login successful! Redirecting...')

      // Redirect based on role
      setTimeout(() => {
        navigate(data.user.role === 'admin' ? '/admin/lecturers' : '/student')
      }, 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your dashboard, results and announcements."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Error Message */}
        {error && (
          <motion.div
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {successMessage && (
          <motion.div
            className="rounded-lg bg-green-50 p-3 text-sm text-green-700 border border-green-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {successMessage}
          </motion.div>
        )}

        {/* Email Input */}
        <motion.div
          className="space-y-1"
          custom={0}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">
            Email
          </label>
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

        {/* Password Input */}
        <motion.div
          className="space-y-1"
          custom={1}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">
            Password
          </label>
          <motion.input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
            placeholder="••••••••"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        {/* Remember Me & Forgot Password */}
        <motion.div
          className="flex items-center justify-between text-xs"
          custom={2}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label style={{ color: 'var(--text-secondary)' }} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="h-3 w-3 rounded border-gray-300"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </motion.div>

        {/* Sign In Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          custom={3}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </motion.button>

        {/* Register Link */}
        <motion.p
          className="pt-2 text-center text-xs"
          style={{ color: 'var(--text-secondary)' }}
          custom={4}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Get started
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage

