import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi } from '../services/api'

export default function CommentSection({ blogSlug }) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: '',
  })
  const [message, setMessage] = useState(null)

  const { data: comments } = useQuery({
    queryKey: ['comments', blogSlug],
    queryFn: () => commentApi.getByBlog(blogSlug),
  })

  const mutation = useMutation({
    mutationFn: (data) => commentApi.create(blogSlug, data),
    onSuccess: (response) => {
      setMessage({ type: 'success', text: response.data.message })
      setFormData({ author_name: '', author_email: '', content: '' })
      queryClient.invalidateQueries(['comments', blogSlug])
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to post comment',
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Comments ({comments?.data?.length || 0})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          Leave a Comment
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.author_email}
            onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
            }}
          />
        </div>

        <textarea
          placeholder="Your Comment"
          required
          rows="4"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
            resize: 'vertical',
          }}
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: '600',
            cursor: mutation.isPending ? 'not-allowed' : 'pointer',
            opacity: mutation.isPending ? 0.6 : 1,
          }}
        >
          {mutation.isPending ? 'Posting...' : 'Post Comment'}
        </button>

        {message && (
          <p style={{
            marginTop: '1rem',
            color: message.type === 'success' ? '#10b981' : '#ef4444',
          }}>
            {message.text}
          </p>
        )}
      </form>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {comments?.data?.map((comment) => (
          <div key={comment.id} style={{
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '600' }}>{comment.author_name}</span>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{comment.content}</p>

            {/* Replies */}
            {comment.replies?.length > 0 && (
              <div style={{ marginTop: '1rem', marginLeft: '2rem', paddingLeft: '1rem', borderLeft: '2px solid #e5e7eb' }}>
                {comment.replies.map((reply) => (
                  <div key={reply.id} style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{reply.author_name}</span>
                      <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                        {new Date(reply.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.6' }}>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
