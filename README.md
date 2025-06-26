# LoopLine: Manager-Employee Feedback Platform

LoopLine is a full-stack feedback management system designed to facilitate structured performance feedback between managers and employees within an organization. It provides role-based access, secure authentication, feedback submission, team management, and insights into employee performance.

---

## 🚀 Tech Stack

### Frontend: [React.js](https://reactjs.org/)
- **React Router** for routing
- **Tailwind CSS** for UI styling
- **Axios** for API communication
- **JWT-decode** for decoding access tokens
- **html2pdf / html2canvas** for exporting feedback as PDF
- **React Icons** for UI icons

### Backend: [FastAPI](https://fastapi.tiangolo.com/)
- **Python 3.11+**
- **FastAPI** for building APIs
- **SQLAlchemy ORM** for database models
- **JWT (PyJWT)** for authentication
- **Passlib** for password hashing
- **Pydantic** for request/response validation
- **Uvicorn** as the ASGI server

### Database:
- **PostgreSQL** (running inside Docker container)
- **psycopg2** as the PostgreSQL driver

### Docker:
- Backend and database are containerized using **Docker**
- **Docker Compose** is used to manage multi-container setup

---

---

## 🔐 Features

- Role-based login (Manager & Employee)
- Feedback submission and history
- Acknowledgement and editable feedback
- PDF export of feedback reports
- Manager can:
  - Add employees to their team
  - View only their team’s data
- Employee can:
  - View and acknowledge received feedback

---

## ⚙️ Setup Instructions

### Prerequisites
- Docker & Docker Compose
- Node.js (for frontend development outside Docker)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/loopline.git
cd loopline
 Run Backend & PostgreSQL in Docker
bash
Copy
Edit
cd server
docker-compose up --build


Start the Frontend (React)
bash
Copy
Edit
cd client
npm install
npm run dev
