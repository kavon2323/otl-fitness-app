#!/bin/zsh

# Xcode Cloud post-clone script
# Installs dependencies for React Native / Expo project

set -e

echo "=== Installing Homebrew dependencies ==="
brew install node coreutils

# Add GNU coreutils to PATH (provides GNU realpath with -m support)
export PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"

echo "=== Node version ==="
node --version
npm --version

echo "=== realpath version (should be GNU) ==="
realpath --version || echo "BSD realpath (no --version flag)"

echo "=== Installing Node.js dependencies ==="
cd "$CI_PRIMARY_REPOSITORY_PATH"
npm ci

echo "=== Installing CocoaPods dependencies ==="
cd "$CI_PRIMARY_REPOSITORY_PATH/ios"
pod install

echo "=== Pre-bundling JavaScript for Release ==="
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Create the bundle directory in ios/build
# The modified build script checks for this and uses it instead of Metro
mkdir -p ios/build

# Export the bundle using Expo CLI
npx expo export:embed \
  --entry-file index.ts \
  --platform ios \
  --dev false \
  --reset-cache \
  --bundle-output ios/build/main.jsbundle \
  --assets-dest ios/build/assets

echo "=== Bundle created at ios/build/main.jsbundle ==="
ls -la ios/build/

echo "=== Post-clone setup complete! ==="
