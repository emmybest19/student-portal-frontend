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

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // Step 1: Enter email, Step 2: Reset password
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
    if (error) setError('')
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (error) setError('')
  }

  const handleFindEmail = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      await api.post('/auth/forgot-password', { email })
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

    if (!newPassword.trim()) {
      setError('New password is required')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!confirmPassword.trim()) {
      setError('Please confirm your password')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      await api.post('/auth/reset-password', { email, newPassword })

      setSuccessMessage('✅ Password reset successful! Redirecting to login...')

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title={step === 1 ? 'Forgot password?' : 'Reset your password'}
      subtitle={
        step === 1
          ? 'Enter your email address and we\'ll help you reset your password.'
          : 'Create a new password for your account.'
      }
    >
      {step === 1 ? (
        <form className="space-y-4" onSubmit={handleFindEmail}>
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
              value={email}
              onChange={handleEmailChange}
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
              placeholder="you@example.com"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Find Email Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            custom={1}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Searching...' : 'Find my account'}
          </motion.button>

          {/* Back to Login */}
          <motion.p
            className="pt-2 text-center text-xs"
            style={{ color: 'var(--text-secondary)' }}
            custom={2}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Remember your password?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </motion.p>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleResetPassword}>
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

          {/* Email Display */}
          <motion.div
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
            className="rounded-lg p-3 text-sm border"
            custom={0}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Resetting password for: <span className="font-semibold">{email}</span>
          </motion.div>

          {/* New Password Input */}
          <motion.div
            className="space-y-1"
            custom={1}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">
              New Password
            </label>
            <motion.input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
              placeholder="••••••••"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Confirm Password Input */}
          <motion.div
            className="space-y-1"
            custom={2}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <label style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">
              Confirm Password
            </label>
            <motion.input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
              placeholder="••••••••"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Reset Password Button */}
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
            {isLoading ? 'Resetting...' : 'Reset password'}
          </motion.button>

          {/* Back Button */}
          <motion.button
            type="button"
            onClick={() => {
              setStep(1)
              setNewPassword('')
              setConfirmPassword('')
              setError('')
            }}
            className="mt-2 w-full rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            custom={4}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>
        </form>
      )}
    </AuthLayout>
  )
}

export default ForgotPasswordPage
