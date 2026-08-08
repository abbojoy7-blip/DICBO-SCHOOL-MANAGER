# DICBO School Manager - Backup & Disaster Recovery Policy

## 1. Overview
The purpose of this policy is to ensure that DICBO School Manager data is protected and can be restored in the event of hardware failure, human error, or cyber-attacks.

## 2. Backup Frequency
- **Automated Backups**: MongoDB Atlas handles daily automated backups with 7-day retention.
- **Manual Backups**: Administrators are encouraged to perform a manual export before major system updates or at the end of every school term.

## 3. Backup Procedure
### Method A: Web Portal Export (Per School)
1. Log in as an **Administrator**.
2. Navigate to **Maintenance > Backup**.
3. Click **Export School Data**.
4. A JSON file containing all Students, Staff, Fees, and Attendance records will be downloaded.

### Method B: Database Level Backup (Super Admin)
To back up the entire platform database:
```bash
mongodump --uri="your_mongodb_uri" --out="./backups/backup_$(date +%F)"
```

## 4. Restoration Procedure
In case of data loss:
1. Identify the most recent stable backup file.
2. If using MongoDB Atlas, use the **Point-in-Time Restore** feature.
3. For local restoration:
```bash
mongorestore --uri="your_mongodb_uri" ./backups/folder_name
```

## 5. Storage & Security
- Backups must be stored in at least two separate physical locations (e.g., Cloud Storage and an Offline Encrypted Drive).
- Backups contain sensitive PII (Personally Identifiable Information) and must be handled according to school privacy policies.
