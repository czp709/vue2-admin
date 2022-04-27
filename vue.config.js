const CompressionPlugin = require("compression-webpack-plugin")// 引入compression-webpack-plugin
module.exports = {
  // 基本路径
  publicPath: "./",
  // 相对于打包路径index.html的路径
  indexPath: "index.html",
  // 文件输出目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生成的静态资源存放的目录
  assetsDir: "static",
  productionSourceMap: false,
  filenameHashing: false,
  // webpack-dev-server相关配置
  devServer: {
    // 端口号
    port: 8085,
    // 配置是否是https
    https: false,
    // 配置自动启动浏览器
    open: true,
    // 启动热更新
    hotOnly: true,
    // 配置代理，处理多个跨域
    proxy: { // 配置跨域
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_BASE_URL, // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true // 允许跨域
      }
    }
  },
  // css处理
  css: {
    extract: process.env.NODE_ENV !== "development"
  },
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT"
    }
    // 打包时对js/css文件进行压缩
    if (process.env.NODE_ENV === "production") { // 生产环境
      config.plugins.push(
        new CompressionPlugin({
          /* [file]被替换为原始资产文件名。
             [path]替换为原始资产的路径。
             [dir]替换为原始资产的目录。
             [name]被替换为原始资产的文件名。
             [ext]替换为原始资产的扩展名。
             [query]被查询替换。 */
          filename: "[path].gz[query]",
          // 压缩算法
          algorithm: "gzip",
          // 匹配文件
          test: /\.js$|\.css$|\.html$/,
          // 压缩超过此大小的文件,以字节为单位
          threshold: 10240,
          minRatio: 0.8
          // 删除原始文件只保留压缩后的文件
          // deleteOriginalAssets: false
        })
      )
    }
  }
}
