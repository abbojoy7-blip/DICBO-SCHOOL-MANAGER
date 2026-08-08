# DICBO School Manager v1.1.0 — Future Development Backlog

**Status**: Feature Freeze in Effect for v1.0.0. All entries below are scheduled for the next minor release.

## 🌟 New Features & Enhancements
- **Staff Payroll Module**: 
    - Automated salary generation based on contract settings.
    - Integration with national tax/SSF calculators.
    - Digital payslip generation (PDF).
- **Academic Performance Engine**:
    - Automated grading based on customizable grading scales.
    - Subject-wise and term-wise performance analytics for students and classes.
    - Automated "Teacher Comments" suggestion system using AI.
- **Unified Messaging Gateway**:
    - SMS integration for fee reminders and emergency alerts.
    - WhatsApp API integration for sending report cards and newsletters.
- **Inventory & Assets**:
    - Tracking school property (desks, computers, vehicles).
    - Stock management for uniforms and stationery.

## 🔧 Technical Debt & Reliability (SRE)
- **Cloud Storage Integration**: Move from local `/uploads` storage to AWS S3 or Google Cloud Storage for better scalability.
- **Real-time Engine**: Implement WebSockets (Socket.io) for instant dashboard updates and live notifications.
- **Performance Monitoring**: Integrate an APM (Application Performance Monitoring) tool like New Relic or Datadog.
- **Database Scaling**: Implement read-replicas for high-traffic reporting periods (end of term).

## 🎨 User Experience (UX)
- **Dark Mode**: High-priority request for administrative staff working late hours.
- **Mobile Native Shell**: Transition from web-only to native wrappers (Capacitor/Cordova) with push notification support.
- **Multi-language Support**: Add translations for Swahili and French.

---
*Maintained by the SRE & Deployment Engineering Team*
