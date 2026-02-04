# Event Scraper Platform - Implementation Report

## Project Overview
This is a MERN (MongoDB, Express, React, Node.js) stack application for scraping Sydney events and providing both public and admin interfaces.

## Assignment Requirements Compliance

### ✅ 1. Event Scraping Functionality
**Status:** COMPLETE

#### EventBrite Scraper (`server/scrapers/eventbrite.js`)
- Scrapes events from EventBrite Australia website
- Extracts: title, dateTime, venue, description, category, image, source URL
- Stores events in MongoDB with metadata (lastScraped, status, importNotes)
- Handles duplicate detection using sourceUrl

#### What's On Sydney Scraper (`server/scrapers/whatsOnSydney.js`)
- Scrapes events from WhatsOnSydney website
- Extracts: title, dateTime, venue, description, image, source URL
- Implements status tracking (new, updated, inactive)
- Marks events as inactive when no longer available

#### Automated Scheduling (`server/cron.js`)
- Runs scraping every 3 hours using node-cron
- Automatically updates event database
- Logs scraping operations

### ✅ 2. User Interface Design

#### Home Page (`client/src/pages/Home.jsx`)
- Displays all available events in a responsive grid layout
- Search functionality by keyword
- Event cards with all relevant details
- Loading states for better UX
- Empty state messaging

#### Event Card Component (`client/src/components/EventCard.jsx`)
- Displays event title, venue, source
- Email capture field
- Consent checkbox for marketing communications
- "GET TICKETS" button that:
  - Opens the event source URL in a new tab
  - Saves lead information (email, consent, eventId) to database
  - Validates input before submission
  - Includes error handling

#### Admin Dashboard (`client/src/pages/Dashboard.jsx`)
- Table view of all scraped events
- Multiple filter options:
  - Filter by city
  - Filter by keyword
  - Filter by source (EventBrite, What's On Sydney)
- Status tags with color coding:
  - Active (green)
  - Cancelled (red)
  - Pending (orange)
- Click to view event details in side panel
- Import button to mark events for dashboard use
- Responsive design with proper spacing

#### Navigation Component (`client/src/components/Navigation.jsx`)
- Logo and branding
- Navigation links
- User authentication display
- Login/Logout functionality
- Responsive header with shadow effect

### ✅ 3. Google OAuth Authentication

#### Google OAuth Setup (`server/routes/auth.routes.js`)
- Configured Passport.js with GoogleStrategy
- Credentials from `.env` (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- Automatic user creation on first login
- Session persistence using Passport serialization
- User Profile Fields Captured:
  - Google ID
  - Name
  - Email

#### Authentication Endpoints
- `GET /auth/google` - Initiates Google OAuth flow
- `GET /auth/google/callback` - Handles OAuth callback
- `GET /auth/user` - Returns current user info
- `POST /auth/logout` - Logout endpoint with proper session cleanup

#### User Model (`server/models/User.js`)
- Stores: googleId, name, email
- Enables user session management

### ✅ 4. Database Models

#### Event Model (`server/models/Event.js`)
Fields: title, dateTime, venue, city, description, category, image, source, sourceUrl, lastScraped, status, importedAt, importedBy, importNotes, timestamps

#### Lead Model (`server/models/Lead.js`)
Fields: email, consent, eventId (ObjectId reference to Event), timestamps

#### User Model (`server/models/User.js`)
Fields: googleId, name, email

### ✅ 5. API Routes

#### Event Routes (`server/routes/event.routes.js`)
- `GET /events` - Get events with filtering
  - Query params: q (keyword), city (default: Sydney), source
  - Returns events sorted by lastScraped date
  - Excludes inactive events
- `POST /events/import/:id` - Mark event as imported
  - Updates status, importedAt, importedBy fields

#### Lead Routes (`server/routes/lead.routes.js`)
- `POST /leads` - Save lead information
  - Validates eventId exists
  - Stores email, consent, eventId
  - Error handling for validation and database errors

#### Auth Routes (`server/routes/auth.routes.js`)
- Google OAuth flow endpoints
- User session management

### ✅ 6. Server Configuration (`server/server.js`)
- Express setup with CORS
- MongoDB connection via Mongoose
- Session management with express-session
- Passport initialization
- Environment variables via dotenv
- Automatic cron job initialization
- Runs on port 5000

### ✅ 7. Client Configuration (`client/src/api.js`)
- Axios instance configured for API calls
- Base URL: `http://localhost:5000/api`
- Automatic credential handling

## Key Features Implemented

### Email Lead Capture
- Users can enter email on event cards
- Consent checkbox ensures GDPR compliance
- Leads saved to database with event reference
- Server validates event existence before saving

### Event Filtering & Search
- Home page: Keyword search
- Dashboard: City, keyword, and source filtering
- Real-time search with loading states
- Proper URL query parameter construction

### Event Status Management
- Status tracking: new, updated, active, cancelled, inactive, imported
- Color-coded status badges on dashboard
- Import functionality for admin workflow

### Responsive Design
- Mobile-friendly layouts
- Flexbox and Grid for responsive grids
- Proper spacing and visual hierarchy

## Technology Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Passport.js for authentication
- node-cron for job scheduling
- axios for HTTP requests
- cheerio for web scraping
- dotenv for configuration

### Frontend
- React with React Router
- Axios for API calls
- Functional components with hooks
- CSS-in-JS for styling

## Environment Configuration

Required `.env` variables:
- MONGO_URI - MongoDB connection string
- SESSION_SECRET - Express session secret
- GOOGLE_CLIENT_ID - Google OAuth client ID
- GOOGLE_CLIENT_SECRET - Google OAuth client secret
- CLIENT_URL - React app URL (for redirects)

## Error Handling

### Frontend
- Try-catch blocks on API calls
- User-friendly error messages
- Loading states during async operations
- Validation before form submission

### Backend
- Error handling in auth routes
- Event validation in lead routes
- Proper HTTP status codes
- Console logging for debugging

## Testing Checklist

✅ Event scraping runs successfully
✅ Events display on home page
✅ Email and consent collection works
✅ Google OAuth login flow completes
✅ Dashboard filters work correctly
✅ Event import functionality works
✅ Lead data saves to database
✅ Navigation between pages works
✅ Logout clears user session

## File Structure
```
├── server/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── event.routes.js
│   │   └── lead.routes.js
│   ├── models/
│   │   ├── Event.js
│   │   ├── Lead.js
│   │   └── User.js
│   ├── scrapers/
│   │   ├── eventbrite.js
│   │   ├── whatsOnSydney.js
│   │   └── index.js
│   ├── middleware/
│   │   └── auth.js
│   ├── cron.js
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventCard.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── Preview.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── App.js
│   │   ├── api.js
│   │   └── index.js
│   └── public/
└── .env
```

## Conclusion

All assignment requirements have been successfully implemented:

1. ✅ Event scraping from multiple sources (EventBrite, What's On Sydney)
2. ✅ Professional user interface with responsive design
3. ✅ Google OAuth authentication integration
4. ✅ Lead capture and management
5. ✅ Admin dashboard with filtering and event management
6. ✅ Automated scheduling (every 3 hours)
7. ✅ Proper error handling and user feedback
8. ✅ Clean, modular code structure

The platform is ready for deployment and testing.
