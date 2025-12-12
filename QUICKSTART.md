# HealBuddy - Quick Start Guide 🚀

## 📋 Project Summary

**HealBuddy** is an AI-powered healthcare platform built with the MERN stack that helps patients:
- Track and manage health symptoms
- Get immediate medical guidance
- Chat with an AI health assistant
- Upload and scan medical reports with AI analysis
- Maintain comprehensive health records

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **User Authentication** | Secure register/login with JWT tokens |
| **Symptom Dashboard** | Quick selection from 10+ common symptoms |
| **Quick Solutions** | Immediate first aid for each symptom |
| **AI Chatbot** | 24/7 health consultation assistant |
| **Report Scanner** | AI analysis of medical documents |
| **User Profile** | Complete health record management |

## 📁 Project Structure

```
HealBuddy/
├── server/                 # Node.js/Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth & validation
│   ├── config/            # Database config
│   └── server.js          # Main entry point
│
├── client/                # React frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API client
│   │   └── App.js        # Main app component
│   └── public/           # Static files
│
└── Documentation files (README, SETUP_GUIDE, etc.)
```

## 🚀 Quick Start (5 minutes)

### Step 1: Prerequisites
- **Node.js** v14+ (download from nodejs.org)
- **MongoDB** (local or MongoDB Atlas cloud)

### Step 2: Clone & Navigate
```bash
cd "e:\AIML Projects\HealBuddy"
```

### Step 3: Run Installation Script
**Windows:**
```bash
install.bat
```

**macOS/Linux:**
```bash
chmod +x install.sh
./install.sh
```

### Step 4: Configure Environment

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healbuddy
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

**Frontend** (`client/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start Both Servers

**Option A: Separate Terminals**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

**Option B: Single Command** (requires concurrently)
```bash
npm install concurrently --save-dev
npm run dev
```

### Step 6: Open in Browser
```
http://localhost:3000
```

## 👤 Test User Flow

1. **Register** - Create new account
2. **Dashboard** - See health overview
3. **Quick Symptom Selection** - Choose a symptom (e.g., Fever)
4. **View Solutions** - Get immediate first aid tips
5. **Chat with AI** - Ask health questions
6. **Upload Reports** - Scan medical documents
7. **Update Profile** - Manage health information

## 🛠️ Available Commands

### Backend
```bash
npm run dev      # Development with hot reload
npm start        # Production mode
npm test         # Run tests
```

### Frontend
```bash
npm start        # Development server (port 3000)
npm build        # Build for production
npm test         # Run tests
```

### Root Project
```bash
npm run dev      # Run both backend & frontend
npm run server   # Backend only
npm run client   # Frontend only
```

## 📊 Symptoms Available

The app includes quick selections for:
- 🤒 Fever
- 🤧 Cough
- 💨 Sprain
- 🤕 Headache
- 🤢 Nausea
- 🤮 Vomiting
- 🔴 Rash
- 😰 Chills
- 😴 Fatigue
- 😫 Body Ache

## 🌐 Main Routes

| URL | Purpose |
|-----|---------|
| `/login` | User login |
| `/register` | Create account |
| `/dashboard` | Health overview |
| `/upload-report` | Medical report upload |
| `/chatbot` | AI health assistant |
| `/profile` | User profile management |

## 🔌 API Endpoints Overview

```
Authentication:
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/me

Symptoms:
  GET    /api/symptoms/:userId
  POST   /api/symptoms
  GET    /api/symptoms/:userId/:symptomId
  POST   /api/symptoms/:symptomId/solutions

Reports:
  GET    /api/reports/:userId
  POST   /api/reports/upload/:userId
  POST   /api/reports/:reportId/scan

Chatbot:
  POST   /api/chatbot/conversation/start
  POST   /api/chatbot/message

AI Analysis:
  POST   /api/ai/analyze-report/:reportId
  POST   /api/ai/assess-symptoms
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running
- Local: mongod command
- Atlas: Check connection string and firewall
```

### Port Already in Use
```
Solution: Change PORT in server/.env
Update REACT_APP_API_URL in client/.env accordingly
```

### CORS Errors
```
Solution: Verify API URLs match
- Frontend REACT_APP_API_URL
- Backend server address
```

### npm install fails
```
Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- **README.md** - Full project documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **ARCHITECTURE.md** - System design and architecture
- **CONTRIBUTING.md** - Contributing guidelines
- **CHANGELOG.md** - Version history

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healbuddy
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
OPENAI_API_KEY=your_openai_key (optional)
HUGGINGFACE_API_KEY=your_huggingface_key (optional)
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Next Steps

1. ✅ Setup complete
2. Explore the codebase
3. Add more symptoms/solutions
4. Integrate AI services (OpenAI, Hugging Face)
5. Add doctor features
6. Deploy to production

## 📞 Support Resources

- GitHub Issues - Bug reports
- Documentation - Setup & Architecture
- Contributing - Development guidelines

## 🚀 Deployment

### Docker
```bash
docker-compose up
```

### Heroku (Backend)
```bash
heroku create healbuddy-api
git push heroku main
```

### Vercel/Netlify (Frontend)
- Upload `client/build` folder
- Set environment variables

## ⭐ Features Roadmap

- [ ] OpenAI GPT-4 integration
- [ ] Medical image recognition
- [ ] Doctor consultation booking
- [ ] Prescription management
- [ ] Health reminders
- [ ] Mobile app
- [ ] Telemedicine
- [ ] Multi-language support

## 💡 Tips

1. **API Testing**: Use Postman or Thunder Client
2. **Database**: Use MongoDB Compass for visual exploration
3. **Debugging**: Chrome DevTools + Node Inspector
4. **Hot Reload**: Changes auto-reload in development
5. **Logs**: Check terminal for detailed error messages

---

## 🎉 You're All Set!

Your HealBuddy application is ready to run. Start the servers and begin exploring the features.

**Questions?** Check the documentation files or refer to the SETUP_GUIDE.md

**Happy coding!** 🚀
