# Vercel Deployment Guide

## Before Deploying to Vercel

### 1. Build the Project
```bash
npm run build:client
```

### 2. Environment Variables
In your Vercel dashboard, add these environment variables:
- `NODE_ENV`: `production`
- `JWT_SECRET`: A secure random string (use a password generator)

### 3. Deploy
```bash
vercel
```

## Important Notes

- The application uses in-memory storage, so data will reset on each deployment
- For production, consider using a persistent database like PostgreSQL or MongoDB
- The admin credentials are: `admin` / `admin123`

## Current Features Working
- ✅ User authentication (signup/login)
- ✅ Admin login and dashboard
- ✅ Appointment booking
- ✅ Contact forms
- ✅ Testimonials system
- ✅ Blog functionality
- ✅ Reviews page

## API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/appointments` - Get all appointments (admin only)
- `POST /api/appointments` - Create appointment
- `GET /api/testimonials` - Get approved testimonials
- `GET /api/testimonials/all` - Get all testimonials (admin only)
- `POST /api/testimonials` - Submit testimonial
- `GET /api/blog-posts` - Get blog posts
- `GET /api/blog-posts/:id` - Get specific blog post
- `POST /api/contact` - Submit contact message
- `GET /api/contact-messages` - Get contact messages (admin only)
