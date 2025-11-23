import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { contactApi } from '../services/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [responseMessage, setResponseMessage] = useState(null)

  const mutation = useMutation({
    mutationFn: (data) => contactApi.submit(data),
    onSuccess: (response) => {
      setResponseMessage({ type: 'success', text: response.data.message })
      setFormData({ name: '', email: '', subject: '', message: '' })
    },
    onError: (error) => {
      setResponseMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to send message. Please try again.',
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '768px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Get in Touch
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        Have a question or want to work together? Feel free to reach out!
      </p>

      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              resize: 'vertical',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: mutation.isPending ? 'not-allowed' : 'pointer',
            opacity: mutation.isPending ? 0.6 : 1,
          }}
        >
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </button>

        {responseMessage && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: responseMessage.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: responseMessage.type === 'success' ? '#065f46' : '#991b1b',
            borderRadius: '0.375rem',
          }}>
            {responseMessage.text}
          </div>
        )}
      </form>
    </div>
  )
}
