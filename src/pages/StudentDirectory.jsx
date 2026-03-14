import { useState } from 'react'
import Card from '../components/Card.jsx'

const MOCK_STUDENTS = [
  { id: 1, name: 'Adaeze Nwachukwu', matric: 'CVE/21/001', level: '100' },
  { id: 2, name: 'John Ibrahim', matric: 'CVE/20/104', level: '200' },
  { id: 3, name: 'Fatima Bello', matric: 'CVE/19/055', level: '300' },
  { id: 4, name: 'Emeka Udo', matric: 'CVE/18/022', level: '400' },
]

const LEVELS = ['All', '100', '200', '300', '400']

function StudentDirectoryPage() {
  const [activeLevel, setActiveLevel] = useState('All')

  const filtered =
    activeLevel === 'All'
      ? MOCK_STUDENTS
      : MOCK_STUDENTS.filter((student) => student.level === activeLevel)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Student Directory</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Browse students by level and view basic details.
          </p>
        </div>
        <div className="flex gap-2 rounded-full p-1 text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          {LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setActiveLevel(level)}
              style={{
                backgroundColor: activeLevel === level ? 'var(--color-primary)' : 'transparent',
                color: activeLevel === level ? 'white' : 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }}
              className="rounded-full px-3 py-1.5 transition-colors border"
            >
              {level === 'All' ? 'All levels' : `${level} level`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((student) => (
          <Card key={student.id} className="p-4 text-sm">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{student.name}</p>
            <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>Matric: {student.matric}</p>
            <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>Level: {student.level} level</p>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-xs" style={{ color: 'var(--text-secondary)' }}>
            No students found for this level.
          </p>
        )}
      </div>
    </div>
  )
}

export default StudentDirectoryPage

