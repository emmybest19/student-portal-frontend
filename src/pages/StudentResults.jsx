import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Table from '../components/Card.jsx'
import { containerVariants, itemVariants, textVariants } from '../utils/animations'

// Mock data for all levels and semesters
const MOCK_RESULTS = {
  100: {
    1: [
      { courseCode: 'CVE 101', courseName: 'Engineering Graphics I', creditLoad: 2, caScore: 15, examScore: 78, grade: 'A' },
      { courseCode: 'CVE 103', courseName: 'Mathematics I', creditLoad: 3, caScore: 18, examScore: 82, grade: 'A' },
      { courseCode: 'CVE 105', courseName: 'Physics I', creditLoad: 3, caScore: 14, examScore: 76, grade: 'B+' },
      { courseCode: 'CVE 107', courseName: 'Chemistry I', creditLoad: 3, caScore: 17, examScore: 80, grade: 'A' },
      { courseCode: 'CVE 109', courseName: 'Environmental Science I', creditLoad: 2, caScore: 13, examScore: 72, grade: 'B' },
    ],
    2: [
      { courseCode: 'CVE 102', courseName: 'Engineering Graphics II', creditLoad: 2, caScore: 16, examScore: 79, grade: 'A-' },
      { courseCode: 'CVE 104', courseName: 'Mathematics II', creditLoad: 3, caScore: 14, examScore: 75, grade: 'B+' },
      { courseCode: 'CVE 106', courseName: 'Physics II', creditLoad: 3, caScore: 18, examScore: 81, grade: 'A' },
      { courseCode: 'CVE 108', courseName: 'Chemistry II', creditLoad: 3, caScore: 17, examScore: 80, grade: 'A' },
      { courseCode: 'CVE 110', courseName: 'Environmental Science II', creditLoad: 2, caScore: 16, examScore: 78, grade: 'A-' },
    ],
  },
  200: {
    1: [
      { courseCode: 'CVE 201', courseName: 'Mechanics of Materials I', creditLoad: 3, caScore: 14, examScore: 75, grade: 'B+' },
      { courseCode: 'CVE 203', courseName: 'Surveying I', creditLoad: 3, caScore: 17, examScore: 80, grade: 'A' },
      { courseCode: 'CVE 205', courseName: 'Hydraulics I', creditLoad: 3, caScore: 16, examScore: 79, grade: 'A-' },
      { courseCode: 'CVE 207', courseName: 'Soil Mechanics I', creditLoad: 3, caScore: 13, examScore: 72, grade: 'B' },
      { courseCode: 'CVE 209', courseName: 'Engineering Geology', creditLoad: 2, caScore: 18, examScore: 81, grade: 'A' },
    ],
    2: [
      { courseCode: 'CVE 202', courseName: 'Mechanics of Materials II', creditLoad: 3, caScore: 18, examScore: 82, grade: 'A' },
      { courseCode: 'CVE 204', courseName: 'Surveying II', creditLoad: 3, caScore: 14, examScore: 76, grade: 'B+' },
      { courseCode: 'CVE 206', courseName: 'Hydraulics II', creditLoad: 3, caScore: 17, examScore: 80, grade: 'A' },
      { courseCode: 'CVE 208', courseName: 'Soil Mechanics II', creditLoad: 3, caScore: 16, examScore: 78, grade: 'A-' },
      { courseCode: 'CVE 210', courseName: 'Construction Methods I', creditLoad: 2, caScore: 13, examScore: 71, grade: 'B' },
    ],
  },
  300: {
    1: [
      { courseCode: 'CVE 301', courseName: 'Structural Analysis I', creditLoad: 4, caScore: 18, examScore: 81, grade: 'A' },
      { courseCode: 'CVE 303', courseName: 'Structural Design I', creditLoad: 3, caScore: 10, examScore: 60, grade: 'C' },
      { courseCode: 'CVE 305', courseName: 'Water Resources Engineering I', creditLoad: 3, caScore: 17, examScore: 80, grade: 'A' },
      { courseCode: 'CVE 307', courseName: 'Transportation Engineering I', creditLoad: 3, caScore: 16, examScore: 79, grade: 'A-' },
      { courseCode: 'CVE 309', courseName: 'Construction Methods II', creditLoad: 2, caScore: 13, examScore: 72, grade: 'B' },
    ],
    2: [
      { courseCode: 'CVE 302', courseName: 'Structural Analysis II', creditLoad: 4, caScore: 15, examScore: 76, grade: 'B+' },
      { courseCode: 'CVE 304', courseName: 'Structural Design II', creditLoad: 3, caScore: 18, examScore: 82, grade: 'A' },
      { courseCode: 'CVE 306', courseName: 'Water Resources Engineering II', creditLoad: 3, caScore: 17, examScore: 80, grade: 'A' },
      { courseCode: 'CVE 308', courseName: 'Transportation Engineering II', creditLoad: 3, caScore: 15, examScore: 76, grade: 'B+' },
      { courseCode: 'CVE 310', courseName: 'Engineering Economics', creditLoad: 2, caScore: 16, examScore: 79, grade: 'A-' },
    ],
  },
  400: {
    1: [
      { courseCode: 'CVE 401', courseName: 'Advanced Structural Design I', creditLoad: 4, caScore: 16, examScore: 79, grade: 'A-' },
      { courseCode: 'CVE 403', courseName: 'Foundation Engineering I', creditLoad: 3, caScore: 15, examScore: 76, grade: 'B+' },
      { courseCode: 'CVE 405', courseName: 'Sustainable Infrastructure I', creditLoad: 3, caScore: 18, examScore: 81, grade: 'A' },
      { courseCode: 'CVE 407', courseName: 'Project Management I', creditLoad: 3, caScore: 17, examScore: 80, grade: 'A' },
      { courseCode: 'CVE 409', courseName: 'Research Methods', creditLoad: 2, caScore: 16, examScore: 79, grade: 'A-' },
    ],
    2: [
      { courseCode: 'CVE 402', courseName: 'Advanced Structural Design II', creditLoad: 4, caScore: 18, examScore: 82, grade: 'A' },
      { courseCode: 'CVE 404', courseName: 'Foundation Engineering II', creditLoad: 3, caScore: 16, examScore: 79, grade: 'A-' },
      { courseCode: 'CVE 406', courseName: 'Sustainable Infrastructure II', creditLoad: 3, caScore: 15, examScore: 76, grade: 'B+' },
      { courseCode: 'CVE 408', courseName: 'Project Management II', creditLoad: 3, caScore: 18, examScore: 81, grade: 'A' },
      { courseCode: 'CVE 410', courseName: 'Professional Practice', creditLoad: 2, caScore: 18, examScore: 82, grade: 'A' },
    ],
  },
  500: {
    1: [
      { courseCode: 'CVE 501', courseName: 'Thesis/Project I', creditLoad: 6, caScore: 18, examScore: 82, grade: 'A' },
      { courseCode: 'CVE 503', courseName: 'Advanced Topics in Civil Engineering I', creditLoad: 3, caScore: 16, examScore: 79, grade: 'A-' },
      { courseCode: 'CVE 505', courseName: 'Seminar I', creditLoad: 2, caScore: 18, examScore: 81, grade: 'A' },
    ],
    2: [
      { courseCode: 'CVE 502', courseName: 'Thesis/Project II', creditLoad: 6, caScore: 18, examScore: 82, grade: 'A' },
      { courseCode: 'CVE 504', courseName: 'Advanced Topics in Civil Engineering II', creditLoad: 3, caScore: 17, examScore: 81, grade: 'A' },
      { courseCode: 'CVE 506', courseName: 'Seminar II', creditLoad: 2, caScore: 16, examScore: 79, grade: 'A-' },
    ],
  },
}

const LEVELS = ['100', '200', '300', '400', '500']
const SEMESTERS = [
  { id: 1, name: 'Semester 1' },
  { id: 2, name: 'Semester 2' },
]

const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
}

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
}

function StudentResultsPage() {
  const [selectedLevel, setSelectedLevel] = useState('100')
  const [selectedSemester, setSelectedSemester] = useState(1)

  const currentResults = MOCK_RESULTS[selectedLevel]?.[selectedSemester] || []

  // Grade points mapping
  const gradePoints = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0,
  }

  const calculateSemesterGPA = () => {
    if (currentResults.length === 0) return 0

    const totalPoints = currentResults.reduce((sum, result) => {
      return sum + (gradePoints[result.grade] || 0) * result.creditLoad
    }, 0)

    const totalCredits = currentResults.reduce((sum, result) => sum + result.creditLoad, 0)

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
  }

  // Calculate CGPA across all levels and semesters
  const calculateCGPA = () => {
    let totalPoints = 0
    let totalCredits = 0

    Object.keys(MOCK_RESULTS).forEach((level) => {
      Object.keys(MOCK_RESULTS[level]).forEach((semester) => {
        const results = MOCK_RESULTS[level][semester]
        results.forEach((result) => {
          totalPoints += (gradePoints[result.grade] || 0) * result.creditLoad
          totalCredits += result.creditLoad
        })
      })
    })

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
  }

  const calculateTotalCredits = () => {
    return currentResults.reduce((sum, result) => sum + result.creditLoad, 0)
  }

  // Calculate total credits across all semesters
  const calculateTotalAllCredits = () => {
    let total = 0
    Object.keys(MOCK_RESULTS).forEach((level) => {
      Object.keys(MOCK_RESULTS[level]).forEach((semester) => {
        const results = MOCK_RESULTS[level][semester]
        total += results.reduce((sum, result) => sum + result.creditLoad, 0)
      })
    })
    return total
  }

  return (
    <motion.div
      className="mx-auto max-w-6xl px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.h1
          variants={textVariants}
          className="text-3xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Academic Results
        </motion.h1>
        <motion.p
          variants={textVariants}
          className="mt-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          View your semester results by level. Results are uploaded by the department administrator.
        </motion.p>
      </motion.div>

      {/* Summary Cards - Three Separate Cards */}
      <motion.div
        className="mb-8 grid gap-4 sm:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Semester GPA Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          className="border rounded-lg p-6 transition-all duration-200"
        >
          <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
            Semester GPA
          </p>
          <motion.p
            className="text-3xl font-bold mt-3"
            style={{ color: 'var(--color-primary)' }}
            key={`sem-gpa-${selectedLevel}-${selectedSemester}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {calculateSemesterGPA()}
          </motion.p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
            Level {selectedLevel} • Sem {selectedSemester}
          </p>
        </motion.div>

        {/* Semester Credit Units Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          className="border rounded-lg p-6 transition-all duration-200"
        >
          <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
            Semester Credit Units
          </p>
          <motion.p
            className="text-3xl font-bold mt-3"
            style={{ color: 'var(--color-secondary)' }}
            key={`sem-credits-${selectedLevel}-${selectedSemester}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {calculateTotalCredits()}
          </motion.p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
            Level {selectedLevel} • Sem {selectedSemester}
          </p>
        </motion.div>

        {/* CGPA Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          className="border rounded-lg p-6 transition-all duration-200"
        >
          <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
            Cumulative GPA (CGPA)
          </p>
          <motion.p
            className="text-3xl font-bold mt-3"
            style={{ color: calculateCGPA() >= 3.5 ? 'var(--color-primary)' : '#3b82f6' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {calculateCGPA()}
          </motion.p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
            All Levels & Semesters
          </p>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="mb-8 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Level Filter */}
        <motion.div variants={filterVariants}>
          <label className="text-sm font-semibold mb-3 block" style={{ color: 'var(--text-primary)' }}>
            Select Level
          </label>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((level) => (
              <motion.button
                key={level}
                onClick={() => setSelectedLevel(level)}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                style={{
                  backgroundColor: selectedLevel === level ? 'var(--color-primary)' : 'var(--card-bg)',
                  color: selectedLevel === level ? 'white' : 'var(--text-primary)',
                  borderColor: 'var(--border-color)',
                }}
                className="rounded-full px-4 py-2 text-sm font-medium border transition-colors duration-200"
              >
                Level {level}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Semester Filter */}
        <motion.div variants={filterVariants}>
          <label className="text-sm font-semibold mb-3 block" style={{ color: 'var(--text-primary)' }}>
            Select Semester
          </label>
          <div className="flex gap-2">
            {SEMESTERS.map((sem) => (
              <motion.button
                key={sem.id}
                onClick={() => setSelectedSemester(sem.id)}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                style={{
                  backgroundColor: selectedSemester === sem.id ? 'var(--color-primary)' : 'var(--card-bg)',
                  color: selectedSemester === sem.id ? 'white' : 'var(--text-primary)',
                  borderColor: 'var(--border-color)',
                }}
                className="rounded-full px-4 py-2 text-sm font-medium border transition-colors duration-200"
              >
                {sem.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedLevel}-${selectedSemester}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentResults.length > 0 ? (
              <div
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                className="border rounded-xl overflow-hidden transition-colors duration-200"
              >
                <table className="w-full text-sm">
                  <thead style={{ backgroundColor: 'var(--bg-tertiary)' }} className="transition-colors duration-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
                        Course Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
                        Course Name
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
                        Credit Load
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
                        CA Score
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
                        Exam Score
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
                        Total
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ borderColor: 'var(--border-color)' }}>
                    {currentResults.map((result, idx) => (
                      <motion.tr
                        key={idx}
                        custom={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        whileHover={{
                          backgroundColor: 'rgba(22, 163, 74, 0.05)',
                        }}
                        className="border-t transition-colors duration-200"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <td className="px-4 py-3 text-xs font-semibold">{result.courseCode}</td>
                        <td className="px-4 py-3 text-xs">{result.courseName}</td>
                        <td className="px-4 py-3 text-xs text-center">{result.creditLoad}</td>
                        <td className="px-4 py-3 text-xs text-center font-semibold">{result.caScore}</td>
                        <td className="px-4 py-3 text-xs text-center font-semibold">{result.examScore}</td>
                        <td className="px-4 py-3 text-xs text-center font-semibold" style={{ color: 'var(--color-primary)' }}>
                          {result.caScore + result.examScore}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <motion.span
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              backgroundColor: 'var(--color-primary)',
                              color: 'white',
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {result.grade}
                          </motion.span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
                  No results available for this semester.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* GPA Scale Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--color-primary)' }}
        className="mt-8 border-l-4 rounded p-4 transition-colors duration-200"
      >
        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          📊 GPA Scale & Classifications:
        </p>
        <div className="text-xs space-y-1" style={{ color: 'var(--text-secondary)' }}>
          <p>• <strong>1st Class:</strong> 3.50 - 4.00 | <strong>2:1 Division:</strong> 3.00 - 3.49 | <strong>2:2 Division:</strong> 2.00 - 2.99 | <strong>Pass:</strong> 1.00 - 1.99</p>
          <p>• CGPA is calculated cumulatively across all levels and semesters.</p>
          <p>• Semester GPA reflects performance only in the selected semester.</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StudentResultsPage

