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

echo "=== Replacing CocoaPods resources script with sandbox-compatible version ==="
# The CocoaPods-generated script uses temp files which fail in Xcode Cloud sandbox
# Replace with a simple cp-based script
cat > "$CI_PRIMARY_REPOSITORY_PATH/ios/Pods/Target Support Files/Pods-otlfitnessapp/Pods-otlfitnessapp-resources.sh" << 'SCRIPT'
#!/bin/sh
set -e

install_resource() {
  if [ -e "$1" ]; then
    echo "Installing $1"
    mkdir -p "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
    cp -R "$1" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/"
  fi
}

install_resource "${PODS_CONFIGURATION_BUILD_DIR}/EXConstants/EXConstants.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/EXConstants/ExpoConstants_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/ExpoFileSystem/ExpoFileSystem_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/RCT-Folly/RCT-Folly_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/RNCAsyncStorage/RNCAsyncStorage_resources.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/React-Core/React-Core_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/React-cxxreact/React-cxxreact_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/boost/boost_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/glog/glog_privacy.bundle"

echo "Resources copied successfully"
SCRIPT

chmod +x "$CI_PRIMARY_REPOSITORY_PATH/ios/Pods/Target Support Files/Pods-otlfitnessapp/Pods-otlfitnessapp-resources.sh"
echo "Replaced resources script"

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

echo "=== Fixing Hermes framework permissions ==="
# Fix permissions on Hermes framework to prevent ditto errors in Xcode Cloud
HERMES_PATH="$CI_PRIMARY_REPOSITORY_PATH/ios/Pods/hermes-engine/destroot"
if [ -d "$HERMES_PATH" ]; then
  chmod -R 755 "$HERMES_PATH"
  echo "Hermes permissions fixed"
else
  echo "Hermes path not found at $HERMES_PATH, skipping"
fi

echo "=== Post-clone setup complete! ==="
