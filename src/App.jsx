import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'
import FormBuilderDashboard from './pages/FormBuilderDashboard'
import Settings from './pages/Settings'
import Widgets from './pages/Widgets'
import WidgetDetail from './pages/WidgetDetail'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<FormBuilderDashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="widgets" element={<Widgets />} />
          <Route path="widgets/:id" element={<WidgetDetail />} />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

