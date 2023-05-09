# weixinGulp

基于gulp搭建原生微信小程序

**特性**


- 基于gulp+less/sass构建的微信小程序工程项目
- 项目图片自动压缩
- 支持ESLint代码检查
- 支持生产环境打包
- 支持中英文切换
- 支持自定义的tabBar，可以通过权限控制显示tabBar
- 引入了vant Weapp
  

虽然了引入了vant Webapp,但是生成的miniprogram_npm，是通过复制另外新项目构建npm的包，因为通过gulp构建的小程序，小程序不支持第三方插件。
尝试过直接把node_modules中@vant目录，在打包时，直接复制到miniprogram_npm目录下，但似乎这样还是不行。必须复制通过微信开发者工具构建npm的miniprogram_npm才可以。