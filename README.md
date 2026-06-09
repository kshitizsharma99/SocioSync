# SocioSync

A full-stack MERN application designed to streamline community service management, complaint tracking, and maintenance workflows through role-based dashboards and real-time status monitoring.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Features

- Secure authentication with role-based access control
- Resident, Mechanic, and Admin dashboards
- Complaint registration and tracking system
- Complaint assignment and status management
- Service rating and feedback system
- Real-time notification updates
- Advanced filtering by status and date
- Responsive design for desktop and mobile devices

---

## Live Demo

Frontend: https://sociosync-99.netlify.app

Backend API: https://sociosync-backend-6dqc.onrender.com

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/kshitizsharma99/SocioSync.git
```

### 2. Navigate into the project folder

```bash
cd SocioSync
```

### 3. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_CODE=your_admin_code
MECHANIC_CODE=your_mechanic_code
```

### 5. Start the application

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
```

---

## Usage

### Residents

- Register and log in to the platform
- Submit maintenance or service complaints
- Track complaint progress
- Rate completed services and provide feedback

### Mechanics

- View assigned complaints
- Update complaint status
- Monitor work progress
- Review customer ratings

### Administrators

- Manage complaints and assignments
- Monitor platform activity
- Track service performance and feedback

---

## Technologies Used

### Frontend

- React
- React Router
- Tailwind CSS
- Ant Design
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)

### Deployment

- Netlify
- Render

---

## License

This project is open-source and available under the MIT License.
