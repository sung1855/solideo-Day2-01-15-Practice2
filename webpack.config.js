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
  config.output.publicPath = '/solideo-Day2-01-15-Practice2/';

  return config;
};
