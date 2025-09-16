# Weekly Blog - Full-Stack Blog with CMS

A modern, full-stack blog application with a powerful CMS built using Strapi (backend) and Next.js (frontend).

## 🚀 Features

### CMS (Content Management System)
- **Rich Text Editor** with media support
- **User Management** - Add multiple admins
- **Content Types**: Blogs, Categories, Tags
- **Media Library** with Cloudinary integration
- **SEO-friendly** URLs and meta tags
- **Draft & Publish** workflow
- **Featured Posts** system

### Frontend Blog
- **Responsive Design** - Works on all devices
- **Featured Posts** on homepage
- **Category & Tag** filtering
- **Search Functionality**
- **Fast Loading** with Next.js SSG/ISR
- **SEO Optimized**
- **Modern UI** with Tailwind CSS

## 🏗️ Tech Stack

**Backend (CMS):**
- Strapi v4 (Headless CMS)
- PostgreSQL (Production) / SQLite (Development)
- Cloudinary (Media Storage)

**Frontend:**
- Next.js 14 (React Framework)
- Tailwind CSS (Styling)
- React Markdown (Content Rendering)

**Hosting:**
- **Backend**: Railway.app or Render.com
- **Frontend**: Vercel
- **Database**: PostgreSQL (included with hosting)
- **Media**: Cloudinary (free tier)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd weekly-blog
```

### 2. Backend Setup (Strapi CMS)
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
# (For development, you can use the default SQLite database)

# Start development server
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

**First Time Setup:**
1. Create your admin account
2. Go to Settings > Users & Permissions > Roles
3. Configure public permissions for blogs, categories, tags (read access)
4. Create your first blog post!

### 3. Frontend Setup (Next.js)
```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local if needed (default should work for development)
# STRAPI_API_URL=http://localhost:1337

# Start development server
npm run dev
```

The blog will be available at `http://localhost:3000`

## 📦 Deployment Guide

### Step 1: Deploy Backend (Strapi) to Railway

1. **Sign up for Railway**: [railway.app](https://railway.app)

2. **Create a new project** and connect your GitHub repository

3. **Configure environment variables** in Railway dashboard:
   ```
   NODE_ENV=production
   APP_KEYS=your-secret-key-1,your-secret-key-2
   API_TOKEN_SALT=your-api-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   JWT_SECRET=your-jwt-secret

   # Database (Railway provides these automatically)
   DATABASE_CLIENT=postgres
   DATABASE_HOST=${{ PGHOST }}
   DATABASE_PORT=${{ PGPORT }}
   DATABASE_NAME=${{ PGDATABASE }}
   DATABASE_USERNAME=${{ PGUSER }}
   DATABASE_PASSWORD=${{ PGPASSWORD }}
   DATABASE_SSL=true

   # Cloudinary (get from cloudinary.com)
   CLOUDINARY_NAME=your-cloud-name
   CLOUDINARY_KEY=your-api-key
   CLOUDINARY_SECRET=your-api-secret
   ```

4. **Deploy**: Railway will automatically deploy your backend
5. **Note your backend URL**: e.g., `https://your-app.railway.app`

### Step 2: Deploy Frontend to Vercel

1. **Sign up for Vercel**: [vercel.com](https://vercel.com)

2. **Import your project** from GitHub

3. **Configure build settings**:
   - Framework Preset: Next.js
   - Root Directory: `frontend`

4. **Add environment variable**:
   ```
   STRAPI_API_URL=https://your-backend-url.railway.app
   ```

5. **Deploy**: Vercel will build and deploy your frontend

### Step 3: Configure Cloudinary (Media Storage)

1. **Sign up for Cloudinary**: [cloudinary.com](https://cloudinary.com) (free tier available)

2. **Get your credentials** from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

3. **Add to Railway environment variables** (see Step 1)

### Step 4: Final Configuration

1. **Access your CMS**: Visit `https://your-backend-url.railway.app/admin`
2. **Create admin account**
3. **Configure permissions**: Settings > Users & Permissions > Public role
   - Enable `find` and `findOne` for: blogs, categories, tags
4. **Create content** and start blogging!

## 📁 Project Structure

```
weekly-blog/
├── backend/                 # Strapi CMS
│   ├── config/             # Database, server, middleware config
│   ├── src/
│   │   └── api/            # Content types (blog, category, tag)
│   ├── package.json
│   └── .env.example
├── frontend/               # Next.js Blog
│   ├── pages/              # App pages and routing
│   ├── components/         # Reusable components
│   ├── lib/               # API functions and utilities
│   ├── styles/            # Global styles
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🎯 Key Features Explained

### Content Management
- **Rich Editor**: Write blog posts with formatting, images, videos
- **Media Library**: Upload and organize media files
- **Categories & Tags**: Organize content
- **SEO Fields**: Meta titles, descriptions for better search rankings
- **Draft System**: Save drafts before publishing

### Blog Features
- **Fast Loading**: Static generation + incremental regeneration
- **Mobile Responsive**: Works perfectly on all screen sizes
- **Featured Posts**: Highlight important content
- **Search & Filter**: Find content by category, tags, or keywords
- **Social Sharing**: Share buttons for each post

## 🔧 Development

### Adding New Features

**Backend (Strapi):**
- Add new content types in `src/api/`
- Configure permissions in admin panel
- API automatically generated

**Frontend (Next.js):**
- Add new pages in `pages/`
- Create components in `components/`
- Update API calls in `lib/api.js`

### Local Development Commands

**Backend:**
```bash
npm run develop    # Start development server
npm run start      # Start production server
npm run build      # Build for production
```

**Frontend:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🔒 Security & Production

- Environment variables for sensitive data
- Database SSL connections in production
- CORS configuration
- Input validation and sanitization
- Rate limiting (can be added)

## 📈 Performance

- **Next.js SSG**: Static generation for fast loading
- **Image Optimization**: Automatic image optimization
- **CDN**: Cloudinary for media delivery
- **Caching**: Built-in caching strategies

## 🆘 Troubleshooting

**Common Issues:**

1. **CORS Errors**: Check your Strapi CORS configuration
2. **Image Not Loading**: Verify Cloudinary configuration
3. **Build Failures**: Check environment variables
4. **Database Connection**: Verify database credentials

**Getting Help:**
- Check the [Strapi Documentation](https://docs.strapi.io/)
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Create an issue in this repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Blogging! 🚀**

Built with ❤️ using Strapi and Next.js