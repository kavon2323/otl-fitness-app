#!/bin/zsh

# Xcode Cloud pre-xcodebuild script
# Runs immediately before xcodebuild

set -e

echo "=== Verifying pre-built JavaScript bundle ==="
BUNDLE_SRC="$CI_PRIMARY_REPOSITORY_PATH/ios/build/main.jsbundle"

if [ -f "$BUNDLE_SRC" ]; then
  echo "Pre-built bundle found at $BUNDLE_SRC"
  ls -la "$BUNDLE_SRC"
else
  echo "WARNING: Pre-built bundle not found"
fi

echo "=== Replacing CocoaPods resources script with sandbox-compatible version ==="
SCRIPT_PATH="$CI_PRIMARY_REPOSITORY_PATH/ios/Pods/Target Support Files/Pods-otlfitnessapp/Pods-otlfitnessapp-resources.sh"

if [ -f "$SCRIPT_PATH" ]; then
  echo "Original script exists, replacing..."
  cat "$SCRIPT_PATH" | head -20
  echo "---"
fi

# Write our sandbox-compatible script that uses cp instead of rsync
cat > "$SCRIPT_PATH" << 'SCRIPT'
#!/bin/sh
set -e
set -u
set -o pipefail

# Sandbox-compatible resource installation (no rsync, no temp files)
install_resource() {
  case $1 in
    *.storyboard)
      echo "ibtool not needed for $1"
      ;;
    *.xib)
      echo "ibtool not needed for $1"
      ;;
    *.xcdatamodel)
      echo "momc not needed for $1"
      ;;
    *.xcmappingmodel)
      echo "mapc not needed for $1"
      ;;
    *.xcassets)
      echo "actool not needed for $1"
      ;;
    *)
      if [ -e "$1" ]; then
        echo "cp: Installing $(basename "$1")"
        mkdir -p "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
        cp -R "$1" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/"
      fi
      ;;
  esac
}

# Install each resource bundle
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/EXConstants/EXConstants.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/EXConstants/ExpoConstants_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/ExpoFileSystem/ExpoFileSystem_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/RCT-Folly/RCT-Folly_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/RNCAsyncStorage/RNCAsyncStorage_resources.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/React-Core/React-Core_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/React-cxxreact/React-cxxreact_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/boost/boost_privacy.bundle"
install_resource "${PODS_CONFIGURATION_BUILD_DIR}/glog/glog_privacy.bundle"

echo "=== Resources copied successfully ==="
SCRIPT

chmod +x "$SCRIPT_PATH"
echo "Replaced resources script with sandbox-compatible version"
cat "$SCRIPT_PATH"

echo "=== Pre-xcodebuild setup complete! ==="
