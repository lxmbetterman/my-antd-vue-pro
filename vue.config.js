const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false, // js map文件
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
  },
  configureWebpack: {},
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /*  less 变量覆盖，用于自定义 ant design 主题 */
          /*  'primary-color': '#F5222D',
              'link-color': '#F5222D',
              'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://rdss-dev-1232799807.cn-north-1.elb.amazonaws.com.cn:9001/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
