import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@snowball-tech/fractal'

// Public Pages
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'

// Admin Pages
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminBlogs from './pages/admin/Blogs'
import AdminBlogForm from './pages/admin/BlogForm'
import AdminProjects from './pages/admin/Projects'
import AdminProjectForm from './pages/admin/ProjectForm'
import AdminAbout from './pages/admin/About'
import AdminComments from './pages/admin/Comments'
import AdminContacts from './pages/admin/Contacts'
import AdminNewsletter from './pages/admin/Newsletter'
import AdminTags from './pages/admin/Tags'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/:slug" element={<BlogDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/new" element={<AdminBlogForm />} />
            <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<AdminProjectForm />} />
            <Route path="projects/:id/edit" element={<AdminProjectForm />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="comments" element={<AdminComments />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="newsletter" element={<AdminNewsletter />} />
            <Route path="tags" element={<AdminTags />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
