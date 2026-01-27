#!/bin/zsh

# Xcode Cloud pre-xcodebuild script
# Sets up the pre-built bundle for the Xcode build

set -e

echo "=== Setting up pre-built JavaScript bundle ==="

# Copy the pre-built bundle to the app's resource directory
# This is where Xcode will look for it during the build
BUNDLE_SRC="$CI_PRIMARY_REPOSITORY_PATH/ios/build/main.jsbundle"
BUNDLE_DEST="$CI_PRIMARY_REPOSITORY_PATH/ios/otlfitnessapp/main.jsbundle"

if [ -f "$BUNDLE_SRC" ]; then
  cp "$BUNDLE_SRC" "$BUNDLE_DEST"
  echo "Copied bundle to $BUNDLE_DEST"
else
  echo "ERROR: Pre-built bundle not found at $BUNDLE_SRC"
  exit 1
fi

# Copy assets to the app directory
ASSETS_SRC="$CI_PRIMARY_REPOSITORY_PATH/ios/build/assets"
if [ -d "$ASSETS_SRC" ]; then
  cp -R "$ASSETS_SRC" "$CI_PRIMARY_REPOSITORY_PATH/ios/otlfitnessapp/"
  echo "Copied assets"
fi

echo "=== Pre-xcodebuild setup complete! ==="
