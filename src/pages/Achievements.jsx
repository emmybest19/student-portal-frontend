import { motion } from 'framer-motion'
import Card from '../components/Card.jsx'
import { containerVariants, itemVariants, textVariants } from '../utils/animations'

const MOCK_ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Best Engineering Department 2025',
    summary: 'Awarded by the Faculty of Engineering for outstanding performance.',
  },
  {
    id: 2,
    title: 'National Concrete Canoe Competition',
    summary: 'Students emerged 2nd place at a national level competition.',
  },
]

function AchievementsPage() {
  return (
    <motion.div
      className="mx-auto flex flex-col items-center max-w-6xl px-4 py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h1
        variants={textVariants}
        className="text-2xl font-semibold"
        style={{ color: 'var(--text-primary)' }}
      >
        Department Achievements
      </motion.h1>
      <motion.p
        variants={textVariants}
        className="mt-1 text-sm"
        style={{ color: 'var(--text-secondary)' }}
      >
        Highlights of awards, competitions, and notable departmental milestones.
      </motion.p>

      <motion.div
        className="mt-6 grid gap-5 md:grid-cols-2 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {MOCK_ACHIEVEMENTS.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card animate={true}>
              <div className="p-5">
                <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h2>
                <p className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>{item.summary}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AchievementsPage

