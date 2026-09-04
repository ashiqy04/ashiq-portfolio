import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { loggedIn, initializing } = useAuth()
  if (initializing) return null // avoid flashing a redirect before Firebase resolves auth state
  if (!loggedIn) return <Navigate to="/admin/login" replace />
  return children
}
