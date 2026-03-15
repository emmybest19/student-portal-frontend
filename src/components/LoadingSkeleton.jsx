import { motion } from 'framer-motion'

const pulseVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

function LoadingSkeleton({ className = '' }) {
  return (
    <motion.div
      className={`rounded-lg ${className}`}
      variants={pulseVariants}
      animate="animate"
      style={{
        backgroundColor: 'var(--bg-secondary)',
      }}
      aria-hidden="true"
    />
  )
}

export default LoadingSkeleton

