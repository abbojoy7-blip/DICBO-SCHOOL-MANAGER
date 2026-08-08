# Production Deployment & SRE Checklist

## 🔐 Security (Priority 1)
- [ ] **Environment Variables**: Verify `NODE_ENV=production` is set.
- [ ] **JWT Secret**: Ensure `JWT_SECRET` is a unique, 64+ character random string.
- [ ] **Atlas IP Whitelisting**: Restrict MongoDB access only to the production server IP.
- [ ] **SSL/HTTPS**: Confirm that the frontend and backend are served over HTTPS.
- [ ] **Rate Limiting**: Verify `express-rate-limit` is active on `/api/`.
- [ ] **CORS**: Ensure `CORS_ORIGIN` is restricted to the production frontend domain.

## 📈 Stability & Performance
- [ ] **Build Process**: Run `npm run build` in `admin-dashboard` and verify 0 errors.
- [ ] **Process Management**: Use **PM2** to manage the Node.js process (auto-restart on crash).
- [ ] **Compression**: Verify Gzip compression is active for API responses.
- [ ] **Indexing**: Confirm MongoDB compound indexes are created on `Student` and `FeePayment`.

## 💾 Disaster Recovery
- [ ] **Backups**: Confirm MongoDB Atlas automated daily backups are active.
- [ ] **Export Test**: Log in as Super Admin and verify "Export Data" works.
- [ ] **Audit Trail**: Ensure all admin actions are successfully appearing in the Audit Log.

## 📡 Monitoring
- [ ] **Health Check**: Run `node scripts/productionHealthCheck.js`.
- [ ] **Logs**: Verify `middleware/errorHandler.js` is logging errors with timestamps.

---
*Verified by Deployment Engineer*
