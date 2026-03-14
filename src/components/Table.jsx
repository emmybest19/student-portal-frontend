import { motion } from 'framer-motion'

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
  hover: {
    backgroundColor: 'rgba(22, 163, 74, 0.05)',
    paddingLeft: '1rem',
    transition: { duration: 0.2 },
  },
}

function Table({ headers, rows }) {
  return (
    <motion.div
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
      className="overflow-x-auto rounded-xl border transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="min-w-full divide-y text-left text-sm" style={{ borderColor: 'var(--border-color)' }}>
        <thead style={{ backgroundColor: 'var(--bg-tertiary)' }} className="transition-colors duration-200">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                style={{ color: 'var(--text-secondary)' }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ borderColor: 'var(--border-color)' }} className="divide-y transition-colors duration-200">
          {rows.map((row, index) => (
            <motion.tr
              key={index}
              custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ color: 'var(--text-primary)' }}
              className="transition-colors duration-200 cursor-pointer"
            >
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-2.5 text-xs">
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export default Table

