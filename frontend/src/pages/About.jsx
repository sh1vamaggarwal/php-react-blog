import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { aboutApi } from '../services/api'

export default function About() {
  const { data: about, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: () => aboutApi.get(),
  })

  if (isLoading) {
    return <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!about?.data) {
    return <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>Content not found</div>
  }

  const aboutData = about.data

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1024px', margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem',
      }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {aboutData.title}
          </h1>
          {aboutData.profile_image && (
            <img
              src={aboutData.profile_image}
              alt="Profile"
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '0.5rem',
                marginTop: '1rem',
              }}
            />
          )}
        </div>

        <div style={{ lineHeight: '1.8', fontSize: '1.125rem', color: '#374151' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {aboutData.content}
          </ReactMarkdown>

          {/* Social Links */}
          {aboutData.social_links && Object.keys(aboutData.social_links).length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Connect with me
              </h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {Object.entries(aboutData.social_links).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f3f4f6',
                      color: '#4b5563',
                      textDecoration: 'none',
                      borderRadius: '0.375rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Resume */}
          {aboutData.resume_url && (
            <div style={{ marginTop: '2rem' }}>
              <a
                href={aboutData.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                }}
              >
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      {aboutData.skills && aboutData.skills.length > 0 && (
        <div style={{
          padding: '2rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Skills & Technologies
          </h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {aboutData.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
