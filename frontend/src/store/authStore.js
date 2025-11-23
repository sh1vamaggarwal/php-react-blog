import { create } from 'zustand'
import { authApi } from '../services/api'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('auth_token') || null,
  isAuthenticated: !!localStorage.getItem('auth_token'),

  login: async (credentials) => {
    try {
      const response = await authApi.login(credentials)
      const { user, token } = response.data

      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))

      set({ user, token, isAuthenticated: true })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      }
    }
  },

  logout: async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      set({ user: null, token: null, isAuthenticated: false })
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      set({ user: null, token: null, isAuthenticated: false })
      return false
    }

    try {
      const response = await authApi.me()
      set({ user: response.data.user, isAuthenticated: true })
      return true
    } catch (error) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      set({ user: null, token: null, isAuthenticated: false })
      return false
    }
  },
}))

export default useAuthStore
