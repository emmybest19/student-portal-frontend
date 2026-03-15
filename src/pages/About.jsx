import { motion } from 'framer-motion'
import { textVariants, containerVariants } from '../utils/animations'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function AboutPage() {
  // Sample lecturer data - replace with actual data from API
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
      className="mx-auto w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Department History Section */}
      <motion.section
        className="mx-auto max-w-7xl px-20 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <motion.h2 className="text-4xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
            Our History
          </motion.h2>
          <div
            className="text-lg leading-relaxed max-w-7xl space-y-4 text-justify"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              The Civil Engineering Department was established in 2009 with a vision to become
              a center of excellence in civil engineering education and research. Since its
              inception, the department has grown from a small group of dedicated faculty members
              to a thriving center with over 25 experienced lecturers and more than 500 active
              students.
            </p>
            <p>
              Over the past 15 years, our department has maintained a strong commitment to
              academic excellence, innovation, and community engagement. We have graduated over
              2,000 engineers who are now making significant contributions in various fields
              including infrastructure development, environmental management, and sustainable
              construction.
            </p>
            <p>
              Our state-of-the-art facilities, including well-equipped laboratories and design
              studios, provide students with hands-on experience in modern engineering practices.
              The department's research initiatives focus on sustainable development, smart cities,
              and resilient infrastructure design.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Mission and Vision Section */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-3xl font-bold mb-6 flex items-center"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="inline-block w-12 h-1 mr-4"
                style={{ backgroundColor: 'var(--color-primary)' }}
              ></span>
              Our Mission
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              To provide high-quality education in civil engineering that develops competent,
              ethical, and creative professionals capable of solving real-world engineering
              challenges. We are committed to fostering innovation, research excellence, and
              sustainable practices that contribute positively to society.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-3xl font-bold mb-6 flex items-center"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="inline-block w-12 h-1 mr-4"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              ></span>
              Our Vision
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              To be a globally recognized center of excellence in civil engineering education,
              research, and innovation. We aspire to create engineers who are leaders in their
              fields, contributing to sustainable development, technological advancement, and
              the betterment of humanity through transformative civil engineering solutions.
            </p>
          </motion.div>
        </div>
      </motion.section>

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

export default AboutPage

