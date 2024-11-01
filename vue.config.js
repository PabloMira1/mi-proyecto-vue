const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        timers: require.resolve('timers-browserify'),
      },
    },
  },
};

