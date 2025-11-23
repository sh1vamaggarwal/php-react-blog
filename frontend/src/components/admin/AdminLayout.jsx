import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const isActive = (path) => location.pathname.startsWith(path)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '2rem 0',
      }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CMS Admin</h2>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{user?.name}</p>
        </div>

        <nav>
          <Link
            to="/admin"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin') && location.pathname === '/admin' ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin') && location.pathname === '/admin' ? '#374151' : 'transparent',
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/blogs"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin/blogs') ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin/blogs') ? '#374151' : 'transparent',
            }}
          >
            Blogs
          </Link>
          <Link
            to="/admin/projects"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin/projects') ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin/projects') ? '#374151' : 'transparent',
            }}
          >
            Projects
          </Link>
          <Link
            to="/admin/tags"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin/tags') ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin/tags') ? '#374151' : 'transparent',
            }}
          >
            Tags
          </Link>
          <Link
            to="/admin/comments"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin/comments') ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin/comments') ? '#374151' : 'transparent',
            }}
          >
            Comments
          </Link>
          <Link
            to="/admin/contacts"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin/contacts') ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin/contacts') ? '#374151' : 'transparent',
            }}
          >
            Contact Messages
          </Link>
          <Link
            to="/admin/newsletter"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin/newsletter') ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin/newsletter') ? '#374151' : 'transparent',
            }}
          >
            Newsletter
          </Link>
          <Link
            to="/admin/about"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              color: isActive('/admin/about') ? '#fff' : '#d1d5db',
              textDecoration: 'none',
              backgroundColor: isActive('/admin/about') ? '#374151' : 'transparent',
            }}
          >
            About Me
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1.5rem',
              color: '#d1d5db',
              textDecoration: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: '#f9fafb', padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}
