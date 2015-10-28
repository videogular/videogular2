var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var gls = require('gulp-live-server');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var merge = require('merge2');
var del = require('del');

var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });

gulp.task('clean-js', function() {
    del(['dist/**/*.js', 'dist/**/*.js.map']);
});
gulp.task('clean-css', function() {
    del(['dist/**/*.css', 'dist/**/*.css.map']);
});
gulp.task('clean-html', function() {
    del(['dist/**/*.html']);
});
gulp.task('clean-fonts', function() {
    del(['dist/**/fonts']);
});
gulp.task('clean-libs', function() {
    del(['dist/libs/**/*']);
});

gulp.task('compile-ts', function() {
  var tsResult = gulp.src(['**/*.ts', '!node_modules/**/*.*', '!dist/**/*.*'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('dist/definitions')),
      tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
  ]);
});

gulp.task('sass', function () {
  gulp.src(['**/*.scss', '!node_modules/**/*.*', '!dist/**/*.*'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  gulp.src(['**/*.html', '!node_modules/**/*.*', '!dist/**/*.*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
  gulp.src(['**/fonts/*.*', '!node_modules/**/*.*', '!dist/**/*.*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-external-modules', function() {
  gulp.src(['node_modules/angular2/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/node_modules/angular2'));
  gulp.src(['node_modules/systemjs/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/node_modules/systemjs'));
  gulp.src(['node_modules/es6-shim/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/node_modules/es6-shim'));
});

gulp.task('clean', function() {
  runSequence('clean-js',
              'clean-css',
              'clean-html',
              'clean-libs',
              'clean-fonts');
});

gulp.task('build', function() {
  runSequence('clean',
              'compile-ts',
              'copy-external-modules',
              'html',
              'sass',
              'fonts');
});

gulp.task('serve', function() {
    var server = gls.static('dist', 10000);
    server.start();

    watch(['dist/**/*.css', 'dist/**/*.html', 'dist/**/*.js'], server.notify).on('error', gutil.log);
});

gulp.task("watch", function() {
    watch(["**/*.ts", "!node_modules/**/*.ts", "!dist/**/*.ts"], function() {
      runSequence('clean-js',
                  'compile-ts');
    });
    watch(["**/*.html", "!node_modules/**/*.html", "!dist/**/*.html"], function() {
      runSequence(//'clean-html',
                  'html');
    });
    watch(["**/*.scss", "!node_modules/**/*.scss", "!dist/**/*.scss"], function() {
      runSequence('clean-css',
                  'sass');
    });
});

gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('default', ['build']);
