import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { adminDashboardApi } from '../../services/api'

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => adminDashboardApi.getStats(),
  })

  const { data: recentActivity } = useQuery({
    queryKey: ['dashboard-recent'],
    queryFn: () => adminDashboardApi.getRecentActivity(),
  })

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Dashboard
      </h1>

      {/* Stats Grid */}
      {stats?.data && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Total Blogs
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.data.blogs.total}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {stats.data.blogs.published} published, {stats.data.blogs.draft} drafts
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Projects
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.data.projects.total}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {stats.data.projects.published} published
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Comments
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.data.comments.total}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {stats.data.comments.pending} pending approval
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Contact Messages
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.data.contacts.total}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {stats.data.contacts.unread} unread
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Newsletter Subscribers
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.data.newsletter.total}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {stats.data.newsletter.active} active
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/admin/blogs/new"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4F46E5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontWeight: '600',
            }}
          >
            New Blog Post
          </Link>
          <Link
            to="/admin/projects/new"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontWeight: '600',
            }}
          >
            New Project
          </Link>
          <Link
            to="/admin/comments"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f59e0b',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontWeight: '600',
            }}
          >
            Review Comments
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      {recentActivity?.data && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Recent Activity
          </h2>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Recent Blog Posts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recentActivity.data.recent_blogs?.slice(0, 5).map((blog) => (
                <li key={blog.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                  <Link to={`/admin/blogs/${blog.id}/edit`} style={{ textDecoration: 'none', color: '#4b5563' }}>
                    {blog.title}
                  </Link>
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af', marginLeft: '0.5rem' }}>
                    ({blog.status})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
