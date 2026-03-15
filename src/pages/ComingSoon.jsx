import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ComingSoon() {

  const launchDate = new Date("2026-01-01")

  const calculateTimeLeft = () => {
    const difference = launchDate - new Date()

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [email, setEmail] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks! We'll notify you at ${email}`)
    setEmail("")
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          opacity: 0.1,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
            }}
            animate={{
              y: [null, -100],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">

        {/* Title */}
        <motion.h1
          className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Coming Soon
        </motion.h1>

        <motion.p
          className="mb-10 text-lg"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We're building something amazing. Stay tuned for the launch.
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="grid grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {Object.keys(timeLeft).map((interval) => (
            <div
              key={interval}
              className="backdrop-blur-lg rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: '1px',
              }}
            >
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {timeLeft[interval]}
              </p>
              <span
                className="text-sm capitalize"
                style={{ color: 'var(--text-secondary)' }}
              >
                {interval}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Email Notification */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg backdrop-blur focus:outline-none transition"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: '1px',
              color: 'var(--text-primary)',
            }}
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-black font-semibold hover:scale-105 transition"
            style={{
              background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          >
            Notify Me
          </button>
        </motion.form>

      </div>

    </div>
  )
}