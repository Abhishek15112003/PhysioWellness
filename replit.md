# PhysioWell Clinic - Full Stack Web Application

## Overview

This is a full-stack web application for PhysioWell Clinic, a physiotherapy clinic website. The application provides a complete digital presence with appointment booking, testimonials, blog posts, and contact management features. It's built with modern web technologies focusing on performance, user experience, and maintainability.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware

### Database Design
- **ORM**: Drizzle ORM with TypeScript-first schema definitions
- **Tables**: appointments, testimonials, blog_posts, contact_messages, users
- **Validation**: Zod schemas for runtime validation and type safety
- **Migrations**: Automated schema migrations with Drizzle Kit

## Key Components

### Core Features
1. **Appointment Booking System**
   - Form validation with Zod schemas
   - Real-time availability checking
   - Status management (pending, confirmed, cancelled)
   - Email and phone contact collection

2. **Testimonials Management**
   - User-submitted reviews with rating system
   - Approval workflow for content moderation
   - Star ratings and occupation display

3. **Blog System**
   - Content management for health and wellness articles
   - Category-based organization
   - Featured images and excerpts
   - Publication date tracking

4. **Contact Management**
   - Contact form with subject categorization
   - Message status tracking (read/unread)
   - Administrative dashboard capabilities

### UI/UX Design
- **Design System**: Custom color palette with medical blue, healing green, and warm orange
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: WCAG-compliant components from Radix UI
- **Animations**: Smooth transitions and micro-interactions
- **Loading States**: Skeleton loaders and loading indicators

## Data Flow

### Client-Server Communication
1. **API Requests**: Custom apiRequest utility with error handling
2. **Query Management**: TanStack Query for caching and synchronization
3. **Form Submission**: React Hook Form with Zod validation
4. **Real-time Updates**: Query invalidation for fresh data

### Database Operations
1. **CRUD Operations**: Full create, read, update, delete functionality
2. **Data Validation**: Server-side validation with Zod schemas
3. **Type Safety**: End-to-end TypeScript with shared types
4. **Query Optimization**: Efficient database queries with Drizzle ORM

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Query
- **UI Components**: Radix UI primitives, Lucide React icons
- **Form Management**: React Hook Form, Hookform Resolvers
- **Styling**: Tailwind CSS, Class Variance Authority
- **Date Handling**: Date-fns for date manipulation
- **Carousel**: Embla Carousel for image galleries

### Backend Dependencies
- **Express Framework**: Core server functionality
- **Database**: Drizzle ORM, PostgreSQL adapter
- **Validation**: Zod for schema validation
- **Session Management**: Connect-pg-simple for PostgreSQL sessions
- **Build Tools**: ESBuild for production builds

### Development Tools
- **TypeScript**: Full type safety across the stack
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild compiles TypeScript server to `dist`
3. **Database**: Drizzle migrations applied automatically
4. **Static Assets**: Served from build directory

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL`
- **Development**: Hot module replacement with Vite
- **Production**: Optimized builds with tree shaking
- **Replit Integration**: Custom banner and development tools

### Hosting Requirements
- **Node.js**: ESM module support required
- **PostgreSQL**: Database instance with connection pooling
- **Static Files**: CDN-ready static asset serving
- **Environment Variables**: Secure configuration management

The application follows modern web development best practices with a focus on type safety, performance optimization, and user experience. The modular architecture allows for easy feature additions and maintenance while maintaining code quality and consistency.