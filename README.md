# 📝 Task Manager App

A full-stack **Task Management Application** with a secure **FastAPI backend**, **React frontend**, and complete testing + reporting support. This app allows users to register, log in, manage tasks, update profiles, and generate reports — all through a clean, modern, and responsive UI.

---

## 🌐 Live Demo

🚧 _Coming Soon_ — Deploying on **Vercel (frontend)** and **Render / Railway (backend)**

---

## 📌 Features

### ✅ Backend (FastAPI + SQLite/MySQL)
- JWT-based Authentication (Login/Register)
- Profile Management (Update Info, Change Password)
- CRUD Operations on Tasks
- Role-based Task View (Future enhancement)
- RESTful API
- HTML & PDF Test Reports (with `pytest` and `pdfkit`)
- Proper error handling and validation

### 🎨 Frontend (React + Tailwind CSS)
- Fully responsive, clean UI
- Dashboard for task listing and management
- Forms for login, registration, and task creation
- Alerts and feedback to users
- User-friendly and intuitive navigation

### 🧪 Testing
- Automated backend tests with `pytest`
- HTML test report with `pytest-html`
- PDF report generation with `pdfkit` + `wkhtmltopdf`

---

## 🏗️ Project Structure


task-manager-app/
├── backend/
│ ├── app/ # FastAPI App (routes, models, auth, DB)
│ ├── tests/ # Pytest test cases
│ ├── report.html # Generated HTML test report
│ ├── report.pdf # Generated PDF report
│ ├── run_tests.py # Script to run tests & generate reports
│ └── main.py # FastAPI main entry point
├── frontend/
│ └── src/ # React components, pages, and assets
│ └── App.js # Main React app


---

## ⚙️ Installation & Setup

### Backend (FastAPI)

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   cd task-manager-app/backend

2. **Create virtual environment**
    ```bash
    python -m venv venv
    venv/Scripts/activate
    
3. **Install dependencies**
    ```bash
    pip install -r requirements.txt

4. **Run FastAPI server**
    ``bash
    uvicorn main:app --reload

5. **Access API Docs**
    ```bash
    http://127.0.0.1:8000/docs


### Frontend (React)
1. **Navigate to frontend directory**
    ```bash
    cd ../frontend

2. **Install dependencies**
    ```bash
    npm install

3. **Start development server**
    ```bash
    npm run dev
4. **Visit frontend**
    ```bash
    http://localhost:3000

### Tech Stack

| Layer      | Tech                        |
| ---------- | --------------------------- |
| Frontend   | React, Tailwind CSS         |
| Backend    | FastAPI, SQLAlchemy, JWT    |
| Database   | SQLite (dev) / MySQL (prod) |
| Testing    | Pytest, pytest-html         |
| PDF Export | pdfkit, wkhtmltopdf         |

### Screenshots



### Author

- Rohan Dhadke

- Email: rohandhadke7620@gmail.com






