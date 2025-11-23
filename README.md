# Laravel CMS with React Frontend

A full-featured Content Management System built with Laravel 11 (backend API) and React 18 (frontend) using the Snowball Fractal UI library. This CMS includes a blog, projects portfolio, contact form, comments system, and newsletter subscription.

## Features

### Public Features
- 📝 **Blog System** with markdown support, tagging, and filtering
- 🎨 **Projects Portfolio** showcase
- 👤 **About Me** page with skills and social links
- 📧 **Contact Form** with email notifications
- 💬 **Comment System** with nested replies
- 📰 **Newsletter Subscription**
- 🔍 **Search and Filtering** by tags
- 📱 **Responsive Design** using Fractal UI components

### Admin Features
- 🔐 **Secure Authentication** using Laravel Sanctum
- 📊 **Dashboard** with statistics and recent activity
- ✍️ **Blog Management** (CRUD operations with markdown editor)
- 🚀 **Project Management** (CRUD operations)
- 🏷️ **Tag Management**
- 💬 **Comment Moderation**
- 📧 **Contact Message Inbox**
- 📰 **Newsletter Subscriber Management**
- ✏️ **About Me Editor**

## Tech Stack

### Backend
- Laravel 11.x
- MySQL Database
- Laravel Sanctum (API Authentication)
- Image Upload Handling

### Frontend
- React 18
- Vite (Build Tool)
- Snowball Fractal UI Library
- Panda CSS
- React Router v6
- TanStack Query (React Query)
- Zustand (State Management)
- React Markdown
- Syntax Highlighting

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18 or higher
- MySQL Database

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Configure your database and other settings in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_cms
DB_USERNAME=root
DB_PASSWORD=your_password

FRONTEND_URL=http://localhost:5173

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password

MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=hello@example.com
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run migrations and seeders:
```bash
php artisan migrate --seed
```

7. Create storage symbolic link:
```bash
php artisan storage:link
```

8. Start the development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Configure API URL in `.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

5. Generate Panda CSS:
```bash
npm run prepare
```

6. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Default Admin Credentials

After running the seeder, you can login to the admin panel with:
- **Email**: admin@example.com (or the email you set in `.env`)
- **Password**: password (or the password you set in `.env`)

## Deployment to Hostinger

### Prerequisites
1. Hostinger hosting account with:
   - PHP 8.2+
   - MySQL database
   - SSH access (recommended)
   - FTP access

### Setup Steps

1. **Create MySQL Database** on Hostinger
   - Note down database name, username, and password

2. **Configure GitHub Secrets** for GitHub Actions:
   - `FTP_SERVER`: Your Hostinger FTP server
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password
   - `SSH_HOST`: Your Hostinger SSH host
   - `SSH_USERNAME`: Your SSH username
   - `SSH_PRIVATE_KEY`: Your SSH private key
   - `VITE_API_URL`: Your production API URL

3. **Upload `.env` file** to your Hostinger hosting (via FTP or File Manager):
   - Configure production database credentials
   - Set `APP_ENV=production`
   - Set `APP_DEBUG=false`
   - Configure mail settings
   - Set your production URL

4. **Push to main branch** - GitHub Actions will automatically:
   - Install dependencies
   - Build the frontend
   - Deploy via FTP
   - Run migrations

5. **Set Document Root** in Hostinger:
   - Point to `/public_html/backend/public`

### Manual Deployment (Alternative)

1. Build frontend locally:
```bash
cd frontend
npm run build
```

2. Upload files via FTP:
   - Upload `backend/` folder contents
   - Upload `frontend/dist/` contents to `backend/public/dist/`

3. Run migrations via SSH:
```bash
cd public_html
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```

## API Documentation

### Public Endpoints

```
GET  /api/v1/blogs              - List all blogs (with pagination, search, filter by tags)
GET  /api/v1/blogs/{slug}       - Get single blog
GET  /api/v1/blogs/{slug}/related - Get related blogs

GET  /api/v1/tags               - List all tags
GET  /api/v1/tags/popular       - Get popular tags

GET  /api/v1/projects           - List all projects
GET  /api/v1/projects/featured  - Get featured projects
GET  /api/v1/projects/{slug}    - Get single project

GET  /api/v1/about              - Get about me content

POST /api/v1/contact            - Submit contact form

GET  /api/v1/blogs/{slug}/comments - Get blog comments
POST /api/v1/blogs/{slug}/comments - Post a comment

POST /api/v1/newsletter/subscribe    - Subscribe to newsletter
GET  /api/v1/newsletter/unsubscribe/{token} - Unsubscribe from newsletter
```

### Admin Endpoints (Protected)

```
POST /api/admin/login           - Admin login
POST /api/admin/logout          - Admin logout
GET  /api/admin/me              - Get current admin user

GET  /api/admin/dashboard/stats - Get dashboard statistics
GET  /api/admin/dashboard/recent - Get recent activity

CRUD /api/admin/blogs           - Blog management
CRUD /api/admin/projects        - Project management
CRUD /api/admin/tags            - Tag management

GET  /api/admin/about           - Get about content
PUT  /api/admin/about           - Update about content

GET    /api/admin/contacts      - List contact messages
GET    /api/admin/contacts/{id} - Get single contact message
PATCH  /api/admin/contacts/{id}/read - Mark as read
DELETE /api/admin/contacts/{id} - Delete contact message

GET    /api/admin/comments      - List comments
PATCH  /api/admin/comments/{id}/status - Update comment status
DELETE /api/admin/comments/{id} - Delete comment

GET    /api/admin/newsletter    - List subscribers
DELETE /api/admin/newsletter/{id} - Delete subscriber
```

## Project Structure

```
.
├── backend/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── API/       # Public API controllers
│   │   │   │   └── Admin/     # Admin API controllers
│   │   │   └── Resources/     # API Resources
│   │   ├── Models/            # Eloquent Models
│   │   └── Mail/              # Mail classes
│   ├── database/
│   │   ├── migrations/        # Database migrations
│   │   └── seeders/           # Database seeders
│   ├── routes/
│   │   ├── api.php            # API routes
│   │   └── web.php            # Web routes
│   └── storage/
│       └── app/public/images/ # Uploaded images
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── admin/         # Admin components
│   │   │   ├── Layout.jsx
│   │   │   └── ...
│   │   ├── pages/             # Page components
│   │   │   ├── admin/         # Admin pages
│   │   │   ├── Home.jsx
│   │   │   ├── BlogList.jsx
│   │   │   └── ...
│   │   ├── services/          # API services
│   │   ├── store/             # Zustand stores
│   │   └── styles/            # Global styles
│   └── public/                # Static assets
│
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions workflow
```

## Features Implementation Status

✅ **Completed:**
- Laravel backend API with all endpoints
- Database schema and migrations
- Authentication system
- Blog system with tags and filtering
- Projects portfolio
- Contact form with email
- Comment system
- Newsletter subscription
- React frontend structure
- Public pages (Home, Blog, Projects, About, Contact)
- Admin login and dashboard
- Responsive layout

🚧 **Needs Full Implementation:**
- Complete admin CRUD forms with image upload UI
- Rich markdown editor component
- Complete comment moderation UI
- Newsletter management UI
- Tag management UI
- Error handling and loading states
- Form validation UI feedback
- Image preview and cropping
- Pagination UI components

## Development

### Running Tests

Backend:
```bash
cd backend
php artisan test
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Contributing

This is a personal project, but feel free to fork and customize for your own use.

## License

This project is open-sourced software licensed under the MIT license.

## Support

For issues, questions, or contributions, please open an issue in the GitHub repository.

---

Built with ❤️ using Laravel, React, and Fractal UI
