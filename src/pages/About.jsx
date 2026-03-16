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

     
    </motion.div>
  )
}

export default AboutPage

