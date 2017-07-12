var gulp = require('gulp')
var postcss = require('gulp-postcss')
var ifm = require('./index.js')
var tape = require('gulp-tape')
var tapDiff = require('tap-diff')


var files = ['index.js', './test/*.js', 'gulpfile.js']

gulp.task('test', function() {
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: tapDiff()
    }))
})

gulp.task('default', ['test'])

gulp.task('watch', function () {
    gulp.watch(files, ['test'])
})
