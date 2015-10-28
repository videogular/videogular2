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
    del(['build/**/*.js', 'build/**/*.js.map']);
});
gulp.task('clean-css', function() {
    del(['build/**/*.css', 'build/**/*.css.map']);
});
gulp.task('clean-html', function() {
    del(['build/**/*.html']);
});
gulp.task('clean-fonts', function() {
    del(['build/**/fonts']);
});
gulp.task('clean-libs', function() {
    del(['build/libs/**/*']);
});

gulp.task('compile-ts', function() {
  var tsResult = gulp.src(['**/*.ts', '!node_modules/**/*.*', '!build/**/*.*'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('build/definitions')),
      tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/'))
  ]);
});

gulp.task('sass', function () {
  gulp.src(['**/*.scss', '!node_modules/**/*.*', '!build/**/*.*'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build'));
});

gulp.task('html', function() {
  gulp.src(['**/*.html', '!node_modules/**/*.*', '!build/**/*.*'])
    .pipe(plumber())
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
  gulp.src(['**/fonts/*.*', '!node_modules/**/*.*', '!build/**/*.*'])
    .pipe(plumber())
    .pipe(gulp.dest('build'));
});

gulp.task('copy-external-modules', function() {
  gulp.src(['node_modules/angular2/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('build/node_modules/angular2'));
  gulp.src(['node_modules/systemjs/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('build/node_modules/systemjs'));
  gulp.src(['node_modules/es6-shim/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('build/node_modules/es6-shim'));
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
    var server = gls.static('build', 10000);
    server.start();

    watch(['build/**/*.css', 'build/**/*.html', 'build/**/*.js'], server.notify).on('error', gutil.log);
});

gulp.task("watch", function() {
    watch(["**/*.ts", "!node_modules/**/*.ts", "!build/**/*.ts"], function() {
      runSequence('clean-js',
                  'compile-ts');
    });
    watch(["**/*.html", "!node_modules/**/*.html", "!build/**/*.html"], function() {
      runSequence(//'clean-html',
                  'html');
    });
    watch(["**/*.scss", "!node_modules/**/*.scss", "!build/**/*.scss"], function() {
      runSequence('clean-css',
                  'sass');
    });
});

gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('default', ['build']);
