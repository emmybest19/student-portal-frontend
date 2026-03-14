import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  hover: {
    x: 5,
    transition: { duration: 0.2 },
  },
}

function Sidebar({ links, onLogout, onNavigate }) {
  return (
    <motion.aside
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
      className="w-64 shrink-0 border-r backdrop-blur transition-colors duration-200 flex flex-col h-screen md:h-auto"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        style={{ borderColor: 'var(--border-color)' }}
        className="px-4 py-4 border-b transition-colors duration-200"
        variants={itemVariants}
      >
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
          Dashboard
        </p>
      </motion.div>
      <nav className="flex-1 space-y-1 px-2 py-3 text-sm">
        {links.map((link, idx) => (
          <motion.div key={link.to} variants={itemVariants} custom={idx} whileHover="hover">
            <NavLink
              to={link.to}
              onClick={onNavigate}
              className={({ isActive }) => {
                const baseClasses = 'flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200'
                const activeClasses = 'bg-primary/10 text-primary font-semibold'
                const inactiveClasses = 'hover:bg-white/10 transition-colors'
                return [baseClasses, isActive ? activeClasses : inactiveClasses].join(' ')
              }}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-primary)' : 'var(--text-primary)'
              })}
            >
              {link.label}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      {onLogout && (
        <motion.div
          style={{ borderColor: 'var(--border-color)' }}
          className="border-t px-2 py-3 transition-colors duration-200"
          variants={itemVariants}
        >
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              color: '#ef4444',
            }}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </motion.button>
        </motion.div>
      )}
    </motion.aside>
  )
}

export default Sidebar

