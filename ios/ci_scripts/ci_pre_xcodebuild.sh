#!/bin/zsh

# Xcode Cloud pre-xcodebuild script
# Copies pre-built bundle to where Xcode expects it

set -e

echo "=== Verifying pre-built JavaScript bundle ==="

BUNDLE_SRC="$CI_PRIMARY_REPOSITORY_PATH/ios/build/main.jsbundle"

if [ -f "$BUNDLE_SRC" ]; then
  echo "Pre-built bundle found at $BUNDLE_SRC"
  ls -la "$BUNDLE_SRC"
else
  echo "ERROR: Pre-built bundle not found at $BUNDLE_SRC"
  echo "Contents of ios/build:"
  ls -la "$CI_PRIMARY_REPOSITORY_PATH/ios/build/" || echo "Directory does not exist"
  exit 1
fi

echo "=== Pre-xcodebuild setup complete! ==="
