# DICBO School Manager v1.0.0 UAT Checklist

## Role-Based Access Control (RBAC)
| Role | Module Access | Expected | Actual | Status |
| :--- | :--- | :--- | :--- | :--- |
| Administrator | Full Access | Allowed | Allowed | ✅ |
| Teacher | Attendance, Students, Exams | Allowed | Allowed | ✅ |
| Teacher | Fees, Staff Management | Blocked (403) | Blocked | ✅ |
| Accountant | Fees, Payroll, Reports | Allowed | Allowed | ✅ |
| Parent | Child Profile, Attendance | Allowed | Allowed | ✅ |
| Parent | Class Management | Blocked (403) | Blocked | ✅ |

## Core Workflow Validation
| Role | Action | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| Admin | Register New Student | Record created with unique Admission No | ✅ |
| Admin | Update School Profile | Logo/Contacts reflect in reports/receipts | ✅ |
| Teacher | Mark Daily Attendance | Bulk update persists in DB | ✅ |
| Accountant | Record Fee Payment | UGX balance updates; Receipt generated | ✅ |
| Super Admin | Suspend School | JWT tokens for that school rejected | ✅ |

## System Constraints
- [x] Duplicate Admission Numbers blocked by DB Index.
- [x] SQL/NoSQL Injection patterns rejected by MongoSanitize.
- [x] Brute-force login attempts limited by RateLimiter.

---
*Verified on Aug 8, 2026 by SRE Lead*
