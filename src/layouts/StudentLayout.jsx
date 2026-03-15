import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import DashboardLayout from './DashboardLayout.jsx'

const studentLinks = [
  { to: '/student', label: 'Overview' },
  { to: '/student/announcements', label: 'Announcements' },
  { to: '/student/results', label: 'Results' },
  { to: '/student/profile', label: 'Profile' },
]

const titlesByPath = {
  '/student': 'Student Dashboard',
  '/student/announcements': 'Student Announcements',
  '/student/results': 'Student Results',
  '/student/profile': 'Student Profile',
}

function StudentLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const title = titlesByPath[location.pathname] || 'Student'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <DashboardLayout links={studentLinks} title={title} onLogout={handleLogout}>
      <Outlet />
    </DashboardLayout>
  )
}

export default StudentLayout

