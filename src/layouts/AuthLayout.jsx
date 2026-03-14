import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

function AuthLayout({ title, subtitle, children }) {
  const { isDark } = useTheme()

  return (
    <motion.div
      style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 transition-colors duration-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        style={{ backgroundColor: 'var(--card-bg)' }}
        className="grid w-full max-w-4xl gap-10 rounded-2xl shadow-xl overflow-hidden md:grid-cols-2 transition-colors duration-200"
        variants={itemVariants}
      >
        <motion.div
          style={{ backgroundColor: 'var(--navbar-bg)', color: 'var(--navbar-text)' }}
          className="p-8 flex flex-col justify-between transition-colors duration-200"
          variants={itemVariants}
        >
          <div>
            <motion.div className="flex items-center gap-3" variants={itemVariants}>
              <motion.div
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                CD
              </motion.div>
              <div>
                <p className="text-xs uppercase tracking-wide opacity-70">
                  Department of Civil Engineering
                </p>
                <p className="text-sm font-semibold">Student &amp; Staff Portal</p>
              </div>
            </motion.div>
            <motion.p className="mt-8 text-sm opacity-80 leading-relaxed" variants={itemVariants}>
              Access departmental resources, results, announcements and academic
              information in one place.
            </motion.p>
          </div>
          <motion.div className="mt-8 text-xs opacity-70" variants={itemVariants}>
            <p>Secure authentication powered by the department portal.</p>
          </motion.div>
        </motion.div>

        <motion.div className="p-8 flex flex-col justify-center" variants={itemVariants}>
          <div className="mb-6">
            <motion.h1
              className="text-2xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                className="mt-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            {Array.isArray(children) ? (
              children.map((child, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  {child}
                </motion.div>
              ))
            ) : (
              <motion.div variants={itemVariants}>{children}</motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AuthLayout

