import { motion } from 'framer-motion'
import { textVariants, containerVariants } from '../utils/animations'

function AboutPage() {
  return (
    <motion.div
      className="mx-auto max-w-6xl px-4 py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h1
        variants={textVariants}
        className="text-3xl font-bold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        About Department
      </motion.h1>
      <motion.p
        variants={textVariants}
        className="max-w-2xl"
        style={{ color: 'var(--text-secondary)' }}
      >
        This page will contain the department history, vision &amp; mission, and head
        of department profile.
      </motion.p>
    </motion.div>
  )
}

export default AboutPage

