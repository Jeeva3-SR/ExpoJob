# Expense Tracker + Job Application Tracker (MERN Stack)

A full-stack MERN application that combines **personal expense tracking** and **job application management** into a single split-screen dashboard.

---

## 📌 Features

### 🧾 Expense Tracker (Left Panel)

* Add expenses (Title, Amount, Category, Date)
* View all expenses in a table
* Filter by category and date
* Delete expenses
* View total spending

### 💼 Job Application Tracker (Right Panel)

* Add job applications:

  * Company Name
  * Role (optional)
  * Status (Applied, Shortlisted, Rejected, Accepted)
  * Date Applied
* View all applications
* Update application status
* Delete applications
* Filter by status
* Color-coded status indicators:

  * 🔵 Applied
  * 🟡 Shortlisted
  * 🔴 Rejected
  * 🟢 Accepted

---

## Tech Stack

### Frontend

* React.js
* Bootstrap (for styling)
* Axios (API calls)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

---

## Project Structure

```
project-root/
│
├── backend/
│   ├── models/
│   │   ├── Expense.js
│   │   ├── Job.js
│   ├── routes/
│   │   ├── expenseRoutes.js
│   │   ├── jobRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   ├── JobForm.js
│   │   │   ├── JobList.js
│   │   ├── App.js
│   │   └── api.js
│   └── .env
```

---

## Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
```

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000
```

Run frontend:

```
npm start
```

---


## Deployment

### Frontend

Deploy using **Vercel**

### Backend

Deploy using **Render**

### Database

Use **MongoDB Atlas**

---

## Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
```

### Frontend (.env)

```
REACT_APP_API_URL=your_backend_url
```



## 👨‍💻 Author

Developed by **Jeeva**

