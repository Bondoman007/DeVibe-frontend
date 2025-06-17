# DeVibe 💬 - Developer Matching Platform

DeVibe is a developer-centric matching platform inspired by Tinder, allowing developers to connect by swiping left or right on profiles. The platform enables secure authentication, real-time chatting, and efficient connection management.

## 🚀 Features
- 🔒 Secure authentication system
- 🤝 Profile swiping for matching developers
- ✅ Connection requests management (accept/reject)
- 💬 Real-time chat powered by Socket.io
- 📡 Scalable backend to handle multiple users

## 🛠 Tech Stack
### Frontend (DeVibe-frontend)
- React.js
- Redux for state management
- TailwindCSS for styling
- JWT auth

### Backend (DeVibe-backend)
- Node.js with Express.js
- MongoDB for database management
- Socket.io for real-time messaging
- JWT for secure authentication
- Postman for API testing

## 📂 Repository Structure
```
DeVibe/
├── DeVibe-frontend/  # Frontend React App
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── DeVibe-backend/   # Backend Node.js API
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md         # Main project README
```

## 🚀 Getting Started
### Clone Repositories
```sh
git clone https://github.com/Bondoman007/DeVibe-frontend.git
git clone https://github.com/Bondoman007/DeVibe-backend.git
```

### Setup Backend
```sh
cd DeVibe-backend
npm install
npm start
```

### Setup Frontend
```sh
cd ../DeVibe-frontend
npm install
npm start
```



## 🎯 Challenges Faced
- Designing a **secure authentication system** with JWT.
- Implementing **real-time swiping and matching logic**.
- Managing **scalability** for handling multiple concurrent users.
- Creating a **robust chat system** with Socket.io.

## 🚀 Future Enhancements
- 📱 Mobile-friendly UI improvements.
- 🌍 Expand search filters for better matchmaking.
- 📊 Dashboard for tracking developer activity.

## 📜 License
This project is open-source and available under the MIT License.

---
🚀 Developed by [Kanishk Shrivastava](https://github.com/Bondoman007)
