import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
}

function DashboardLayout({ links, title, children, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} className="min-h-screen transition-colors duration-200 flex">
      {/* Desktop Sidebar */}
      <div className="sticky top-0 h-screen overflow-y-auto hidden md:block">
        <Sidebar links={links} onLogout={onLogout} />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 md:hidden bg-black/50"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 z-40 md:hidden"
          >
            <Sidebar links={links} onNavigate={() => setMobileMenuOpen(false)} onLogout={() => {
              onLogout && onLogout()
              setMobileMenuOpen(false)
            }} />
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <motion.header
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
          className="border-b px-5 py-4 transition-colors duration-200 flex-shrink-0 flex items-center justify-between"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
            <motion.h1 className="text-lg font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              {title}
            </motion.h1>
          </div>
        </motion.header>
        <motion.div
          className="px-5 py-6 overflow-y-auto flex-1"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

export default DashboardLayout

