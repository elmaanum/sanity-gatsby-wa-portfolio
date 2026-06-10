#!/bin/bash

# --- 1. PRE-FLIGHT ENVIRONMENT CHECKS ---
echo "🔍 Checking local machine prerequisites..."

# Check Node version (Requires >= 18)
NODE_VER=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VER" ] || [ "$NODE_VER" -lt 18 ]; then
  echo "❌ Error: Node.js version 18+ is required. Current: $(node -v 2>/dev/null || echo "None")"
  exit 1
fi

# Check Python version (Requires >= 3.11)
PYTHON_VER=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")' 2>/dev/null)
if [[ $(echo -e "3.11\n$PYTHON_VER" | sort -V | head -n1) != "3.11" ]]; then
  echo "❌ Error: Python 3.11+ is required. Current: $PYTHON_VER"
  exit 1
fi

echo "✅ System tools verified (Node v$NODE_VER, Python v$PYTHON_VER)."

# --- 2. CONFIGURATION & AUTOMATIC BOOTSTRAPPING ---
cd backend
if [ ! -d ".venv" ]; then
  echo "📦 Creating missing Python virtual environment..."
  python3 -m venv .venv
fi
cd ..

if [ ! -f frontend/.env ]; then
  echo "📝 Generating default frontend/.env..."
  cat <<EOT > frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_SANITY_PROJECT_ID=6raq5w4t
REACT_APP_SANITY_DATASET=production
EOT
fi

if [ ! -f backend/.env ]; then
  echo "📝 Generating template backend/.env..."
  cat <<EOT > backend/.env
SANITY_PROJECT_ID=6raq5w4t
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN=
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=onboarding@resend.dev
RECIPIENT_EMAIL=info@whittenassociates.com
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
EOT
  echo "⚠️  Action required: Update backend/.env with actual third-party API keys."
fi

# --- 3. MACOS TERMINAL AUTOMATION ---
echo "🚀 Launching development tabs..."

##!/bin/bash

ROOT_DIR=$(pwd)

osascript <<EOF
tell application "Terminal"
    activate

    -- Backend
    do script "cd '$ROOT_DIR/backend' && source .venv/bin/activate && uvicorn server:app --reload --port 8001"
    delay 0.5
    set custom title of selected tab of front window to "Backend"

    -- Frontend
    do script "cd '$ROOT_DIR/frontend' && yarn start"
    delay 0.5
    set custom title of selected tab of front window to "Frontend"

    -- Studio
    do script "cd '$ROOT_DIR/studio' && yarn dev"
    delay 0.5
    set custom title of selected tab of front window to "Studio"

end tell
EOF

echo "🎉 Startup script completed successfully."
