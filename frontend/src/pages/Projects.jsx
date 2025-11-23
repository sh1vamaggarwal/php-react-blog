import { useQuery } from '@tanstack/react-query'
import { projectApi } from '../services/api'

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.getAll(),
  })

  if (isLoading) {
    return <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading...</div>
  }

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Projects</h1>
      <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        Here are some of the projects I've worked on. Each project showcases different skills and technologies.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem',
      }}>
        {projects?.data?.map((project) => (
          <div
            key={project.id}
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              transition: 'transform 0.2s',
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
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {project.title}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>
                {project.description}
              </p>

              {/* Technologies */}
              {project.technologies && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#f3f4f6',
                        color: '#4b5563',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#4F46E5',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                    }}
                  >
                    View Project
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f3f4f6',
                      color: '#4b5563',
                      textDecoration: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                    }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
