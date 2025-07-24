const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
    publicPath: '/expense_tracker/',
  devServer: {
    port: 8080,        
    host: '0.0.0.0',  
  }
});
