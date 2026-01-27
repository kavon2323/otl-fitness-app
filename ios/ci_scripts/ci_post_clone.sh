#!/bin/zsh

# Xcode Cloud post-clone script
# Installs dependencies for React Native / Expo project

set -e

echo "=== Installing Homebrew dependencies ==="
brew install node

echo "=== Node version ==="
node --version
npm --version

echo "=== Installing Node.js dependencies ==="
cd "$CI_PRIMARY_REPOSITORY_PATH"
npm install

echo "=== Installing CocoaPods dependencies ==="
cd "$CI_PRIMARY_REPOSITORY_PATH/ios"
pod install

echo "=== Post-clone setup complete! ==="
