import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from '@snowball-tech/fractal'
import NewsletterSubscribe from './NewsletterSubscribe'

export default function Layout() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
      }}>
        <nav style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link to="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#1f2937',
          }}>
            My Portfolio
          </Link>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: isActive('/') ? '#4F46E5' : '#4b5563',
                fontWeight: isActive('/') ? '600' : '400',
              }}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              style={{
                textDecoration: 'none',
                color: isActive('/blogs') ? '#4F46E5' : '#4b5563',
                fontWeight: isActive('/blogs') ? '600' : '400',
              }}
            >
              Blog
            </Link>
            <Link
              to="/projects"
              style={{
                textDecoration: 'none',
                color: isActive('/projects') ? '#4F46E5' : '#4b5563',
                fontWeight: isActive('/projects') ? '600' : '400',
              }}
            >
              Projects
            </Link>
            <Link
              to="/about"
              style={{
                textDecoration: 'none',
                color: isActive('/about') ? '#4F46E5' : '#4b5563',
                fontWeight: isActive('/about') ? '600' : '400',
              }}
            >
              About
            </Link>
            <Link
              to="/contact"
              style={{
                textDecoration: 'none',
                color: isActive('/contact') ? '#4F46E5' : '#4b5563',
                fontWeight: isActive('/contact') ? '600' : '400',
              }}
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}>
            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                About
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                A personal blog and portfolio showcasing my projects and thoughts on web development.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                Quick Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/blogs" style={{ color: '#6b7280', textDecoration: 'none' }}>Blog</Link>
                <Link to="/projects" style={{ color: '#6b7280', textDecoration: 'none' }}>Projects</Link>
                <Link to="/about" style={{ color: '#6b7280', textDecoration: 'none' }}>About</Link>
                <Link to="/contact" style={{ color: '#6b7280', textDecoration: 'none' }}>Contact</Link>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                Newsletter
              </h3>
              <NewsletterSubscribe />
            </div>
          </div>

          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            textAlign: 'center',
            color: '#6b7280',
          }}>
            <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
