import { motion } from 'framer-motion'
import HeroCarousel from "../components/HeroCarousel"
import AchievementsPage from "./Achievements"

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function HomePage() {
  const stats = [
    { label: 'Active Students', value: '500+' },
    { label: 'Experienced Lecturers', value: '25+' },
    { label: 'Successful Graduates', value: '2000+' },
    { label: 'Years of Excellence', value: '15+' },
  ]

  return (
    <motion.div
      className="mx-auto w-full mt-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <HeroCarousel /> 

      {/* Department Overview Section */}
      <motion.section
        className="mx-auto max-w-6xl px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="mb-12 mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
            Department Overview
          </h2>
          <p
            className="text-lg leading-relaxed  text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            The Civil Engineering Department is dedicated to providing world-class education
            and training in civil engineering. Our faculty comprises experienced professionals
            committed to fostering innovation, critical thinking, and practical expertise in
            our students. We focus on addressing real-world engineering challenges through
            cutting-edge research and industry partnerships.
          </p>
        </motion.div>
      </motion.section>

      {/* Quick Statistics Section */}
      <motion.section
        className="mx-auto max-w-6xl px-4 py-16 rounded-xl"
        style={{
          backgroundColor: 'var(--bg-secondary)',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-12 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          Quick Statistics
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                borderWidth: '1px',
              }}
            >
              <motion.div
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--color-primary)' }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
              >
                {stat.value}
              </motion.div>
              <motion.div
                style={{ color: 'var(--text-secondary)' }}
                className="font-semibold"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <AchievementsPage/>
    </motion.div>
  )
}

export default HomePage

