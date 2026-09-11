import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import JobDetailsPage from './pages/JobDetailsPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PlaceholderDashboard from './pages/PlaceholderDashboard'
import ProfilePage from './pages/ProfilePage'
import RecruiterDashboard from './pages/RecruiterDashboard'
import RegisterPage from './pages/RegisterPage'
import StudentDashboard from './pages/StudentDashboard'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/mentor" element={<PlaceholderDashboard />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}