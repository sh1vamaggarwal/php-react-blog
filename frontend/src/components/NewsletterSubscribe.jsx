import { useState } from 'react'
import { Button, TextField, Typography } from '@snowball-tech/fractal'
import { newsletterApi } from '../services/api'

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await newsletterApi.subscribe({ email })
      setMessage({ type: 'success', text: response.data.message })
      setEmail('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Subscription failed. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>
        Subscribe to get the latest posts delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p style={{
          marginTop: '0.5rem',
          fontSize: '0.875rem',
          color: message.type === 'success' ? '#10b981' : '#ef4444',
        }}>
          {message.text}
        </p>
      )}
    </div>
  )
}
