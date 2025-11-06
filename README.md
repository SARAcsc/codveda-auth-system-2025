# Authentication System

A full-stack authentication system built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Responsive single-page interface
- Local MongoDB database

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs for password hashing

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```
codveda-auth-system-2025/
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── user.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   └── auth.js
│   └── package.json
├── frontend/
│   └── index.html
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally

### Setup

1. Clone the repository
```bash
git clone https://github.com/SARAcsc/codveda-auth-system-2025.git
cd codveda-auth-system-2025
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Start MongoDB (if not running as a service)
```bash
mongod
```

4. Start the backend server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

5. Open the frontend
- Navigate to the `frontend` folder
- Open `index.html` with Live Server in VS Code
- Or simply open `index.html` in your browser

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/auth/protected` | Access protected resource | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |

## Usage

1. **Register**: Create a new account with email and password
2. **Login**: Authenticate and receive a JWT token
3. **Access Protected Routes**: Use the token to access protected endpoints

The JWT token is automatically stored in localStorage and included in subsequent requests.

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=your_jwt_secret_here
```

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 7 days
- Protected routes require valid authentication
- CORS enabled for development

## Development

```bash
# Start backend in development mode
cd backend
npm run dev

# The server will restart automatically on file changes
```

## Author

**Sara Yahia**  
GitHub: [@SARAcsc](https://github.com/SARAcsc)

## License

This project is open source and available under the MIT License.