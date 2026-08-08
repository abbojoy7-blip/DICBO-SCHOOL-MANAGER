# DICBO School Manager - Production Deployment Guide (RC1)

## 1. Professional Cloud Deployment

### Backend (Node.js/Express)
1. **Infrastructure**: Deploy on **Render**, **Railway**, or **AWS Elastic Beanstalk**.
2. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGO_URI`: High-availability **MongoDB Atlas** cluster.
   - `JWT_SECRET`: Minimum 64-character random string.
   - `CORS_ORIGIN`: Your exact frontend domain.
3. **Storage**: Configure **AWS S3** or **Cloudinary** for student photos.

### Frontend (React/Vite)
1. **Host**: **Vercel** or **Netlify**.
2. **Build**: `npm run build`.
3. **Environment**: `VITE_API_URL` pointing to your production API.

---

### 2. School Network / Local Server Deployment

This option is suitable for institutions with unstable internet connectivity.

#### Requirements
- Windows Server 2022 or Ubuntu 22.04 LTS.
- Minimum 8GB RAM, Quad-core CPU.
- SSL Certificate (Self-signed or internal CA).

#### Setup Steps
1. **Dependencies**: Install Node.js LTS and MongoDB Community Edition.
2. **Persistence**: Use **PM2** for process management.
   ```bash
   npm install -g pm2
   pm2 start server.js --name "dicbo-erp"
   ```
3. **Firewall**: Open port 5000 and 443 (if using a proxy like NGINX).
4. **Access**: Devices on the school WiFi can connect via the server's local IP.

---

### 3. SaaS Onboarding Checklist
1. **Master Platform Setup**:
   - Run `node server/scripts/seedSuperAdmin.js`.
2. **School Tenant Creation**:
   - Log in to Super Admin Panel.
   - Register new school settings.
3. **Admin Handover**:
   - Create initial Administrator account for the school.
   - Administrator completes the **Onboarding Wizard**.

---

### 4. Backup Strategy
- **Daily**: Automated MongoDB Atlas snapshots.
- **Weekly**: Super Admin manual database export.
- **Monthly**: Full platform audit and log archiving.
