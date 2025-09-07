# Getting Started with AI Resume Builder

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally)
- Google Gemini API key (for AI features)

## Quick Start

1. **Run the automated script**
   - Simply double-click the `run-project.bat` file to start all services
   - This will start MongoDB, Backend, and Frontend servers

2. **Manual Setup**

   **Backend:**
   ```bash
   cd Backend
   npm install
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

3. **Configure Environment Variables**

   **Backend (.env):**
   - `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/resumedb)
   - `PORT`: Backend server port (default: 5000)
   - `JWT_SECRET_KEY`: Secret key for JWT authentication
   - `JWT_SECRET_EXPIRES_IN`: JWT token expiration (default: "1d")
   - `ALLOWED_SITE`: Frontend URL for CORS (default: http://localhost:5173)

   **Frontend (.env):**
   - `VITE_GEMENI_API_KEY`: Your Google Gemini API key
   - `VITE_APP_URL`: Backend API URL (default: http://localhost:5000/)

## Accessing the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Troubleshooting

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running: `mongod --version`
   - Check if the connection string in Backend/.env is correct

2. **API Connection Issues**
   - Verify that Backend and Frontend ports match in the .env files
   - Check CORS settings in Backend/src/app.js

3. **AI Features Not Working**
   - Ensure you have a valid Google Gemini API key in Frontend/.env
   - Check browser console for any errors