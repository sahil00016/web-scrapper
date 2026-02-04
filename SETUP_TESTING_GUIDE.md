# Event Scraper Platform - Setup & Testing Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Google OAuth credentials (from Google Cloud Console)

## Setup Instructions

### 1. Install Dependencies

```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

Create `.env` file in the `server` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/event-scraper
SESSION_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:3000
```

### 3. Setup Google OAuth

1. Go to Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
   - `http://localhost:3000/dashboard`
6. Copy Client ID and Client Secret to `.env`

### 4. Start the Application

```bash
# Terminal 1: Start Backend (from server directory)
cd server
npm start

# Terminal 2: Start Frontend (from client directory)
cd client
npm start
```

Backend runs on: `http://localhost:5000`
Frontend runs on: `http://localhost:3000`

## Testing Guide

### 1. Test Home Page (Public)
- [ ] Navigate to `http://localhost:3000/`
- [ ] Events display in grid
- [ ] Search by keyword works
- [ ] Event cards show title, venue, source
- [ ] Loading state appears while fetching

### 2. Test Lead Capture
- [ ] Click on an event
- [ ] Enter email address
- [ ] Check "I consent to receive updates"
- [ ] Click "GET TICKETS"
- [ ] Verify redirect to event URL opens in new tab
- [ ] Check MongoDB - Lead should be saved in `leads` collection

### 3. Test Google OAuth
- [ ] Click "Admin Login" in navigation
- [ ] Click "Login with Google"
- [ ] Complete Google authentication
- [ ] Redirected to Dashboard
- [ ] Navigation shows user name
- [ ] Navigation shows "Logout" button

### 4. Test Dashboard
- [ ] Navigate to `/dashboard` after login
- [ ] All events display in table
- [ ] Filter by City works
- [ ] Filter by Keyword works
- [ ] Filter by Source works
- [ ] Status tags display with colors (active=green, cancelled=red, etc.)
- [ ] Click on event row to view details on right panel
- [ ] Import button works and updates event status

### 5. Test Event Scraping
```bash
# Run scraper manually (from server directory)
node scrapers/index.js
```
- Check console output for "Scrape complete"
- Check MongoDB - New events should be added to `events` collection

### 6. Test Automated Scheduling
- Backend continues running
- Every 3 hours, cron job automatically runs scraping
- Check server logs for "Auto scraping..." message

### 7. Test Logout
- [ ] From Dashboard, click "Logout"
- [ ] Redirected to Home page
- [ ] Navigation shows "Admin Login" instead of user name
- [ ] Session cleared

## Troubleshooting

### MongoDB Connection Error
- Verify MONGO_URI is correct
- Check MongoDB server is running
- Ensure IP whitelist includes your machine (if using Atlas)

### Google OAuth Error
- Verify Client ID and Secret are correct
- Check redirect URI matches exactly in Google Console
- Clear browser cookies/cache

### Events Not Appearing
- Run scraper manually: `node scrapers/index.js`
- Check MongoDB connection
- Verify scrapers can access target websites

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## API Endpoints Reference

### Events
- `GET /api/events` - Get events (query: q, city, source)
- `POST /api/events/import/:id` - Mark event as imported

### Leads
- `POST /api/leads` - Save lead (body: email, consent, eventId)

### Auth
- `GET /auth/google` - Start OAuth flow
- `GET /auth/google/callback` - OAuth callback
- `GET /auth/user` - Get current user
- `POST /auth/logout` - Logout user

## Database Collections

### events
```json
{
  "title": "Event Title",
  "dateTime": "2024-01-15T19:00:00",
  "venue": "Venue Name",
  "city": "Sydney",
  "description": "Event description",
  "category": "Music",
  "image": "https://...",
  "source": "EventBrite",
  "sourceUrl": "https://...",
  "lastScraped": "2024-01-10T10:30:00",
  "status": "active",
  "importedAt": "2024-01-10T11:00:00",
  "importedBy": "admin",
  "importNotes": "Notes"
}
```

### leads
```json
{
  "email": "user@example.com",
  "consent": true,
  "eventId": ObjectId("..."),
  "createdAt": "2024-01-10T10:30:00"
}
```

### users
```json
{
  "googleId": "123456789",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Performance Optimization Tips

1. Add pagination to events list (currently returns all)
2. Implement caching for events (Redis)
3. Add database indexes on frequently searched fields
4. Implement lazy loading for event images
5. Add rate limiting to prevent scraper abuse

## Security Considerations

1. ✅ Environment variables for sensitive data
2. ✅ CORS configuration
3. ✅ Session-based authentication
4. ✅ Input validation on lead routes
5. ⚠️ Consider adding CSRF protection for production
6. ⚠️ Add rate limiting for API endpoints
7. ⚠️ Implement role-based access control (RBAC) for admin features

## Deployment Checklist

- [ ] Set up production MongoDB
- [ ] Configure environment variables on hosting platform
- [ ] Update GOOGLE_CLIENT_SECRET and credentials
- [ ] Update CLIENT_URL to production domain
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Test all features on production

## Support

For issues or questions:
1. Check console logs (browser and server)
2. Verify MongoDB connection
3. Check Google OAuth configuration
4. Review IMPLEMENTATION_REPORT.md for detailed info
