# HealBuddy - Setup & Installation Guide

## Quick Start

### 1. Install MongoDB

**Option A: Local Installation**
- Download from https://www.mongodb.com/try/download/community
- Follow installation instructions for your OS
- Ensure MongoDB service is running

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string
- Update `MONGODB_URI` in `.env`

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Update .env with your configuration:
# - MONGODB_URI
# - JWT_SECRET (generate a random string)
# - NODE_ENV=development

# Start development server
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Start development server
npm start
```

App will open at `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healbuddy
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
OPENAI_API_KEY=sk-xxx (optional)
HUGGINGFACE_API_KEY=xxx (optional)
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Features

### Dashboard
- 🏥 Symptom quick selection
- 📊 Health statistics
- 🔍 Symptom tracking

### Symptoms
- Select from 10+ common symptoms
- Set severity level
- Track duration
- Get immediate first aid tips

### AI Chatbot
- 24/7 health assistance
- Symptom-specific guidance
- Conversation history

### Medical Reports
- Upload reports (PDF, JPG, PNG)
- AI analysis and scanning
- Summary generation
- Key findings extraction

### User Profile
- Manage personal information
- Medical history
- Current medications

## Symptoms Available

1. **Fever** - Tips for managing high temperature
2. **Cough** - Cough management solutions
3. **Sprain** - RICE protocol guidance
4. **Headache** - Headache relief techniques
5. **Nausea** - Nausea management
6. **Vomiting** - Vomiting care
7. **Rash** - Skin care guidance
8. **Chills** - Temperature regulation tips
9. **Fatigue** - Energy restoration advice
10. **Body Ache** - Pain management

## API Structure

### Auth Routes (`/api/auth`)
- `POST /register` - Create account
- `POST /login` - User login
- `GET /me` - Current user info

### Patient Routes (`/api/patients`)
- `GET /dashboard/:userId` - Patient dashboard
- `GET /:userId` - Patient profile
- `PUT /:userId` - Update profile

### Symptom Routes (`/api/symptoms`)
- `GET /:userId` - List symptoms
- `POST /` - Record symptom
- `GET /:userId/:symptomId` - Symptom details
- `PUT /:symptomId` - Update symptom
- `POST /:symptomId/solutions` - Get solutions

### Report Routes (`/api/reports`)
- `GET /:userId` - List reports
- `POST /upload/:userId` - Upload report
- `GET /:userId/:reportId` - Report details
- `POST /:reportId/scan` - Scan with AI

### Chatbot Routes (`/api/chatbot`)
- `POST /conversation/start` - Start chat
- `GET /:userId/:conversationId` - Get messages
- `POST /message` - Send message

### AI Routes (`/api/ai`)
- `POST /analyze-report/:reportId` - Report analysis
- `POST /assess-symptoms` - Symptom assessment

## Database Models

### User
- name, email, password
- age, gender, phone
- role (patient/doctor/admin)
- medicalHistory, medications
- isVerified

### Symptom
- userId, symptomName
- severity, duration
- description, affectedArea
- startDate, status

### Report
- userId, fileName, fileUrl
- reportType, uploadDate
- aiSummary, findings
- recommendations, scanStatus
- confidence

### ChatMessage
- userId, conversationId
- message, sender (user/bot)
- timestamp, sentiment

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access if using Atlas

**CORS Error**
- Backend and frontend URLs must match
- Check REACT_APP_API_URL in client .env

**Port Already in Use**
- Change PORT in server .env
- Update REACT_APP_API_URL accordingly

**npm install fails**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again

## Future Integration Points

### AI Services
- OpenAI GPT-4 for chatbot
- Hugging Face for medical NLP
- Medical image recognition APIs

### External Services
- Email verification
- SMS notifications
- Payment processing
- Video consultation platforms

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **API Testing**: Use Postman or similar tool
3. **Debugging**: Use Chrome DevTools and Node debugger
4. **Logging**: Check browser console and terminal

## Deployment

### Backend (Heroku)
1. Create Heroku account
2. Install Heroku CLI
3. Set environment variables
4. Deploy: `git push heroku main`

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy build folder to Vercel or Netlify
3. Set environment variables in platform

---

Happy coding! 🚀
