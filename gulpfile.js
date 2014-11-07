var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
   return gulp.src(['./lib/*.js', './web/lib/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
