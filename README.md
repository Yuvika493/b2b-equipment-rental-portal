# 🏗️ Equipment Rental Portal

A full-stack **B2B Equipment Rental Portal** built with the MERN stack, enabling businesses to browse, search, and book industrial and construction equipment online — with a dedicated admin panel to manage bookings.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 📖 About The Project

The **Equipment Rental Portal** is a B2B platform that connects businesses with industrial equipment — excavators, loaders, aerial lifts, compaction equipment, and more. Customers can browse the live catalog, filter by category, view detailed specifications and safety instructions, and submit rental bookings with a real-time cost estimate. Admins can track and update every booking from a dedicated dashboard.

Built as a complete MERN-stack capstone project, with a clean separation between client and server, a REST API as the single source of truth for pricing, and a fully responsive, modern B2B interface.

---

## 🖼️ Screenshots

<img width="1853" height="911" alt="Screenshot 2026-09-25 134025" src="https://github.com/user-attachments/assets/762701ab-6465-41c2-ac8a-e936e100215f" />

---

## 🔗 Live Demo

| Environment | Link |
|---|---|
| 🌐 Frontend | [[(https://b2b-equipment-rental-portal.vercel.app/)](https://b2b-equipment-rental-portal-m87d.vercel.app/)] |
| ⚙️ Backend API | [[(https://b2b-equipment-rental-portal-1.onrender.com)]( https://b2b-equipment-rental-portal-2.onrender.com)] |



---

## ✨ Features

- 🔍 **Browse & Search** — Real-time equipment search and category filtering
- 📋 **Equipment Details** — Full specs, safety instructions, and operational guidelines per item
- 💰 **Live Cost Calculator** — Instant rental cost estimate as dates are selected
- 📝 **Booking System** — Simple, validated booking form with instant confirmation
- 🛠️ **Admin Dashboard** — View all bookings and update status (Pending → Confirmed → Completed)
- 📱 **Fully Responsive** — Works seamlessly across desktop, tablet, and mobile

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM
- Axios
- Plain CSS (design tokens, no UI framework)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- REST API architecture

---


---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/equipment-rental-portal.git
cd equipment-rental-portal
```

### 2️⃣ Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Update `server/.env` with your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Seed the database with sample equipment (optional, but needed to test the API):

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3️⃣ Set up the frontend

Open a new terminal:

```bash
cd client
npm install
cp .env.example .env
```

Update `client/.env` if your backend runs on a different URL:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/equipment` | Fetch all equipment |
| `GET` | `/api/equipment/:id` | Fetch a single equipment item |
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings` | Fetch all bookings (admin) |
| `PATCH` | `/api/bookings/:id/status` | Update a booking's status |

---

## 🗺️ Application Routes

| Route | Description |
|---|---|
| `/` | Landing page — equipment catalog with search & filters |
| `/equipment/:id` | Equipment details & booking form |
| `/admin/bookings` | Admin dashboard — manage all bookings |

---


## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](../../issues) if you'd like to contribute.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Yuvika Jangwal**

- GitHub: [@Yuvika493](https://github.com/Yuvika493)
- LinkedIn: [[Yuvika Jangwal](https://www.linkedin.com/in/yuvika-jangwal796/)]
