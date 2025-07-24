// const { defineConfig } = require('@vue/cli-service');

// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     port: 8080,        
//     host: '0.0.0.0',  
//   }
// });
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',         // Ensures assets load properly from GitHub Pages
  outputDir: 'docs',        // Tells Vue CLI to output build files into the 'docs' folder
  devServer: {
    port: 8080,
    host: '0.0.0.0',
  }
});
