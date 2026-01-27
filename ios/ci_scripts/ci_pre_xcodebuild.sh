#!/bin/zsh

# Xcode Cloud pre-xcodebuild script
# Sets up environment for the build

set -e

echo "=== Setting up GNU coreutils for realpath ==="
# Create a wrapper for realpath that uses GNU version
if [ -f /usr/local/opt/coreutils/libexec/gnubin/realpath ]; then
  echo "GNU realpath found, creating symlink"
  sudo ln -sf /usr/local/opt/coreutils/libexec/gnubin/realpath /usr/local/bin/grealpath
  # Also try to make it the default realpath
  export PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
fi

echo "=== Verifying pre-built JavaScript bundle ==="
BUNDLE_SRC="$CI_PRIMARY_REPOSITORY_PATH/ios/build/main.jsbundle"

if [ -f "$BUNDLE_SRC" ]; then
  echo "Pre-built bundle found at $BUNDLE_SRC"
  ls -la "$BUNDLE_SRC"
else
  echo "WARNING: Pre-built bundle not found at $BUNDLE_SRC"
  ls -la "$CI_PRIMARY_REPOSITORY_PATH/ios/build/" 2>/dev/null || echo "Directory does not exist"
fi

echo "=== Pre-xcodebuild setup complete! ==="
