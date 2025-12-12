@echo off
REM HealBuddy Installation Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          HealBuddy - Installation & Setup Script           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Install Backend Dependencies
echo [1/3] Installing Backend Dependencies...
cd server
call npm install
if errorlevel 1 (
    echo Error: Failed to install backend dependencies
    exit /b 1
)
cd ..

REM Create Backend .env
if not exist "server\.env" (
    echo [2/3] Creating Backend Configuration (.env)...
    copy server\.env.example server\.env
    echo Please update server\.env with your configuration
) else (
    echo [2/3] Backend Configuration already exists
)

REM Install Frontend Dependencies
echo [3/3] Installing Frontend Dependencies...
cd client
call npm install
if errorlevel 1 (
    echo Error: Failed to install frontend dependencies
    exit /b 1
)
cd ..

REM Create Frontend .env
if not exist "client\.env" (
    echo Creating Frontend Configuration (.env)...
    copy client\.env.example client\.env
) else (
    echo Frontend Configuration already exists
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║              Installation Complete! ✓                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo Next Steps:
echo 1. Update server\.env with your MongoDB URI and JWT Secret
echo 2. Start Backend: cd server && npm run dev
echo 3. Start Frontend: cd client && npm start
echo 4. Open http://localhost:3000 in your browser
echo.
echo For detailed setup guide, see SETUP_GUIDE.md
echo.
pause
