/*
 * Eslint config file
 * Documentation: https://eslint.org/docs/user-guide/configuring/
 * Install the Eslint extension before using this feature.
 */
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  // ecmaFeatures: {
  //   modules: true,
  // },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true
  },
  extends: 'eslint:recommended',
  rules: {
    indent: [2, 2, { //缩进风格
      'SwitchCase': 1
    }],
    'semi': [2, 'always'], // 结尾处必须有分号
    'semi-spacing': [2, { //给结尾处没有分号的，加上分号。
      'before': false,
      'after': true
    }],
    'no-console': 1,// 不能有console.log打印
  },

};
