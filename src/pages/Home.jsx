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

   const lecturers = [
      {
        id: 1,
        name: 'Prof. Okon E. Edafe',
        title: 'Department Head',
        specialization: 'Structural Engineering',
        image: 'https://via.placeholder.com/300x300?text=Prof+John+Smith',
        email: 'okonedafe@university.edu',
        office: 'Room 101',
      },
      {
        id: 2,
        name: 'Dr. Sarah Ebri',
        title: 'Senior Lecturer',
        specialization: 'Transportation Engineering',
        image: 'https://via.placeholder.com/300x300?text=Dr+Sarah+Johnson',
        email: 'sarah100@university.edu',
        office: 'Room 102',
      },
      {
        id: 3,
        name: 'Dr. Mitchael Arit',
        title: 'Lecturer',
        specialization: 'Geotechnical Engineering',
        image: 'https://via.placeholder.com/300x300?text=Dr+Michael+Brown',
        email: 'arit28@university.edu',
        office: 'Room 103',
      },
      {
        id: 4,
        name: 'Dr. Obeten E. Ete',
        title: 'Lecturer',
        specialization: 'Water Resources Engineering',
        image: 'https://via.placeholder.com/300x300?text=Dr+Emily+Davis',
        email: 'obetenete@university.edu',
        office: 'Room 104',
      },
      {
        id: 5,
        name: 'Dr. Ruth A. Akpan',
        title: 'Senior Lecturer',
        specialization: 'Environmental Engineering',
        image: 'https://via.placeholder.com/300x300?text=Dr+Robert+Wilson',
        email: 'akpana@university.edu',
        office: 'Room 105',
      },
      {
        id: 6,
        name: 'Dr. Lawrence U. Udoh',
        title: 'Lecturer',
        specialization: 'Construction Management',
        image: 'https://via.placeholder.com/300x300?text=Dr+Lisa+Anderson',
        email: 'u.udoh@university.edu',
        office: 'Room 106',
      },
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

       {/* Lecturers Directory Section */}
      <motion.section
        className="mx-auto max-w-6xl px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Faculty Members
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Meet our experienced and dedicated faculty members
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {lecturers.map((lecturer) => (
            <motion.div
              key={lecturer.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              {/* Lecturer Image */}
              <motion.div
                className="h-64 overflow-hidden relative"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={lecturer.image}
                  alt={lecturer.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Lecturer Details */}
              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {lecturer.name}
                </motion.h3>

                <motion.p
                  className="font-semibold mb-3"
                  style={{ color: 'var(--color-primary)' }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {lecturer.title}
                </motion.p>

                <p
                  className="text-sm mb-4 pb-4"
                  style={{ color: 'var(--text-secondary)', borderBottomColor: 'var(--border-color)', borderBottomWidth: '1px' }}
                >
                  <span className="font-semibold">Specialization:</span> {lecturer.specialization}
                </p>

                <motion.div
                  className="space-y-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <p>
                    <span className="font-semibold">Email:</span>{' '}
                    <motion.a
                      href={`mailto:${lecturer.email}`}
                      className="hover:underline"
                      style={{ color: 'var(--color-primary)' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {lecturer.email}
                    </motion.a>
                  </p>
                  <p>
                    <span className="font-semibold">Office:</span> {lecturer.office}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

export default HomePage

