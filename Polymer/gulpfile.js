var gulp = require('gulp');
var webpack = require('gulp-webpack');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      entry: {
        app: 'src/rd-app.js',
      },
      output: {
        filename: '[name].bundle.js',
      },
    }))
    .pipe(gulp.dest('dist/'));
});