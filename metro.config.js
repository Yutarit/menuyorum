// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    // Node.js core modules polyfills/shims
    extraNodeModules: {
      events: require.resolve('events/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      net: require.resolve('react-native-tcp-socket'), // Bu satırı değiştirdik
      tls: require.resolve('react-native-tcp-socket'), // Bu satırı da ekledik
      zlib: require.resolve('browserify-zlib'),
      util: require.resolve('util/'), // Bu satırı ekleyin
      assert: require.resolve('assert/'),
      // Diğer gerekli modüller
      vm: false, // veya require.resolve('vm-browserify')
      fs: false,
      // os: require.resolve('os-browserify/browser'), // Gerekirse eklenebilir
      // path: require.resolve('path-browserify'), // Gerekirse eklenebilir
    },
  },
  // ... diğer ayarlarınız varsa ...
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);