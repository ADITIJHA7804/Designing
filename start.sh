#!/bin/bash

echo "🛡️  Starting Phishing Email Training Simulation..."
echo "=================================================="

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✅ Node.js found - Starting Node.js server..."
    node server.js
elif command -v python3 &> /dev/null; then
    echo "✅ Python3 found - Starting Python server..."
    python3 -m http.server 3000
else
    echo "❌ Neither Node.js nor Python3 found!"
    echo "Please install Node.js or Python3 to run the server."
    exit 1
fi