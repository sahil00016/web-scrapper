# 🎉 Sydney Events Platform

A modern, full-stack event discovery and management platform built with the MERN stack. Scrapes events from multiple sources, provides a beautiful user interface for browsing events, and includes an admin dashboard for event management.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

## ✨ Features

### 🏠 Public Features
- **Event Discovery** - Browse Sydney events in a beautiful, responsive grid
- **Advanced Search** - Search events by keywords
- **Event Details** - View comprehensive information about each event
- **Lead Capture** - Collect user emails with consent for marketing
- **Multiple Sources** - Events aggregated from EventBrite and What's On Sydney

### 🔐 Admin Features
- **Google OAuth Login** - Secure authentication with Google accounts
- **Advanced Filtering** - Filter events by city, keyword, and source
- **Event Management** - Import and manage events from the dashboard
- **Status Tracking** - Track event status (active, cancelled, imported, etc.)
- **Real-time Updates** - Dashboard updates reflect current event data

### 🤖 Backend Features
- **Automated Scraping** - Scrapes events every 3 hours via cron jobs
- **Multi-source Support** - EventBrite and What's On Sydney scrapers
- **Database Indexing** - Optimized MongoDB queries for fast searches
- **Error Handling** - Robust error handling and validation
- **API Routes** - RESTful API with proper HTTP status codes

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- MongoDB (local or Atlas)
- Google OAuth credentials

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd event-scraper-platform
```

2. **Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Configure environment variables**

Create `.env` file in the `server` directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/event-scraper
SESSION_SECRET=your-super-secret-key
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:3000
```

4. **Setup Google OAuth**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project and enable Google+ API
- Create OAuth 2.0 Web credentials
- Add authorized redirect URIs:
  - `http://localhost:5000/auth/google/callback`
  - `http://localhost:3000/dashboard`

5. **Start the application**
```bash
# Terminal 1: Backend (from server directory)
cd server
npm start

# Terminal 2: Frontend (from client directory)
cd client
npm start
```

**Access the app:**
- **Homepage**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/login
- **Backend API**: http://localhost:5000/api

## 📱 UI Components

### Home Page
- Hero section with search functionality
- Responsive event card grid
- Real-time event filtering
- Beautiful loading states

### Event Cards
- Event title, venue, and date
- Source and status badges
- Email capture form
- Direct link to event source

### Admin Dashboard
- Multi-filter event table
- Color-coded status badges
- Event detail panel
- Quick import functionality
- Responsive design

### Navigation Bar
- Logo and branding
- Navigation links
- User authentication display
- Login/Logout functionality

## 🗄️ Database Schema

### Events Collection
```javascript
{
  title: String,
  dateTime: String,
  venue: String,
  city: String,
  description: String,
  category: String,
  image: String,
  source: String,              // "EventBrite" or "WhatsOnSydney"
  sourceUrl: String,
  lastScraped: Date,
  status: String,              // "active", "cancelled", "imported", etc.
  importedAt: Date,
  importedBy: String,
  importNotes: String,
  timestamps: true
}
```

### Leads Collection
```javascript
{
  email: String,
  consent: Boolean,
  eventId: ObjectId,           // Reference to Event
  timestamps: true
}
```

### Users Collection
```javascript
{
  googleId: String,
  name: String,
  email: String
}
```

## 🔌 API Endpoints

### Events API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get events with filtering (q, city, source) |
| POST | `/api/events/import/:id` | Mark event as imported |

### Leads API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Save lead (email, consent, eventId) |

### Auth API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/google` | Initiate Google OAuth flow |
| GET | `/auth/google/callback` | OAuth callback handler |
| GET | `/auth/user` | Get current user info |
| POST | `/auth/logout` | Logout user |

## 🎨 Design & Styling

- **Modern UI** with gradient backgrounds and smooth animations
- **Responsive Design** using CSS Grid and Flexbox
- **Color Scheme**:
  - Primary: Gradient (Indigo #667eea to Purple #764ba2)
  - Success: Green #10b981
  - Error: Red #ef4444
  - Warning: Amber #f59e0b
- **Typography** with semantic HTML and consistent font weights

## 🧪 Testing Checklist

- [ ] Home page loads with events
- [ ] Search functionality works
- [ ] Email and consent collection works
- [ ] Google OAuth login completes
- [ ] Dashboard displays events
- [ ] Filtering by city, keyword, and source works
- [ ] Event import functionality works
- [ ] Lead data saves to database
- [ ] Logout clears session

## 🔧 Configuration

### Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb+srv://... |
| SESSION_SECRET | Express session secret | any-random-string |
| GOOGLE_CLIENT_ID | Google OAuth client ID | xxx.apps.googleusercontent.com |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | GOCSPX-xxx |
| CLIENT_URL | React app URL | http://localhost:3000 |

### Cron Schedule
- Scraping runs every 3 hours: `0 */3 * * *`
- Can be modified in `server/cron.js`

## 📊 Scraping Strategy

### EventBrite Scraper
- Scrapes from EventBrite Australia
- Extracts: title, date, venue, description, category, image
- Deduplicates using sourceUrl

### What's On Sydney Scraper
- Scrapes from WhatsOnSydney.com
- Extracts: title, date, venue, description, image
- Marks events as inactive when removed

## 🚢 Deployment

### Production Checklist
- [ ] Set up production MongoDB
- [ ] Configure environment variables on hosting platform
- [ ] Update CLIENT_URL to production domain
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Enable monitoring and logging
- [ ] Test all features on production

### Hosting Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas

## 📚 Project Structure

```
event-scraper-platform/
├── server/
│   ├── routes/
│   │   ├── auth.routes.js       # Google OAuth routes
│   │   ├── event.routes.js      # Event API routes
│   │   └── lead.routes.js       # Lead capture routes
│   ├── models/
│   │   ├── Event.js             # Event schema
│   │   ├── Lead.js              # Lead schema
│   │   └── User.js              # User schema
│   ├── scrapers/
│   │   ├── eventbrite.js        # EventBrite scraper
│   │   ├── whatsOnSydney.js     # What's On Sydney scraper
│   │   └── index.js             # Scraper runner
│   ├── middleware/
│   │   └── auth.js              # Auth middleware
│   ├── cron.js                  # Cron scheduling
│   └── server.js                # Express server
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventCard.jsx    # Event card component
│   │   │   ├── Navigation.jsx   # Navigation bar
│   │   │   ├── Filters.jsx      # Filter component
│   │   │   └── Preview.jsx      # Preview component
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Home page
│   │   │   ├── Dashboard.jsx    # Admin dashboard
│   │   │   └── Login.jsx        # Login page
│   │   ├── App.js               # Main app component
│   │   ├── api.js               # Axios instance
│   │   └── App.css              # Global styles
│   └── public/
└── .env                         # Environment variables
```

## 🛠️ Development

### Running Scraper Manually
```bash
cd server
node scrapers/index.js
```

### Checking Logs
```bash
# Backend logs
npm start

# Frontend logs
npm start
```

### Code Standards
- Use functional components with hooks
- Follow ESLint recommendations
- Use meaningful variable names
- Add error handling to API calls
- Comment complex logic

## 📖 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Axios |
| Backend | Node.js, Express.js, Passport.js |
| Database | MongoDB, Mongoose |
| Authentication | Google OAuth 2.0 |
| Scraping | Axios, Cheerio |
| Scheduling | node-cron |
| Environment | dotenv |

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Ensure MongoDB is running and MONGO_URI is correct

### Google OAuth Error
```
Error: invalid_client
```
**Solution**: Verify Client ID and Secret match Google Console settings

### Events Not Appearing
```
No events in database
```
**Solution**: Run scraper manually: `node scrapers/index.js`

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues or questions:
1. Check this README for common solutions
2. Review server logs for error messages
3. Verify environment variables are set correctly
4. Check browser console for frontend errors

## 🎯 Future Enhancements

- [ ] Pagination for events list
- [ ] Event favorites/wishlist
- [ ] Email notifications
- [ ] Advanced search filters (date range, price)
- [ ] Event recommendations
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Event calendar view
- [ ] Analytics dashboard

---

**Made with ❤️ for Sydney event lovers**

Last Updated: February 2026
