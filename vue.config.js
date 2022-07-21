const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:7001',
          changeOrigin: true
        }
      }
    }
  }
})
