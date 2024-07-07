const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => {
        return {
          ...options,
          transpileOnly: true,
        };
      });

    config.module
      .rule('tsx')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => {
        return {
          ...options,
          transpileOnly: true,
        };
      });
  }
});
