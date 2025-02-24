// eslint-disable-next-line no-undef
const { getDefaultConfig } = require('@expo/metro-config');
// eslint-disable-next-line no-undef
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs');

// eslint-disable-next-line no-undef
module.exports = defaultConfig;
