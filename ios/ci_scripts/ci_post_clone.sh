#!/bin/zsh

# Xcode Cloud post-clone script
# Installs dependencies for React Native / Expo project

set -e

echo "=== Installing Homebrew dependencies ==="
brew install node coreutils

echo "=== Node version ==="
node --version
npm --version

echo "=== Installing Node.js dependencies ==="
cd "$CI_PRIMARY_REPOSITORY_PATH"
npm ci

echo "=== Installing CocoaPods dependencies ==="
cd "$CI_PRIMARY_REPOSITORY_PATH/ios"
pod install

echo "=== Patching realpath for BSD compatibility ==="
# Replace GNU realpath with grealpath (from coreutils) in all Pods scripts
# GNU realpath supports -m and -q flags that BSD realpath doesn't
find "$CI_PRIMARY_REPOSITORY_PATH/ios/Pods" -name "*.sh" -type f | while read script; do
  if grep -q "realpath" "$script" 2>/dev/null; then
    echo "Patching: $script"
    # Replace 'realpath' with 'grealpath' (GNU version from coreutils)
    sed -i '' 's|/usr/bin/realpath|/usr/local/bin/grealpath|g' "$script"
    sed -i '' 's|`realpath|`/usr/local/bin/grealpath|g' "$script"
    sed -i '' 's|$(realpath|$(/usr/local/bin/grealpath|g' "$script"
    # Also handle bare realpath at start of line or after space/semicolon
    sed -i '' 's| realpath | /usr/local/bin/grealpath |g' "$script"
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
