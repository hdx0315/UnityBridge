/*const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to handle assets properly
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'webp');

module.exports = config;

*/

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-css-transformer'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'css'),
    sourceExts: [...resolver.sourceExts, 'css'],
  };

  return config;
})();