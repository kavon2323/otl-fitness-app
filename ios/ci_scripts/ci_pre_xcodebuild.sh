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

echo "=== Replacing CocoaPods scripts with sandbox-compatible versions ==="

# Replace resources script
RESOURCES_SCRIPT="$CI_PRIMARY_REPOSITORY_PATH/ios/Pods/Target Support Files/Pods-otlfitnessapp/Pods-otlfitnessapp-resources.sh"
if [ -f "$RESOURCES_SCRIPT" ]; then
  echo "Replacing resources script..."
  cat > "$RESOURCES_SCRIPT" << 'SCRIPT'
#!/bin/sh
set -e
set -u
set -o pipefail

install_resource() {
  case $1 in
    *.storyboard|*.xib|*.xcdatamodel|*.xcmappingmodel|*.xcassets)
      echo "Skipping special resource: $1"
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
  chmod +x "$RESOURCES_SCRIPT"
fi

# Replace frameworks script
FRAMEWORKS_SCRIPT="$CI_PRIMARY_REPOSITORY_PATH/ios/Pods/Target Support Files/Pods-otlfitnessapp/Pods-otlfitnessapp-frameworks.sh"
if [ -f "$FRAMEWORKS_SCRIPT" ]; then
  echo "Replacing frameworks script..."
  cat > "$FRAMEWORKS_SCRIPT" << 'SCRIPT'
#!/bin/sh
set -e
set -u
set -o pipefail

# Sandbox-compatible frameworks embedding (uses cp/ditto instead of rsync)

if [ -z ${FRAMEWORKS_FOLDER_PATH+x} ]; then
  exit 0
fi

echo "mkdir -p ${CONFIGURATION_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
mkdir -p "${CONFIGURATION_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"

COCOAPODS_PARALLEL_CODE_SIGN="${COCOAPODS_PARALLEL_CODE_SIGN:-false}"
SWIFT_STDLIB_PATH="${TOOLCHAIN_DIR}/usr/lib/swift/${PLATFORM_NAME}"

install_framework()
{
  if [ -r "${BUILT_PRODUCTS_DIR}/$1" ]; then
    local source="${BUILT_PRODUCTS_DIR}/$1"
  elif [ -r "${BUILT_PRODUCTS_DIR}/$(basename "$1")" ]; then
    local source="${BUILT_PRODUCTS_DIR}/$(basename "$1")"
  elif [ -r "$1" ]; then
    local source="$1"
  fi

  local destination="${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
  local framework_name="$(basename "$source")"

  if [ -L "${source}" ]; then
    echo "Symlinked..."
    source="$(readlink "${source}")"
  fi

  echo "ditto: Installing ${framework_name} to ${destination}"

  # Use ditto instead of rsync - it's sandbox-friendly
  ditto --noextattr --norsrc "${source}" "${destination}/${framework_name}"

  # Remove unnecessary directories
  rm -rf "${destination}/${framework_name}/Headers" 2>/dev/null || true
  rm -rf "${destination}/${framework_name}/PrivateHeaders" 2>/dev/null || true
  rm -rf "${destination}/${framework_name}/Modules" 2>/dev/null || true

  local basename
  basename="$(basename -s .framework "$1")"
  binary="${destination}/${basename}.framework/${basename}"

  if ! [ -r "$binary" ]; then
    binary="${destination}/${basename}"
  elif [ -L "${binary}" ]; then
    echo "Destination binary is symlinked..."
    dirname="$(dirname "${binary}")"
    binary="${dirname}/$(readlink "${binary}")"
  fi

  # Strip invalid architectures
  if [[ "$(file "$binary")" == *"dynamically linked shared library"* ]]; then
    strip_invalid_archs "$binary"
  fi

  # Code sign
  code_sign_if_enabled "${destination}/$(basename "$1")"
}

STRIP_BINARY_RETVAL=0

strip_invalid_archs() {
  binary="$1"
  warn_missing_arch=${2:-true}
  binary_archs="$(lipo -info "$binary" | rev | cut -d ':' -f1 | awk '{$1=$1;print}' | rev)"
  intersected_archs="$(echo ${ARCHS[@]} ${binary_archs[@]} | tr ' ' '\n' | sort | uniq -d)"
  if [[ -z "$intersected_archs" ]]; then
    if [[ "$warn_missing_arch" == "true" ]]; then
      echo "warning: [CP] Vendored binary '$binary' contains architectures ($binary_archs) none of which match the current build architectures ($ARCHS)."
    fi
    STRIP_BINARY_RETVAL=1
    return
  fi
  stripped=""
  for arch in $binary_archs; do
    if ! [[ "${ARCHS}" == *"$arch"* ]]; then
      lipo -remove "$arch" -output "$binary" "$binary"
      stripped="$stripped $arch"
    fi
  done
  if [[ "$stripped" ]]; then
    echo "Stripped $binary of architectures:$stripped"
  fi
  STRIP_BINARY_RETVAL=0
}

code_sign_if_enabled() {
  if [ -n "${EXPANDED_CODE_SIGN_IDENTITY:-}" -a "${CODE_SIGNING_REQUIRED:-}" != "NO" -a "${CODE_SIGNING_ALLOWED}" != "NO" ]; then
    echo "Code Signing $1 with Identity ${EXPANDED_CODE_SIGN_IDENTITY_NAME}"
    local code_sign_cmd="/usr/bin/codesign --force --sign ${EXPANDED_CODE_SIGN_IDENTITY} ${OTHER_CODE_SIGN_FLAGS:-} --preserve-metadata=identifier,entitlements '$1'"
    if [ "${COCOAPODS_PARALLEL_CODE_SIGN}" == "true" ]; then
      code_sign_cmd="$code_sign_cmd &"
    fi
    echo "$code_sign_cmd"
    eval "$code_sign_cmd"
  fi
}

if [[ "$CONFIGURATION" == "Debug" ]]; then
  install_framework "${PODS_XCFRAMEWORKS_BUILD_DIR}/hermes-engine/Pre-built/hermes.framework"
fi
if [[ "$CONFIGURATION" == "Release" ]]; then
  install_framework "${PODS_XCFRAMEWORKS_BUILD_DIR}/hermes-engine/Pre-built/hermes.framework"
fi
if [ "${COCOAPODS_PARALLEL_CODE_SIGN}" == "true" ]; then
  wait
fi

echo "=== Frameworks embedded successfully ==="
SCRIPT
  chmod +x "$FRAMEWORKS_SCRIPT"
fi

echo "=== Scripts replaced ==="
echo "=== Pre-xcodebuild setup complete! ==="
