import { Link } from 'react-router-dom'
export default function AdminProjects() {
  return <div><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}><h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Projects</h1><Link to="/admin/projects/new" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4F46E5', color: 'white', textDecoration: 'none', borderRadius: '0.375rem', fontWeight: '600' }}>New Project</Link></div><p>Project management interface</p></div>
}
