# Security Notice

## ⚠️ Exposed Credentials Detected

GitHub's secret scanning detected that the following sensitive credentials were accidentally committed to the repository:

### Compromised Credentials:
- MongoDB connection URI with database password
- Google OAuth 2.0 Client ID and Client Secret
- Session encryption secret

## 🔐 Immediate Actions Required

### 1. **Regenerate All Credentials** (DO THIS FIRST!)

#### MongoDB:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Navigate to Database Access
3. Reset the password for the user in your connection string
4. Get new connection URI
5. Update your `.env` with new `MONGO_URI`

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Find your OAuth 2.0 Client ID application
4. Delete the compromised credentials
5. Create new credentials
6. Download new client_secret JSON
7. Update your `.env` with new `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

#### Session Secret:
1. Generate a new random string (at least 32 characters)
2. Update `SESSION_SECRET` in your `.env`

### 2. **Update Your Environment File**

```bash
# Copy the template
cp server/.env.example server/.env

# Edit .env with your NEW credentials
nano server/.env
```

### 3. **Verify Locally**
```bash
cd server
npm install
npm start
```

## 📋 Files Protected

The following patterns are now in `.gitignore` and will never be committed again:
- `.env` - Environment variables
- `.env.local` - Local overrides
- `client_secret_*.json` - Google OAuth secrets
- `credentials.json` - Any credential files
- `node_modules/` - Dependencies

## ✅ Best Practices

1. **Never commit secrets** - Always use `.env` files
2. **Use `.env.example`** - Provide templates for required env vars
3. **Review commits** - Check what's being committed with `git diff`
4. **Enable secret scanning** - GitHub will now automatically scan for known secret patterns
5. **Use environment-specific configs** - Keep production secrets separate from development

## 🔗 Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Twelve-Factor App - Config](https://12factor.net/config)

---

**Last Updated:** February 4, 2026
**Status:** Credentials removed from public repository
