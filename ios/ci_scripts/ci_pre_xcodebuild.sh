#!/bin/zsh

# Xcode Cloud pre-xcodebuild script

echo "=== Verifying pre-built JavaScript bundle ==="
BUNDLE_SRC="$CI_PRIMARY_REPOSITORY_PATH/ios/build/main.jsbundle"

if [ -f "$BUNDLE_SRC" ]; then
  echo "Pre-built bundle found at $BUNDLE_SRC"
  ls -la "$BUNDLE_SRC"
else
  echo "WARNING: Pre-built bundle not found"
fi

echo "=== Pre-xcodebuild setup complete! ==="
