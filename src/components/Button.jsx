import { motion } from 'framer-motion'

function Button({ variant = 'primary', children, className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/70'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-black hover:bg-secondary/90',
    outline:
      'border border-primary text-primary hover:bg-primary/5 focus-visible:ring-primary/40',
    ghost: 'text-gray-700 hover:bg-gray-100',
  }

  const classes = `${base} ${variants[variant]} ${className}`.trim()

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button

