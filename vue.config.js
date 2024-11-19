const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.steampowered.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
