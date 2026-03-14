// function Footer() {
//   return (
//     <footer className="border-t border-gray-100 bg-white/80">
//       <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
//         <p>&copy; {new Date().getFullYear()} Civil Engineering Department.</p>
//         <p className="text-[11px]">
//           Built with React &amp; Tailwind CSS. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   )
// }

// export default Footer



import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

function Footer() {
  return (
    <motion.footer
      style={{ backgroundColor: 'var(--navbar-bg)', color: 'var(--navbar-text)' }}
      className="transition-colors duration-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Department Info */}
        <motion.div variants={itemVariants}>
          <h3 style={{ color: 'var(--navbar-text)' }} className="text-lg font-semibold mb-3">
            Civil Engineering Department
          </h3>
          <p style={{ color: 'rgba(var(--navbar-text-rgb), 0.7)' }} className="text-sm opacity-70">
            Educating the next generation of engineers to design sustainable
            infrastructure and resilient communities through innovation,
            research, and practical training.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h4 style={{ color: 'var(--navbar-text)' }} className="font-semibold mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm opacity-80">
            {['About the Department', 'Programs', 'Research & Labs', 'Admissions'].map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 5, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <a href="#" className="hover:opacity-100 transition">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Student Resources */}
        <motion.div variants={itemVariants}>
          <h4 style={{ color: 'var(--navbar-text)' }} className="font-semibold mb-3">
            Student Resources
          </h4>
          <ul className="space-y-2 text-sm opacity-80">
            {['Course Materials', 'Internships', 'Scholarships', 'Student Projects'].map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 5, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <a href="#" className="hover:opacity-100 transition">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h4 style={{ color: 'var(--navbar-text)' }} className="font-semibold mb-3">
            Contact
          </h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Email: civil@university.edu</li>
            <li>Phone: +234 XXX XXX XXXX</li>
            <li>Address: Faculty of Engineering Campus</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        className="border-t transition-colors duration-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm opacity-80">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            © {new Date().getFullYear()} Civil Engineering Department. All rights reserved.
          </motion.p>

          <motion.p
            className="mt-2 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Built with React & Tailwind CSS
          </motion.p>
        </div>
      </motion.div>
    </motion.footer>
  )
}

export default Footer