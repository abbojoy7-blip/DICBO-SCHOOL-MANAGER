# DICBO School Manager 🚀

A comprehensive, production-ready school management system (ERP) designed for modern educational institutions.

## 🌟 Version 1.0.0 Production Release

DICBO School Manager is now a multi-tenant SaaS platform capable of handling everything from student admissions and staff management to fee collections and academic reporting across multiple schools.

## 🛠 Features
- **Multi-Tenancy**: Complete data isolation for each school.
- **Security**: JWT Authentication, RBAC, and encrypted password hashing.
- **Students**: Complete profiles, auto-admission numbering, and registry management.
- **Finances**: Fee collection, automated receipts, balance tracking, and budget planning.
- **Academics**: Attendance registers, class management, and subject tracking.
- **SaaS Control**: Super Admin panel for managing school subscriptions and system health.
- **Maintenance**: Audit logs and one-click database backups.

## 🚀 Quick Start (Production)

1. **Install Dependencies**:
   ```bash
   npm run install-all
   ```
2. **Setup Environment**:
   - Create `.env` from `.env.example`.
   - Add your `MONGO_URI` and `JWT_SECRET`.
3. **Seed Initial Data**:
   ```bash
   # Create Super Admin
   node server/scripts/seedSuperAdmin.js
   # (Optional) Create professional demo school
   node server/scripts/seedProductionDemo.js
   ```
4. **Build & Start**:
   ```bash
   cd admin-dashboard && npm run build
   npm start
   ```

## 📖 Documentation
- [Administrator Manual](./SCHOOL_ADMIN_MANUAL.md)
- [Platform Owner (Super Admin) Manual](./SUPERADMIN_MANUAL.md)
- [Technical Documentation](./TECHNICAL_DOCS.md)
- [Backup & Disaster Recovery Policy](./BACKUP_POLICY.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🏗 Project Structure
- `models/`: Mongoose schemas.
- `routes/`: API endpoint definitions.
- `controllers/`: Business logic.
- `middleware/`: Security, logging, and error handling.
- `admin-dashboard/`: React (Vite) frontend.

---
© 2026 DICBO School Manager. Built for excellence in education.
