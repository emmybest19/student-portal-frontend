import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import DashboardLayout from './DashboardLayout.jsx'

const adminLinks = [
  { to: '/admin/lecturers', label: 'Manage lecturers' },
  { to: '/admin/students', label: 'Manage students' },
  { to: '/admin/results', label: 'Upload results' },
  { to: '/admin/announcements', label: 'Announcements' },
  { to: '/admin/achievements', label: 'Achievements' },
  { to: '/admin/works', label: 'Departmental works' },
]

const titlesByPath = {
  '/admin/lecturers': 'Manage Lecturers',
  '/admin/students': 'Manage Students',
  '/admin/results': 'Upload Results',
  '/admin/announcements': 'Manage Announcements',
  '/admin/achievements': 'Manage Achievements',
  '/admin/works': 'Manage Departmental Works',
}

function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const title = titlesByPath[location.pathname] || 'Admin Dashboard'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <DashboardLayout links={adminLinks} title={title} onLogout={handleLogout}>
      <Outlet />
    </DashboardLayout>
  )
}

export default AdminLayout

