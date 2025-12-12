# HealBuddy - Contribution Guidelines

## Welcome to HealBuddy!

We're excited to have you contribute to HealBuddy. This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**: `git clone <your-fork-url>`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes**
5. **Commit your changes**: `git commit -m "Add your commit message"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Submit a Pull Request**

## Code Style Guidelines

### JavaScript/React
```javascript
// Use consistent naming
const getUserData = async (userId) => {
  try {
    // implementation
  } catch (error) {
    // error handling
  }
};

// Use arrow functions
const handleClick = () => { /* code */ };

// Use template literals
const message = `Hello, ${name}!`;
```

### File Organization
- Keep files small and focused
- One component per file
- Group related functionality
- Use descriptive names

### Comments
```javascript
// Use comments for "why" not "what"
// Correct
// User role needed to check permissions
const isAuthorized = user.role === 'admin';

// Avoid
// Check if user is admin
const isAuthorized = user.role === 'admin';
```

## Testing

- Write tests for new features
- Maintain >80% code coverage
- Test edge cases
- Include both positive and negative tests

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass: `npm test`
4. Update CHANGELOG.md
5. Request review from maintainers

## Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment info (OS, Node version, etc.)

## Feature Requests

Include:
- Clear use case
- Why it's needed
- Proposed implementation
- Examples of similar features

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions
- `chore`: Build, dependencies, etc.

### Example
```
feat(symptom): add symptom filtering by severity

Add filter functionality to symptom list allowing users to view
symptoms by severity level (Mild, Moderate, Severe).

Closes #123
```

## Development Workflow

### Backend Development
```bash
cd server
npm run dev  # Start with hot reload
npm test     # Run tests
```

### Frontend Development
```bash
cd client
npm start    # Start dev server
npm test     # Run tests
```

## Areas for Contribution

- [ ] AI Integration (OpenAI, Hugging Face)
- [ ] Additional symptoms and solutions
- [ ] Doctor dashboard
- [ ] Prescription management
- [ ] Health reminders
- [ ] Mobile app
- [ ] Documentation
- [ ] Tests
- [ ] UI/UX improvements
- [ ] Performance optimization

## Questions?

- Check existing issues and discussions
- Create a new discussion for questions
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to HealBuddy! 🎉
