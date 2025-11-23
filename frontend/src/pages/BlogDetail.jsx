import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { blogApi, commentApi } from '../services/api'
import CommentSection from '../components/CommentSection'

export default function BlogDetail() {
  const { slug } = useParams()

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogApi.getBySlug(slug),
  })

  const { data: relatedBlogs } = useQuery({
    queryKey: ['related-blogs', slug],
    queryFn: () => blogApi.getRelated(slug),
  })

  if (isLoading) {
    return <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!blog) {
    return <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>Blog not found</div>
  }

  const blogData = blog.data

  return (
    <div>
      {/* Hero */}
      <div style={{
        padding: '4rem 2rem',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {blogData.tags?.map((tag) => (
              <span
                key={tag.id}
                style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: tag.color + '20',
                  color: tag.color,
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {blogData.title}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            <span>By {blogData.author.name}</span>
            <span>•</span>
            <span>{new Date(blogData.published_at).toLocaleDateString()}</span>
            <span>•</span>
            <span>{blogData.reading_time} min read</span>
            <span>•</span>
            <span>{blogData.views} views</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article style={{ padding: '4rem 2rem', maxWidth: '768px', margin: '0 auto' }}>
        {blogData.featured_image && (
          <img
            src={blogData.featured_image}
            alt={blogData.title}
            style={{
              width: '100%',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
            }}
          />
        )}

        <div style={{ lineHeight: '1.8', fontSize: '1.125rem', color: '#374151' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {blogData.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Comments */}
      <div style={{ padding: '2rem', maxWidth: '768px', margin: '0 auto', borderTop: '1px solid #e5e7eb' }}>
        <CommentSection blogSlug={slug} />
      </div>

      {/* Related Blogs */}
      {relatedBlogs?.data?.length > 0 && (
        <div style={{ padding: '4rem 2rem', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              Related Posts
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {relatedBlogs.data.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blogs/${relatedBlog.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                  }}
                >
                  {relatedBlog.featured_image && (
                    <img
                      src={relatedBlog.featured_image}
                      alt={relatedBlog.title}
                      style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                      {relatedBlog.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
