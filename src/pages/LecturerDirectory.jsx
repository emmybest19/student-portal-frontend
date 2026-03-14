import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import api from '../services/api.js'
import { containerVariants, itemVariants, textVariants } from '../utils/animations'

function LecturerDirectoryPage() {
  const [selected, setSelected] = useState(null)
  const [lecturers, setLecturers] = useState([])

  useEffect(() => {
    api.get('/public/lecturers').then((res) => {
      const mapped = res.data.map((l) => ({
        id: l._id,
        name: l.fullName,
        position: l.position,
        image: '',
        biography: l.biography,
        qualifications: l.qualifications,
        specialization: l.specialization,
        contact: l.email,
      }))
      setLecturers(mapped)
    })
  }, [])

  return (
    <motion.div
      className="mx-auto max-w-6xl px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-6 flex items-center justify-between gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.h1 variants={textVariants} className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Lecturer Directory
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="mt-1 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Explore lecturers in the Civil Engineering department.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-5 sm:grid-cols-2 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {lecturers.map((lecturer) => (
          <motion.div key={lecturer.id} variants={itemVariants}>
            <Card animate={true} className="overflow-hidden">
              <div className="h-28 bg-primary/5" />
              <div className="px-4 pb-4 pt-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {lecturer.name}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {lecturer.position}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    className="mt-3 px-0 text-xs font-medium text-primary"
                    type="button"
                    onClick={() => setSelected(lecturer)}
                  >
                    View profile
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Modal
        open={!!selected}
        title={selected ? selected.name : ''}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <motion.div
            className="space-y-2 text-sm"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              {selected.position}
            </p>
            <p>{selected.biography}</p>
            <p>
              <span className="font-semibold">Qualifications:</span>{' '}
              {selected.qualifications}
            </p>
            <p>
              <span className="font-semibold">Specialization:</span>{' '}
              {selected.specialization}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {selected.contact}
            </p>
          </motion.div>
        )}
      </Modal>
    </motion.div>
  )
}

export default LecturerDirectoryPage

