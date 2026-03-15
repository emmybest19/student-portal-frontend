import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import StudentLayout from './layouts/StudentLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import HomePage from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import AchievementsPage from './pages/Achievements.jsx'
import LecturerDirectoryPage from './pages/LecturerDirectory.jsx'
import StudentDirectoryPage from './pages/StudentDirectory.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'
import ForgotPasswordPage from './pages/ForgotPassword.jsx'
import StudentDashboardPage from './pages/StudentDashboard.jsx'
import StudentAnnouncementsPage from './pages/StudentAnnouncements.jsx'
import StudentResultsPage from './pages/StudentResults.jsx'
import StudentProfilePage from './pages/StudentProfile.jsx'
import AdminLecturersPage from './pages/AdminLecturers.jsx'
import AdminStudentsPage from './pages/AdminStudents.jsx'
import AdminResultsUploadPage from './pages/AdminResultsUpload.jsx'
import AdminAnnouncementsPage from './pages/AdminAnnouncements.jsx'
import AdminAchievementsPage from './pages/AdminAchievements.jsx'
import AdminWorksPage from './pages/AdminWorks.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/lecturers"
          element={
            <MainLayout>
              <LecturerDirectoryPage />
            </MainLayout>
          }
        />
        <Route
          path="/achievements"
          element={
            <MainLayout>
              <AchievementsPage />
            </MainLayout>
          }
        />
        {/* <Route
          path="/students"
          element={
            <MainLayout>
              <StudentDirectoryPage />
            </MainLayout>
          }
        /> */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="announcements" element={<StudentAnnouncementsPage />} />
          <Route path="results" element={<StudentResultsPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="lecturers" element={<AdminLecturersPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="results" element={<AdminResultsUploadPage />} />
          <Route path="announcements" element={<AdminAnnouncementsPage />} />
          <Route path="achievements" element={<AdminAchievementsPage />} />
          <Route path="works" element={<AdminWorksPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
