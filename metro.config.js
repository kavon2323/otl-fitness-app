const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add video file extensions to asset extensions
config.resolver.assetExts.push('mov', 'mp4', 'avi', 'mkv');

module.exports = config;
