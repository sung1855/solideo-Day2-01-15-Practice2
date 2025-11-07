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

  return config;
};
