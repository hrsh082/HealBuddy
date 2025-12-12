#!/bin/bash

# HealBuddy Installation Script for macOS/Linux

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          HealBuddy - Installation & Setup Script           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Install Backend Dependencies
echo "[1/3] Installing Backend Dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install backend dependencies"
    exit 1
fi
cd ..

# Create Backend .env
if [ ! -f "server/.env" ]; then
    echo "[2/3] Creating Backend Configuration (.env)..."
    cp server/.env.example server/.env
    echo "Please update server/.env with your configuration"
else
    echo "[2/3] Backend Configuration already exists"
fi

# Install Frontend Dependencies
echo "[3/3] Installing Frontend Dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Create Frontend .env
if [ ! -f "client/.env" ]; then
    echo "Creating Frontend Configuration (.env)..."
    cp client/.env.example client/.env
else
    echo "Frontend Configuration already exists"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              Installation Complete! ✓                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Next Steps:"
echo "1. Update server/.env with your MongoDB URI and JWT Secret"
echo "2. Start Backend: cd server && npm run dev"
echo "3. Start Frontend: cd client && npm start"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For detailed setup guide, see SETUP_GUIDE.md"
echo ""
