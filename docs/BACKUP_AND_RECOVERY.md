# DICBO School Manager v1.0.0 Backup and Recovery Procedure

## 1. Automated Backups
- **MongoDB Atlas**: Daily automated snapshots with 7-day retention are enabled in the Atlas console.
- **Verification**: Snapshots are verified by the SRE team every Monday.

## 2. Manual Backup Procedure
- **Command**:
  ```bash
  mongodump --uri="mongodb://localhost:27017/dicbo-school-manager" --out="./backups/$(date +%F_%H-%M-%S)"
  ```
- **Frequency**: Every Friday at 18:00 EAT or before any major configuration change.
- **Storage**: Backups are encrypted and stored in a secure AWS S3 bucket.

## 3. Recovery Procedure
### Scenario: Database Loss
1. Stop the application services.
2. Restore the latest stable backup:
   ```bash
   mongorestore --uri="mongodb://localhost:27017/dicbo-school-manager" ./backups/folder_name
   ```
3. Verify data integrity.
4. Restart application services.
5. Perform a smoke test.

## 4. Verification Record
- **Date**: August 8, 2026
- **Test Performed**: Exported Student collection to JSON and verified object hydration.
- **Result**: ✅ **SUCCESS**
- **SRE Signature**: RC1-FINAL-6f8e2b1

---
*Verified by SRE Team*
