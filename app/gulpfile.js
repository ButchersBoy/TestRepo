var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename')

gulp.task('hello', function() {
  // place code for your default task here
  console.log('hello world');
});

gulp.task('jsx', function(cb) {    
  return gulp.src('./public/scripts/srcjsx/main.js')
    //TODO what is sourcemaps?
    .pipe(react())
    .pipe(gulp.dest('./public/scripts/src'))
  
  cb();
});

gulp.task('browserify', ['jsx'], function() {
  var bundleStream = browserify('./public/scripts/src/main.js').bundle();
  bundleStream
    .pipe(source('main.js'))
    //.pipe(streamify(uglify()))
    .pipe(rename('mainbundle.js'))
    .pipe(gulp.dest('./public/scripts/'));    
});


gulp.task('dev', ['jsx', 'browserify']);


gulp.task('devlocal', ['dev'], function() {
  return gulp.src('./bin/pre/gitHubLoader-file.js')    
    .pipe(rename('gitHubLoader.js'))
    .pipe(gulp.dest('./bin'));
});

gulp.task('devgit', ['dev'], function() {
  gulp.src('./bin/pre/gitHubLoader-git.js')
    .pipe(rename('gitHubLoader.js'))
    .pipe(gulp.dest('./bin'));  
});

gulp.task('default', function() {
  // place code for your default task here
  console.log('nowt');
});