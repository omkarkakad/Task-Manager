# 📝 Task Manager Application

A fully functional, full-stack Task Manager web application built using **React.js** for the frontend and **Flask (Python)** for the backend. This application allows users to add, update, delete, and manage tasks with details such as status, priority, and timestamps. It also features a responsive design and a light/dark theme toggle.

---

## 📌 Features

- ✅ Add new tasks with title, status, and priority
- 📝 Edit tasks inline
- ❌ Delete tasks with confirmation
- 📋 View all tasks in a scrollable list
- 🔍 Search tasks by title
- 🎯 Filter tasks based on status/priority (customizable)
- 💡 Toggle between Light and Dark mode
- 🕒 Displays created and updated timestamps
- 🔗 RESTful API integration (Flask)
- 🗃️ SQLite as lightweight backend database

---

## 🛠️ Technologies Used

| Frontend       | Backend     | Database | Others         |
|----------------|-------------|----------|----------------|
| React.js       | Python Flask| SQLite   | Axios, CSS     |
| HTML, CSS      | Flask-CORS  |          | Render, GitHub |

---

## 📁 Project Structure
task-manager/
├── frontend/
├──task_manager
│ ├── src/
│ │ ├── App.jsx
│ │ └── App.css
│ ├── public/
│ ├── package.json
│ └── README.md
├── backend/
│ ├── app/
│ │ └── app.py
│ ├── requirements.txt
│ └── README.md


🧪 Known Issues
❗ No user authentication (yet)
❗ Tasks cannot be sorted by status or date
❗ No task edit cancellation confirmation

🔮 Future Enhancements
🔐 User login/signup system
📆 Task scheduling & reminders
📊 Analytics for task completion
📲 Progressive Web App (PWA) support

🛠️ Technologies Used
🔹 Frontend
React.js – Component-based UI development
Axios – HTTP client for API requests
HTML5 – Markup for structuring content
CSS3 – Styling and layout
JavaScript (ES6+) – Logic and interactivity
Responsive Design – Media queries for mobile/tablet support

🔹 Backend
Python 3.x – Backend programming language
Flask – Micro web framework for REST APIs
Flask-CORS – Middleware to handle CORS issues
SQLite3 – Lightweight, file-based relational database
Datetime – Timestamp generation for created/updated dates

🔹 DevOps & Deployment
Git & GitHub – Version control and code hosting
Render – Cloud platform for backend deployment
npm – Node.js package manager for frontend build
React Scripts – For frontend development and production build


