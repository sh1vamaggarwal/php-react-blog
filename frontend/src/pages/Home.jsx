import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { blogApi, projectApi } from '../services/api'

export default function Home() {
  const { data: blogs } = useQuery({
    queryKey: ['blogs', { per_page: 6 }],
    queryFn: () => blogApi.getAll({ per_page: 6 }),
  })

  const { data: projects } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => projectApi.getFeatured(),
  })

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Welcome to My Blog & Portfolio
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Full Stack Developer | Tech Blogger | Open Source Contributor
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/blogs" style={{
              padding: '0.75rem 2rem',
              backgroundColor: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
            }}>
              Read My Blog
            </Link>
            <Link to="/projects" style={{
              padding: '0.75rem 2rem',
              backgroundColor: 'transparent',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              border: '2px solid white',
            }}>
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Recent Blog Posts</h2>
          <Link to="/blogs" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: '600' }}>
            View All →
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
        }}>
          {blogs?.data?.data?.slice(0, 6).map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
              }}
            >
              {blog.featured_image && (
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {blog.title}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {blog.excerpt}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: tag.color + '20',
                        color: tag.color,
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      {projects?.data?.length > 0 && (
        <section style={{ padding: '4rem 2rem', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Featured Projects</h2>
              <Link to="/projects" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: '600' }}>
                View All →
              </Link>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem',
            }}>
              {projects.data.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                  }}
                >
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#e5e7eb',
                            color: '#4b5563',
                            borderRadius: '0.25rem',
                            fontSize: '0.875rem',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
