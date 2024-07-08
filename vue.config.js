const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // TypeScript 로더 설정
    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => ({
        ...options,
        transpileOnly: true,
      }));

    config.module
      .rule('tsx')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => ({
        ...options,
        transpileOnly: true,
      }));

    // DefinePlugin 설정 추가
    config.plugin('define').use(webpack.DefinePlugin, [{
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true)
    }]);
  }
});