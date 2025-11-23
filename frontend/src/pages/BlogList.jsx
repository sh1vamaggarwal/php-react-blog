import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { blogApi, tagApi } from '../services/api'

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || []

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs', { search: searchParams.get('search'), tags: searchParams.get('tags') }],
    queryFn: () => blogApi.getAll({
      search: searchParams.get('search'),
      tags: searchParams.get('tags'),
    }),
  })

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => tagApi.getAll(),
  })

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const toggleTag = (tagId) => {
    const params = new URLSearchParams(searchParams)
    const currentTags = params.get('tags')?.split(',').filter(Boolean) || []

    if (currentTags.includes(String(tagId))) {
      const newTags = currentTags.filter(id => id !== String(tagId))
      if (newTags.length > 0) {
        params.set('tags', newTags.join(','))
      } else {
        params.delete('tags')
      }
    } else {
      params.set('tags', [...currentTags, tagId].join(','))
    }
    setSearchParams(params)
  }

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>Blog</h1>

      {/* Search and Filters */}
      <div style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>

        {/* Tags Filter */}
        {tags?.data && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#6b7280' }}>Filter by tags:</span>
            {tags.data.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: selectedTags.includes(String(tag.id)) ? tag.color : '#f3f4f6',
                  color: selectedTags.includes(String(tag.id)) ? 'white' : '#4b5563',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Blog List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : blogs?.data?.data?.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '3rem' }}>
          No blogs found matching your criteria.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
        }}>
          {blogs?.data?.data?.map((blog) => (
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
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: tag.color + '20',
                        color: tag.color,
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {blog.title}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {blog.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#9ca3af' }}>
                  <span>{blog.reading_time} min read</span>
                  <span>{blog.views} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
