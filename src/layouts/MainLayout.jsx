import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

function MainLayout({ children }) {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} className="min-h-screen flex flex-col transition-colors duration-200">
      <Navbar />
      <motion.main
        className="flex-1"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

export default MainLayout

