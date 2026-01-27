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
npm ci

echo "=== Installing CocoaPods dependencies ==="
cd "$CI_PRIMARY_REPOSITORY_PATH/ios"
pod install

echo "=== Pre-bundling JavaScript for Release ==="
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Create the bundle directory
mkdir -p ios/build

# Export the bundle using Expo CLI
npx expo export:embed \
  --entry-file index.ts \
  --platform ios \
  --dev false \
  --reset-cache \
  --bundle-output ios/build/main.jsbundle \
  --assets-dest ios/build/assets

echo "=== Post-clone setup complete! ==="
