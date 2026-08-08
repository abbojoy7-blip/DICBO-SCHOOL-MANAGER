# DICBO School Manager v1.0.0 Monitoring and Operations

## 1. Application Monitoring
- **Health Check Endpoint**: `/api/health`
- **Uptime**: Monitored via external probes (e.g., UptimeRobot or BetterStack).
- **Performance**: Morgan is enabled in "combined" mode for production logs.

## 2. Server Resource Monitoring
- **CPU/Memory**: Monitored via the hosting provider dashboard (Render/AWS).
- **Disk Usage**: Monitored locally for `/uploads` growth.
- **Alerts**: Alerts are triggered if memory exceeds 80% or if the health check fails for > 2 minutes.

## 3. Security Monitoring
- **Authentication Failures**: Logged via Audit Logs.
- **Unauthorized Access**: Captured by `roleCheck` middleware and logged for investigation.
- **Rate Limiting**: Blocked IPs are reviewed for potential DDoS patterns.

---
*Maintained by DevOps & SRE*
