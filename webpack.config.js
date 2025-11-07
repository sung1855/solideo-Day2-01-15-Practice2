const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@react-navigation'],
      },
    },
    argv
  );

  // GitHub Pages를 위한 publicPath 설정
  const publicPath = '/solideo-Day2-01-15-Practice2/';

  config.output.publicPath = publicPath;

  // HTML plugin에 publicPath 전달
  const HtmlWebpackPlugin = config.plugins.find(
    plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
  );

  if (HtmlWebpackPlugin) {
    HtmlWebpackPlugin.userOptions.publicPath = publicPath;
  }

  // Node.js polyfills 추가
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": false,
    "stream": false,
    "buffer": false,
    "util": false,
    "assert": false,
    "http": false,
    "https": false,
    "os": false,
    "url": false,
    "zlib": false,
    "path": false,
    "fs": false,
  };

  // 외부 모듈 제외
  config.externals = {
    ...config.externals,
  };

  return config;
};
