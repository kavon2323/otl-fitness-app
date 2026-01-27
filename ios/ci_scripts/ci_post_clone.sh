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

echo "=== Patching realpath -m for BSD compatibility ==="
# Find and patch all shell scripts that use realpath -m (GNU syntax not available on macOS)
find "$CI_PRIMARY_REPOSITORY_PATH/ios/Pods" -name "*.sh" -type f | while read script; do
  if grep -q "realpath -m" "$script" 2>/dev/null; then
    echo "Patching: $script"
    sed -i '' 's/realpath -m/realpath/g' "$script"
  fi
done
echo "Patching complete"

echo "=== Pre-bundling JavaScript for Release ==="
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Create the bundle directory in ios/build
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
