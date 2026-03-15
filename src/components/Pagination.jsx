import { motion } from 'framer-motion'

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
  },
}

function Pagination({ page = 1, pageCount = 1, onPageChange }) {
  if (pageCount <= 1) return null

  const prevDisabled = page <= 1
  const nextDisabled = page >= pageCount

  return (
    <motion.div
      className="mt-4 flex items-center justify-between text-xs"
      style={{ color: 'var(--text-secondary)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p>
        Page <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{page}</span> of{' '}
        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{pageCount}</span>
      </p>
      <div className="flex gap-2">
        <motion.button
          type="button"
          disabled={prevDisabled}
          onClick={() => !prevDisabled && onPageChange(page - 1)}
          className="rounded-lg px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          style={{
            borderColor: 'var(--border-color)',
            borderWidth: '1px',
            color: prevDisabled ? 'var(--text-secondary)' : 'var(--text-primary)',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => !prevDisabled && (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          variants={buttonVariants}
          whileHover={prevDisabled ? {} : 'hover'}
          whileTap={prevDisabled ? {} : 'tap'}
        >
          Previous
        </motion.button>
        <motion.button
          type="button"
          disabled={nextDisabled}
          onClick={() => !nextDisabled && onPageChange(page + 1)}
          className="rounded-lg px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          style={{
            borderColor: 'var(--border-color)',
            borderWidth: '1px',
            color: nextDisabled ? 'var(--text-secondary)' : 'var(--text-primary)',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => !nextDisabled && (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          variants={buttonVariants}
          whileHover={nextDisabled ? {} : 'hover'}
          whileTap={nextDisabled ? {} : 'tap'}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Pagination

