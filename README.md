# HealBuddy - AI-Powered Healthcare Platform

A comprehensive healthcare management application built with the MERN stack, featuring an intelligent symptom diagnosis system, AI chatbot, and medical report scanner.

## Features

### 👥 User Dashboard
- Quick symptom selection from predefined options (Fever, Cough, Sprain, etc.)
- Real-time symptom tracking and management
- Active and historical symptom records
- Personalized dashboard with health statistics

### 🏥 Symptom Management
- Detailed symptom recording with severity levels (Mild, Moderate, Severe)
- Quick solutions and immediate first aid recommendations
- Duration and date tracking
- Status updates (Active, Resolved, Monitoring)

### 🤖 AI Chatbot
- 24/7 health consultation with AI assistant
- Natural language understanding
- Symptom-specific guidance
- Conversation history tracking

### 📄 Medical Report Scanner
- Upload medical reports (PDF, JPG, PNG)
- AI-powered report analysis
- Automatic summary generation
- Key findings and recommendations extraction
- Confidence scoring

### 👤 User Profiles
- Complete patient information management
- Medical history tracking
- Current medications management
- Personal health records

## Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Dropzone** - File uploads
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **Bcryptjs** - Password hashing

## Project Structure

```
HealBuddy/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Symptom.js
│   │   ├── Report.js
│   │   └── ChatMessage.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── symptoms.js
│   │   ├── reports.js
│   │   ├── chatbot.js
│   │   └── ai.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SymptomDetail.js
│   │   │   ├── ReportUpload.js
│   │   │   ├── ChatBot.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/healbuddy
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Patients
- `GET /api/patients/dashboard/:userId` - Get patient dashboard
- `GET /api/patients/:userId` - Get patient profile
- `PUT /api/patients/:userId` - Update patient profile

### Symptoms
- `GET /api/symptoms/:userId` - Get all symptoms
- `POST /api/symptoms` - Create new symptom
- `GET /api/symptoms/:userId/:symptomId` - Get symptom details
- `PUT /api/symptoms/:symptomId` - Update symptom
- `POST /api/symptoms/:symptomId/solutions` - Get solutions

### Reports
- `GET /api/reports/:userId` - Get all reports
- `POST /api/reports/upload/:userId` - Upload report
- `GET /api/reports/:userId/:reportId` - Get report details
- `POST /api/reports/:reportId/scan` - Scan report with AI

### Chatbot
- `POST /api/chatbot/conversation/start` - Start new conversation
- `GET /api/chatbot/:userId/:conversationId` - Get messages
- `POST /api/chatbot/message` - Send message

### AI
- `POST /api/ai/analyze-report/:reportId` - Analyze medical report
- `POST /api/ai/assess-symptoms` - Assess symptoms

## Key Features Details

### Symptom Quick Selection
Users can select from predefined symptoms:
- Fever
- Cough
- Sprain
- Headache
- Nausea
- Vomiting
- Rash
- Chills
- Fatigue
- Body Ache

### Immediate Aid System
Each symptom comes with immediate first aid instructions and solutions specific to the condition.

### AI Report Scanner
Upload medical reports to receive:
- Automatic text extraction
- Summary generation
- Key findings identification
- Recommendations
- Confidence scoring

## Future Enhancements

- [ ] Integration with real AI services (OpenAI, Hugging Face)
- [ ] Advanced image recognition for medical reports
- [ ] Doctor consultation booking system
- [ ] Prescription management
- [ ] Health reminders and alerts
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Telemedicine features
- [ ] Analytics and health insights

## Contributing

This is a template project. Feel free to fork and customize it according to your needs.

## License

ISC

## Support

For issues and questions, please create an issue in the repository.

---

**Disclaimer**: HealBuddy is designed for informational purposes only. Always consult with qualified healthcare professionals for medical diagnosis and treatment.
