# PhysioWellness - Physiotherapy Clinic Website

A modern, responsive website for a physiotherapy clinic built with React, TypeScript, and Express.

## Features

- **Modern Design**: Clean, professional UI with Tailwind CSS
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Appointment Booking**: Online appointment scheduling system
- **Service Information**: Detailed information about physiotherapy services
- **Patient Testimonials**: Display client reviews and ratings
- **Blog Section**: Health and wellness articles
- **Contact Form**: Easy way for patients to get in touch

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Framer Motion** for animations
- **React Query** for data fetching
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Zod** for data validation
- **In-memory storage** (for development)

### Development Tools
- **Vite** for fast development and building
- **ESBuild** for server bundling
- **TypeScript** for type safety
- **Cross-env** for cross-platform environment variables

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run check` - Run TypeScript type checking

## Project Structure

```
PhysioWellness/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage (in-memory)
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and validation
└── dist/                  # Built files (generated)
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
SESSION_SECRET=your-secret-key-here
# DATABASE_URL=postgresql://username:password@localhost:5432/physiowellness
```

## Database

The application is currently configured to use **in-memory storage** for development, which means:
- No database setup required
- Data is reset on server restart
- Sample data is automatically loaded

To use a real PostgreSQL database:
1. Set up a PostgreSQL database
2. Uncomment and configure the `DATABASE_URL` in your `.env` file
3. Run `npm run db:push` to create the database schema

## API Endpoints

- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit new testimonial
- `GET /api/blog-posts` - Get all blog posts
- `POST /api/contact` - Submit contact message

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## Fixed Issues

The following issues have been resolved:

1. **Cross-platform compatibility** - Added `cross-env` for Windows PowerShell support
2. **Environment variables** - Added dotenv configuration and .env file
3. **TypeScript errors** - Fixed type compatibility issues in storage layer
4. **Database configuration** - Made database optional for development
5. **Build process** - Ensured all dependencies are properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run type checking: `npm run check`
5. Test the build: `npm run build`
6. Submit a pull request

## License

MIT License - see LICENSE file for details.
