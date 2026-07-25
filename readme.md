# LeadDesk Mini

A full-stack lead capture application built as part of the **Digital Heroes Internship Qualification Task**.

The application consists of:

* **Public Landing Page** for collecting customer leads.
* **Secure Admin Dashboard** for viewing, searching, and managing submitted leads.

---

## Live Demo

**Landing Page**

> *https://digital-heroes-assignment-ypbj.onrender.com*



---

## Demo Credentials

Email:

```text
<harshkaushal@gmail.com>
```

Password:

```text
<12345678>
```

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* React Hook Form
* Zod
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

# Features

## Public Side

* Responsive landing page
* Lead capture form
* Client-side validation
* Server-side validation
* Success & error notifications

Lead fields:

* Name
* Email
* Budget Range
* Message

---

## Admin Side

* Secure login
* Protected routes
* Search leads
* View all submitted leads
* Update lead status

Lead statuses:

* New
* Contacted
* Closed

---

# Data Model

## Lead

```javascript
{
  name: String,
  email: String,
  budget: String,
  message: String,
  status: "new" | "contacted" | "closed",
  createdAt,
  updatedAt
}
```

---

## Authentication Model

The admin area is protected using **JWT authentication**.

### Login Flow

1. Admin submits credentials.
2. Backend validates credentials.
3. Backend generates a JWT access token.
4. Frontend stores the access token.
5. Protected routes verify authentication before allowing access.

Unauthenticated users attempting to access the admin dashboard are redirected to the login page.

---

# API Overview

## Public

### Create Lead

```http
POST /api/v1/user/lead
```

Body

```json
{
  "name": "",
  "email": "",
  "budget": "",
  "message": ""
}
```

---

## Admin

### Login

```http
POST /api/v1/admin/login
```

---

### Get Leads

```http
GET /api/v1/admin/lead
```

Supported query parameters

* page
* limit
* status
* filters

Example

```http
GET /api/v1/admin/lead?page=1&limit=10&status=new
```

---

### Change Status

```http
PATCH /api/v1/admin/lead/:id/status
```

Body

```json
{
  "status": "contacted"
}
```

---

# Project Structure

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── routes/
│   └── schemas/
│
backend/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── utils/
```

---

# Local Setup

## Clone

```bash
git clone https://github.com/The-Harsh-Kaushal/digital_heroes_assignment.git
```

---

## Backend

```bash
cd backend
npm install
```

Create a `.env` file.

Example:

```env
PORT=5001
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
```

Create a `.env` file.

```env
VITE_API_BASE_URL=http://localhost:5001/api/v1
```

Run

```bash
npm run dev
```

---

# Deployment

Frontend:

> *Add deployed frontend platform (e.g. Vercel)*

Backend:

> *Add deployed backend platform (e.g. Render)*

Database:

> MongoDB Atlas

---

# Validation

Client-side validation is implemented using **React Hook Form** and **Zod**.

Server-side validation is performed before data is stored in the database.

---

# Future Improvements

* Refresh token authentication
* Sorting and advanced filtering
* Admin profile management
* Email notifications
* Audit logs
* Role-based access control

---


# Author

**<harsh kaushal>**
