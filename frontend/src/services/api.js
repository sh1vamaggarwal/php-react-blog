import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Public API
export const blogApi = {
  getAll: (params) => api.get('/v1/blogs', { params }),
  getBySlug: (slug) => api.get(`/v1/blogs/${slug}`),
  getRelated: (slug) => api.get(`/v1/blogs/${slug}/related`),
}

export const tagApi = {
  getAll: () => api.get('/v1/tags'),
  getPopular: () => api.get('/v1/tags/popular'),
}

export const projectApi = {
  getAll: () => api.get('/v1/projects'),
  getFeatured: () => api.get('/v1/projects/featured'),
  getBySlug: (slug) => api.get(`/v1/projects/${slug}`),
}

export const aboutApi = {
  get: () => api.get('/v1/about'),
}

export const contactApi = {
  submit: (data) => api.post('/v1/contact', data),
}

export const commentApi = {
  getByBlog: (slug) => api.get(`/v1/blogs/${slug}/comments`),
  create: (slug, data) => api.post(`/v1/blogs/${slug}/comments`, data),
}

export const newsletterApi = {
  subscribe: (data) => api.post('/v1/newsletter/subscribe', data),
  unsubscribe: (token) => api.get(`/v1/newsletter/unsubscribe/${token}`),
}

// Admin API
export const authApi = {
  login: (credentials) => api.post('/admin/login', credentials),
  logout: () => api.post('/admin/logout'),
  me: () => api.get('/admin/me'),
}

export const adminBlogApi = {
  getAll: (params) => api.get('/admin/blogs', { params }),
  getById: (id) => api.get(`/admin/blogs/${id}`),
  create: (data) => api.post('/admin/blogs', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.post(`/admin/blogs/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/admin/blogs/${id}`),
}

export const adminProjectApi = {
  getAll: (params) => api.get('/admin/projects', { params }),
  getById: (id) => api.get(`/admin/projects/${id}`),
  create: (data) => api.post('/admin/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.post(`/admin/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/admin/projects/${id}`),
}

export const adminTagApi = {
  getAll: () => api.get('/admin/tags'),
  create: (data) => api.post('/admin/tags', data),
  update: (id, data) => api.put(`/admin/tags/${id}`, data),
  delete: (id) => api.delete(`/admin/tags/${id}`),
}

export const adminAboutApi = {
  get: () => api.get('/admin/about'),
  update: (data) => api.put('/admin/about', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
}

export const adminCommentApi = {
  getAll: (params) => api.get('/admin/comments', { params }),
  updateStatus: (id, status) => api.patch(`/admin/comments/${id}/status`, { status }),
  delete: (id) => api.delete(`/admin/comments/${id}`),
}

export const adminContactApi = {
  getAll: (params) => api.get('/admin/contacts', { params }),
  getById: (id) => api.get(`/admin/contacts/${id}`),
  markAsRead: (id) => api.patch(`/admin/contacts/${id}/read`),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
}

export const adminNewsletterApi = {
  getAll: (params) => api.get('/admin/newsletter', { params }),
  delete: (id) => api.delete(`/admin/newsletter/${id}`),
}

export const adminDashboardApi = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getRecentActivity: () => api.get('/admin/dashboard/recent'),
}

export default api
