# Render + Cloudflare Deployment Guide

## Backend Deployment on Render

1. **Create Render Account**: Go to [render.com](https://render.com)

2. **Deploy Backend**:
   - Connect your GitHub repo
   - Select `server` folder as root directory
   - Render will auto-detect Node.js

3. **Environment Variables** (Add in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   ADMIN_TOKEN=quantum2024admin
   ```

4. **Database**: Render will automatically create SQLite database

5. **Get Backend URL**: Copy your Render app URL (e.g., `https://quantumbit-backend.onrender.com`)

## Frontend Deployment on Cloudflare Pages

1. **Update API URL** in `frontend/src/lib/config.ts`:
   ```typescript
   export const config = {
     api: {
       baseUrl: 'https://quantumbit-backend.onrender.com', // Your Render URL
       adminToken: 'quantum2024admin'
     }
   };
   ```

2. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to Cloudflare Pages**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect GitHub repo
   - Build settings:
     - **Build command**: `cd frontend && npm run build`
     - **Build output directory**: `frontend/dist`
     - **Root directory**: `/` (leave empty)

4. **Custom Domain** (Optional):
   - Add your domain in Cloudflare Pages
   - Update DNS records

## CORS Configuration

Update `server/server.js` to allow your Cloudflare domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://quantumbitsystems.com',
    'https://www.quantumbitsystems.com'
  ]
}));
```

## Final Steps

1. **Test Backend**: Visit https://quantumbit-backend.onrender.com
2. **Test Frontend**: Visit https://quantumbitsystems.com
3. **Admin Access**: https://quantumbitsystems.com/quantum-admin-ak2024

Your website is live with:
- ⚡ **Fast frontend** on Cloudflare's global CDN
- 🚄 **Reliable backend** on Render (free tier)