const path = require('path');
const gulp = require('gulp');
// less编译工具
const less = require('gulp-less');
// sass编译工具
// const sass = require('gulp-sass')(require('sass'));
// js编译工具
const babel = require('gulp-babel');

const alias = require('gulp-wechat-weapp-src-alisa');
const rename = require('gulp-rename');
const del = require('del');
const eslint = require('gulp-eslint');
const gulpI18nWxml = require('@miniprogram-i18n/gulp-i18n-wxml')
const gulpI18nLocales = require('@miniprogram-i18n/gulp-i18n-locales')
const isProd = process.env.NODE_ENV === 'production';

const srcPath = './src/**';
const distPath = './dist/';
const wxmlFiles = [`${srcPath}/*.wxml`];
const lessFiles = [`${srcPath}/*.{less,wxss}`];
// const sassFiles = [`${srcPath}/*.scss`];

const jsonFiles = [
  `${srcPath}/*.json`,
  `!${srcPath}/project.config.json`,
  `!${srcPath}/project.config.dev.json`
];
const projectConfigFile = [isProd ? `${srcPath}/project.config.json` : `${srcPath}/project.config.dev.json`];
const jsFiles = [`${srcPath}/*.js`, `!${srcPath}/env/*.js`];
const imgFiles = [
  `${srcPath}/images/*.{png,jpg,gif,ico}`,
  `${srcPath}/images/**/*.{png,jpg,gif,ico}`,
];

/**
 *  路径拼接
 */
function _join(dirname) {
  return path.join(process.cwd(), 'src', dirname);
}

/**
 * 引用路径别名配置
 */
const aliasConfig = {
  '@utils': _join('utils'),
  '@components': _join('components')
};


/* 清除dist目录 */
gulp.task('clean', (done) => {
  del.sync(['dist/**/*']);
  done();
});

/* 编译wxml文件 */
const wxml = () => {
  return gulp
    .src(wxmlFiles, { since: gulp.lastRun(wxml) })
    .pipe(gulp.dest(distPath));
};
gulp.task(wxml);

/* 编译JS文件 */
const js = () => {
  return gulp
    .src(jsFiles, { since: gulp.lastRun(js) })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(alias(aliasConfig))
    .pipe(gulp.dest(distPath));
};
gulp.task(js);

/* 配置请求地址相关 */
const envJs = (env) => {
  return () => {
    return gulp
      .src(`./src/env/${env}.js`)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(rename('env.js'))
      .pipe(gulp.dest(distPath));
  };
};
gulp.task('devEnv', envJs('development'));
gulp.task('prodEnv', envJs('production'));

/* 编译json文件 */
const json = () => {
  return gulp
    .src(jsonFiles, { since: gulp.lastRun(json) })
    .pipe(gulp.dest(distPath));
};
gulp.task(json);

/* 编译配置文件 */
const config = () => {
  return gulp
    .src(projectConfigFile, { since: gulp.lastRun(json) })
    .pipe(rename('project.config.json'))
    .pipe(gulp.dest(distPath));
};

gulp.task(config);

/* 编译less文件 */
const wxss = () => {
  return gulp
    .src(lessFiles)
    .pipe(less())
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(distPath));
};
gulp.task(wxss);
// 注意：这里要么支持编译less文件，要么支持less文件，目前还不支持同时编译sass和less文件
/* 编译sass文件 */
// const wxss = () => {
//   return gulp
//     .src(sassFiles)
//     .pipe(sass())
//     .pipe(rename({ extname: '.wxss' }))
//     .pipe(gulp.dest(distPath));
// };
// gulp.task(wxss);

/* 编译压缩图片 */
const img = () => {
  return gulp
    .src(imgFiles, { since: gulp.lastRun(img) })
    // .pipe(imagemin())
    .pipe(gulp.dest(distPath));
};
gulp.task(img);

const mergeAndGenerateLocales = () => {
  return src('src/**/i18n/*.json')
    .pipe(gulpI18nLocales({ defaultLocale: 'zh-CN', fallbackLocale: 'zh-CN' }))
    .pipe(dest('dist/i18n/'))
}

const transpileWxml = () => {
  return src('src/**/*.wxml')
    .pipe(gulpI18nWxml())
    .pipe(dest('dist/'))
}

const copyToDist = () => {
  return src(['src/**/*', '!src/**/*.wxml', '!src/**/i18n/*.json'])
    .pipe(dest('dist/'))
}

/* watch */
gulp.task('watch', () => {
  const addOrChange = { events: ['add', 'change'] };
  gulp.watch(lessFiles, addOrChange, wxss);
  // gulp.watch(sassFiles, addOrChange, wxss);

  gulp.watch(jsFiles, addOrChange, js);
  gulp.watch(imgFiles, addOrChange, img);
  gulp.watch(jsonFiles, addOrChange, json);
  gulp.watch(wxmlFiles, addOrChange, wxml);
  gulp.watch(projectConfigFile, addOrChange, config);
});

/* build */
gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('wxml', 'js', 'json', 'config', 'wxss', 'img', 'prodEnv')
  )
);

/* dev */
gulp.task(
  'dev',
  gulp.series(
    'clean',
    gulp.parallel('wxml', 'js', 'json', 'config', 'wxss', 'img', 'devEnv'),
    'watch'
  )
);
