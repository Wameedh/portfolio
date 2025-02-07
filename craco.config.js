// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        const rules = webpackConfig.module.rules.find(rule => rule.oneOf);
        
        rules.oneOf.unshift({
          test: /\.mdx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react']
              }
            },
            {
              loader: '@mdx-js/loader',
              options: {
                providerImportSource: '@mdx-js/react'
              }
            }
          ]
        });
  
        return webpackConfig;
      }
    }
  };