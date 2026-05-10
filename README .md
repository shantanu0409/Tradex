# 📈 Tradex - Full-Stack Stock Trading Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Socket.IO](https://img.shields.io/badge/RealTime-Socket.IO-black)
![License](https://img.shields.io/badge/License-MIT-green)

Tradex was built to simulate a real-world stock trading platform and to showcase professional software engineering skills. It combines frontend development, backend architecture, database design, and real-time communication into a single production-style application. 


---

## 🚀 Project Overview

Tradex consists of three major applications integrated seamlessly:

### 1. Frontend (Landing Website)
The marketing and onboarding website where users can:
- Explore the platform and its features.
- Sign up and log in securely.

### 2. Dashboard (Trading Platform)
The core authenticated application where users can:
- View live market data and track stocks in real-time.
- Manage holdings, positions, and account funds.
- Place buy and sell orders.
- Maintain personalized watchlists and set custom price alerts.
- Analyze portfolio performance with interactive charts.

### 3. Backend (REST API Server)
The robust Node.js server handling:
- Passport-based authentication and authorization.
- Database operations and complex business logic for orders and portfolios.
- Real-time stock data broadcasting via WebSockets.
- Automated alert monitoring and email notifications.

---

## ✨ Key Features

* **Authentication & Security:** User registration/login, session management, protected API routes, input sanitization, and rate limiting against abuse.
* **Trading Engine:** Processing for buy/sell orders, automatic updating of holdings and positions, and portfolio analytics.
* **Price Alerts & Notifications:** Custom user-defined triggers with a background monitoring service and Nodemailer integration for email alerts.
* **Real-Time Data Streams:** Socket.IO integration for live stock price updates and dynamic portfolio recalculation without page refreshes.
* **Analytics & Visualization:** Interactive stock and portfolio allocation charts using Chart.js.

---

## 🛠️ Technology Stack

**Frontend & Dashboard:**
* React.js & React Router DOM
* Axios (API calls)
* Socket.IO Client (WebSockets)
* Chart.js (Data Visualization)
* Material UI & Custom CSS

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (ODM)
* Passport.js (Authentication)
* Nodemailer (Email Services)
* dotenv & CORS

---

## ⚙️ Getting Started (Local Setup)

Follow these steps to get the project up and running on your local machine.

### Prerequisites
* **Node.js** (v16.0 or higher)
* **MongoDB** (Local instance or MongoDB Atlas cluster)
* **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/tradex.git
cd tradex
```

### 2. Install Dependencies
You will need to install dependencies for all three parts of the application.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install dashboard dependencies
cd ../dashboard
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root of each respective directory and configure the variables.

**Backend (`backend/.env`):**
```env
PORT=3002
MONGO_URL=mongodb://localhost:27017/tradex
SESSION_SECRET=your_super_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend (`frontend/.env`):**
```env
REACT_APP_API_URL=http://localhost:3002/api
```

**Dashboard (`dashboard/.env`):**
```env
REACT_APP_API_URL=http://localhost:3002/api
REACT_APP_SOCKET_URL=http://localhost:3002
```

### 4. Running the Application
Open three separate terminal windows to run the servers concurrently.

```bash
# Terminal 1: Start Backend Server
cd backend
npm run dev

# Terminal 2: Start Landing Website
cd frontend
npm start

# Terminal 3: Start Trading Dashboard
cd dashboard
npm start
```

---

## 📡 API Reference Overview

The backend exposes modular REST endpoints. Below are the primary route modules:

* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate user
* `GET /api/stock/live` - Fetch real-time stock quotes
* `POST /api/orders/buy` - Execute a buy order
* `POST /api/orders/sell` - Execute a sell order
* `GET /api/portfolio/summary` - Get user holdings and P&L
* `POST /api/watchlist/add` - Add stock to user watchlist
* `POST /api/alerts/create` - Set a new price alert trigger

---

## 📂 Project Structure

```text
Tradex/
├── backend/                  # API server, WebSocket logic, DB models
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── services/
│   ├── index.js
│   └── package.json
├── frontend/                 # Public landing website (React)
│   ├── src/
│   │   ├── landing_page/
│   │   ├── api.js
│   │   └── App.js
│   └── package.json
├── dashboard/                # Authenticated trading dashboard (React)
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── api.js
│   │   └── socket.js
│   └── package.json
├── README.md
└── LICENSE
```

## 🔮 Future Enhancements

* **Live Market APIs:** Transition from simulated data to live historical API feeds (e.g., Alpha Vantage, Polygon.io).
* **Advanced Charting:** Integrate TradingView lightweight charts for technical analysis.
* **Trade History Export:** Allow users to download their transaction history as CSV or PDF.
* **Mobile Application:** Expand the platform using React Native.
* **Cloud Deployment:** Containerize with Docker and deploy to AWS or Render.

---

## 👨‍💻 Author

**Vaishanvi**
* GitHub: [@shantanu0409](https://github.com/shantanu0409)
* LinkedIn: [shantanuhalgaonkar](https://linkedin.com/in/shantanuhalgaonkar)

---

## 📝 License
This project is licensed under the MIT License - see the `LICENSE` file for details.
