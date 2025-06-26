// gulp/dev.js
const gulp         = require('gulp');
const fileInclude  = require('gulp-file-include');
const sass         = require('gulp-sass')(require('sass'));
const sassGlob     = require('gulp-sass-glob');
const browserSync  = require('browser-sync').create();
const clean        = require('gulp-clean');
const fs           = require('fs');
const sourceMaps   = require('gulp-sourcemaps');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const webpack      = require('webpack-stream');
const changed      = require('gulp-changed');

// 1) clean:dev — корректно возвращаем стрим или вызываем done()
gulp.task('clean:dev', function () {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false }).pipe(clean({ force: true }));
  }
  // если нет папки — возвращаем завершённый стрим
  return Promise.resolve();
});

// Общие настройки
const fileIncludeSetting = {
  prefix: '@@',
  basepath: '@file',
};
const plumberNotify = (title) => ({
  errorHandler: notify.onError({
    title: title,
    message: 'Error <%= error.message %>',
    sound: false,
  }),
});

// 2) html:dev — сперва plumber+fileInclude, только потом dest+stream
gulp.task('html:dev', function () {
  return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(changed('./build/'))              // пропускать неизменённые
    .pipe(fileInclude(fileIncludeSetting))  // сюда до dest
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

// 3) sass:dev
gulp.task('sass:dev', function () {
  return gulp.src('./src/scss/*.scss', { sourcemaps: true })
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(changed('./build/css/'))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

// 4) images/fonts/files — после копирования reload
gulp.task('images:dev', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(changed('./build/assets/'))
    // .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./build/assets/'))
    .pipe(browserSync.stream());
});

gulp.task('fonts:dev', function () {
  return gulp.src('./src/fonts/**/*')
    .pipe(changed('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'))
    .pipe(browserSync.stream());
});

gulp.task('files:dev', function () {
  return gulp.src('./src/files/**/*')
    .pipe(changed('./build/files/'))
    .pipe(gulp.dest('./build/files/'))
    .pipe(browserSync.stream());
});

// 5) js:dev — возвращаем стрим, не нужно done как параметр
gulp.task('js:dev', function () {
  return gulp.src('./src/js/*.js')
    .pipe(plumber(plumberNotify('JS')))
    .pipe(changed('./build/js/'))
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
});

// 6) server:dev
gulp.task('server:dev', function (done) {
  browserSync.init({
    server: { baseDir: './build' },
    open: true,
    notify: false
  });
  done();
});

// 7) watch:dev — вызываем done() после установки watcher’ов
gulp.task('watch:dev', function (done) {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass:dev'));
  gulp.watch('./src/html/**/*.html', gulp.series('html:dev'));
  gulp.watch('./src/assets/**/*',   gulp.series('images:dev'));
  gulp.watch('./src/fonts/**/*',    gulp.series('fonts:dev'));
  gulp.watch('./src/files/**/*',    gulp.series('files:dev'));
  gulp.watch('./src/js/**/*.js',    gulp.series('js:dev'));
  done();
});
