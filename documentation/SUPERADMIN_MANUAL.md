# DICBO School Manager - Super Admin Manual (Platform Owner)

## 1. Overview
The Super Admin is responsible for managing the entire SaaS platform, including school tenants, subscriptions, and system health.

## 2. Managing Schools
- **School Directory**: View all schools using the platform.
- **Activation**: Toggle school status between "Active" and "Suspended".
- **Plan Management**: Assign "Starter", "Professional", or "Enterprise" plans to schools.

## 3. Global Monitoring
- Monitor total students across the platform to ensure performance stability.
- Review **Global Audit Logs** to track high-level administrative changes across all schools.

## 4. Onboarding a New School
1. Use the database script or a future Super Admin UI to create the initial `SchoolSettings` and `administrator` user.
2. Provide the login details to the school principal.

## 5. System Health
- If a server error occurs, it is logged in the **System Error** audit log category.
- Regularly check server logs for high-frequency failures.
