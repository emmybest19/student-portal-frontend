import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Card from '../components/Card.jsx'
import api from '../services/api.js'
import { containerVariants, itemVariants, textVariants } from '../utils/animations'

function AchievementsPage() {
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    api.get('/public/achievements').then((res) => {
      const mapped = res.data.map((a) => ({
        id: a._id,
        title: a.title,
        summary: a.description,
      }))
      setAchievements(mapped)
    })
  }, [])

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
        {achievements.map((item) => (
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

