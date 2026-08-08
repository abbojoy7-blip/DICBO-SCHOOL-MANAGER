# DICBO School Manager v1.0.0 Rollback Procedure

## 1. Application Code Rollback
1. Identify the previous stable Git tag (e.g., `v0.9.9`).
2. Deploy the previous version using the CI/CD pipeline or manually:
   ```bash
   git checkout v0.9.9
   npm run install-all
   npm run build --prefix admin-dashboard
   pm2 restart server.js
   ```

## 2. Configuration Rollback
1. Revert `.env` changes from the local backup or secrets manager.
2. Restart services to apply original environment variables.

## 3. Database Rollback
1. Follow the restore instructions in `BACKUP_AND_RECOVERY.md`.
2. Ensure the database state matches the reverted application version.

---
*Maintained by Release Manager*
