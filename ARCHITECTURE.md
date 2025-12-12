# HealBuddy - Architecture & Implementation Guide

## Project Overview

HealBuddy is a comprehensive MERN-based healthcare application that helps patients track symptoms, receive immediate medical guidance through an AI chatbot, and get AI-powered analysis of medical reports.

## Core Components

### 1. Authentication System
- JWT-based authentication
- Password hashing with bcryptjs
- Token validation middleware
- User roles support (patient/doctor/admin)

### 2. Dashboard Module
- Real-time symptom overview
- Quick symptom selection interface
- Active/inactive symptom tracking
- Health statistics display

### 3. Symptom Management
- Predefined symptom catalog
- Severity classification (Mild/Moderate/Severe)
- Duration tracking
- Status management (Active/Resolved/Monitoring)
- Immediate aid recommendations

### 4. AI Chatbot
- Context-aware responses
- Symptom-specific guidance
- Conversation history management
- Natural language processing ready

### 5. Medical Report Scanner
- Multi-format support (PDF, JPG, PNG)
- File upload handling with validation
- AI analysis framework
- Summary and finding extraction

### 6. User Profile Management
- Personal information management
- Medical history tracking
- Current medications logging
- Health data visualization

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  gender: String,
  phone: String,
  role: String (enum: patient/doctor/admin),
  profilePicture: String,
  medicalHistory: Array,
  medications: Array,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Symptom Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  symptomName: String,
  severity: String (enum: Mild/Moderate/Severe),
  duration: String,
  description: String,
  affectedArea: String,
  startDate: Date,
  additionalSymptoms: Array,
  status: String (enum: Active/Resolved/Monitoring),
  createdAt: Date,
  updatedAt: Date
}
```

### Report Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  fileName: String,
  fileUrl: String,
  reportType: String,
  uploadDate: Date,
  aiSummary: String,
  findings: Array,
  recommendations: Array,
  scanStatus: String (enum: Pending/Processing/Completed/Error),
  confidence: Number (0-100),
  createdAt: Date,
  updatedAt: Date
}
```

### ChatMessage Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  conversationId: String,
  message: String,
  sender: String (enum: user/bot),
  timestamp: Date,
  sentiment: String (enum: Positive/Negative/Neutral),
  createdAt: Date,
  updatedAt: Date
}
```

## API Response Format

All API responses follow a consistent format:

### Success Response (2xx)
```json
{
  "message": "Operation successful",
  "data": { /* actual data */ },
  "statusCode": 200
}
```

### Error Response (4xx/5xx)
```json
{
  "message": "Error description",
  "error": "error_type",
  "statusCode": 400
}
```

## File Upload Handling

- **Max Size**: 5MB
- **Allowed Types**: PDF, JPG, JPEG, PNG
- **Storage**: Local disk (uploads/reports/)
- **Validation**: MIME type and file extension checking

## Security Measures

1. **Password Security**
   - Hashed with bcryptjs (10 salt rounds)
   - Minimum 6 characters
   - Never stored in plain text

2. **Authentication**
   - JWT tokens with 7-day expiration
   - Token validation on protected routes
   - Secure token storage in localStorage

3. **Request Validation**
   - express-validator for input sanitization
   - Email format validation
   - Required field checking

4. **Security Headers**
   - Helmet.js for HTTP headers
   - CORS configuration
   - Content Security Policy

## Error Handling

### Backend Error Handling
- Centralized error middleware
- Consistent error response format
- Detailed logging in development
- Graceful degradation in production

### Frontend Error Handling
- Try-catch blocks in async operations
- User-friendly error messages
- Toast notifications for feedback
- Fallback UI states

## Performance Optimization

1. **Frontend**
   - Code splitting with React.lazy
   - Image optimization
   - Lazy loading of routes
   - CSS minification

2. **Backend**
   - Database indexing
   - Query optimization
   - Caching strategies
   - Connection pooling

## Scalability Considerations

1. **Horizontal Scaling**
   - Stateless API design
   - Session storage in database
   - Load balancing ready

2. **Data Management**
   - Pagination support
   - Bulk operations
   - Data archival strategies

3. **Cloud Deployment**
   - Environment-based configuration
   - Database separation
   - CDN support ready

## Integration Points for AI Services

### OpenAI Integration
```javascript
// Future implementation
const response = await openai.createChatCompletion({
  model: "gpt-4",
  messages: conversationHistory
});
```

### Hugging Face Integration
```javascript
// Future implementation
const analysis = await huggingface.textClassification({
  model: "medical-classification",
  inputs: reportText
});
```

### Medical Image Recognition
```javascript
// Future implementation
const findings = await medicalVision.analyze({
  image: reportImage,
  type: "xray"
});
```

## Testing Strategy

### Unit Tests
- Model validations
- Service functions
- Utility functions

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### End-to-End Tests
- Complete user workflows
- Multi-step operations
- Error scenarios

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migration completed
- [ ] HTTPS enabled
- [ ] API rate limiting set
- [ ] Error logging configured
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Documentation updated

## Maintenance

### Regular Tasks
- Database optimization
- Log rotation
- Security updates
- Dependency updates

### Monitoring
- Error tracking (Sentry/LogRocket)
- Performance monitoring (New Relic)
- User analytics (Mixpanel/Amplitude)
- Uptime monitoring

---

For more details, refer to specific component documentation.
