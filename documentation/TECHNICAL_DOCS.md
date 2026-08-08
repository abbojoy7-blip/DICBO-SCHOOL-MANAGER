# DICBO School Manager - Technical Documentation

## 1. Architecture
- **Frontend**: React 18, Vite, Axios, React Router.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose ODM).
- **Security**: JWT, BcryptJS, RBAC (Role-Based Access Control).

## 2. Multi-Tenancy
Data isolation is achieved via a `school` field on all core collections. The backend middleware automatically filters queries based on the `schoolId` extracted from the JWT token.

## 3. API Overview
- `POST /api/auth/login`: Authentication.
- `GET /api/students`: Multi-tenant student registry.
- `POST /api/fees`: Financial transactions.
- `GET /api/reports/dashboard`: Statistics.

## 4. Production Environment
Ensure the following variables are set in `.env`:
- `MONGO_URI`: Atlas production string.
- `JWT_SECRET`: Random 64-char string.
- `NODE_ENV`: `production`
- `CORS_ORIGIN`: Your production frontend URL.

## 5. File Uploads
Currently uses local disk storage in `/uploads`. For large-scale deployment, integrate **AWS S3** or **Cloudinary** in `config/multer.js`.
