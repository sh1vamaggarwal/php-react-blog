import { Link } from 'react-router-dom'
export default function AdminBlogs() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Blogs</h1>
        <Link to="/admin/blogs/new" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4F46E5', color: 'white', textDecoration: 'none', borderRadius: '0.375rem', fontWeight: '600' }}>
          New Blog
        </Link>
      </div>
      <p>Blog management interface - implement full CRUD operations</p>
    </div>
  )
}
