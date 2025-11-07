const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          '@react-navigation',
          '@react-navigation/elements',
          '@react-navigation/native',
          '@react-navigation/bottom-tabs',
          '@react-navigation/native-stack',
        ],
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

  // require를 전역으로 제공
  config.plugins.push(
    new webpack.DefinePlugin({
      'typeof require': JSON.stringify('undefined'),
    })
  );

  // react-native-safe-area-context를 웹용 stub으로 강제 대체
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /react-native-safe-area-context/,
      path.resolve(__dirname, 'safe-area-context-stub.js')
    )
  );

  // 외부 모듈 제외
  config.externals = {
    ...config.externals,
  };

  return config;
};
