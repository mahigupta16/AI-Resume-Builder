@echo off
echo Starting AI Resume Builder...

echo Starting MongoDB...
start mongod

echo Starting Backend Server...
cd Backend
start cmd /k npm run dev

echo Starting Frontend Server...
cd ../Frontend
start cmd /k npm run dev

echo AI Resume Builder is starting up!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173