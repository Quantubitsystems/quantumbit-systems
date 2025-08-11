# Railway Deployment Guide

## Backend Deployment on Railway

1. **Create Railway Account**: Go to [railway.app](https://railway.app)

2. **Deploy Backend**:
   - Connect your GitHub repo
   - Select `server` folder as root directory
   - Railway will auto-detect Node.js

3. **Environment Variables** (Add in Railway dashboard):
   ```
   NODE_ENV=production
   PORT=3001
   ADMIN_TOKEN=your-secure-admin-token
   ```

4. **Database**: Railway will automatically create SQLite database

5. **Get Backend URL**: Copy your Railway app URL (e.g., `https://your-app.railway.app`)

## Frontend Deployment on Cloudflare Pages

1. **Update API URL** in `frontend/src/lib/config.ts`:
   ```typescript
   export const config = {
     api: {
       baseUrl: 'https://your-railway-app.railway.app', // Your Railway URL
       adminToken: 'your-secure-admin-token'
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
    'https://your-domain.pages.dev',
    'https://your-custom-domain.com'
  ]
}));
```

## Final Steps

1. **Test Backend**: Visit your Railway URL
2. **Test Frontend**: Visit your Cloudflare Pages URL
3. **Admin Access**: `https://your-domain.com/quantum-admin-ak2024`

Your website will be live with:
- ⚡ **Fast frontend** on Cloudflare's global CDN
- 🚄 **Reliable backend** on Railway with auto-scaling