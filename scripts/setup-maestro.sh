#!/bin/bash

echo "🔍 Checking Maestro installation..."

if command -v maestro &> /dev/null; then
    echo "✅ Maestro already installed: $(maestro --version)"
    exit 0
fi

echo "📦 Installing Maestro..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if command -v brew &> /dev/null; then
        echo "Using Homebrew..."
        brew tap mobile-dev-inc/tap
        brew install maestro
    else
        echo "Homebrew not found, using curl..."
        curl -Ls "https://get.maestro.mobile.dev" | bash
    fi
else
    # Linux/WSL
    echo "Using curl installer..."
    curl -Ls "https://get.maestro.mobile.dev" | bash
fi

echo "✅ Maestro installation complete!"
echo "Run 'maestro --version' to verify (you may need to restart your terminal)"