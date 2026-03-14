import { motion } from 'framer-motion'
import { cardVariants } from '../utils/animations'

function Card({ children, className = '', animate = true }) {
  const cardContent = (
    <div style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} className={`rounded-xl border bg-white shadow-sm transition-colors duration-200 ${className}`}>
      {children}
    </div>
  )

  if (!animate) return cardContent

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    >
      {cardContent}
    </motion.div>
  )
}

export default Card

