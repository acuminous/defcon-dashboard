var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var exclude = require('gulp-ignore').exclude;

var fonts = [
    'bower_components/font-awesome/fonts/*',
    'bower_components/footable/css/fonts/footable.*'
]

var scripts = [
    'static/js/main.js'
];

var scriptLibs = [
    'bower_components/footable/js/footable.js',
    'bower_components/footable/js/footable.sort.js',
    'bower_components/footable/js/footable.paginate.js',
    'bower_components/footable/js/footable.filter.js',
];

var styles = [
    'static/styles/*.less'
];

var styleLibs = [
    'bower_components/footable/css/footable.core.css'
];

gulp.task('fonts', function() {
    return gulp.src(fonts)
        .pipe(plumber())
        .pipe(gulp.dest('static/dist/fonts'));
});

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(uglify({outSourceMap: true, mangle: false}))  
        .pipe(gulp.dest('static/dist/js'));
});

gulp.task('scriptLibs', function() {
    return gulp.src(scriptLibs)
        .pipe(plumber())
        .pipe(concat('bundle-libs.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('static/dist/js'));
});

gulp.task('styles', function() {
    return gulp.src(styles)
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('static/dist/css'));
});

gulp.task('styleLibs', function() {
    return gulp.src(styleLibs)
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('bundle-libs.css'))
        .pipe(replace(/fonts\/footable/g, '../fonts/footable'))        
        .pipe(gulp.dest('static/dist/css'));
});

gulp.task('resources', ['fonts', 'scripts', 'scriptLibs', 'styles', 'styleLibs']);

gulp.task('default', ['build'], function() {
    gulp.watch(scripts, ['scripts']);
    gulp.watch(scriptLibs, ['scriptLibs']);    
    gulp.watch(styles, ['styles']);
    gulp.watch(styleLibs, ['styleLibs']);
    gulp.watch(fonts, ['fonts']);
});

gulp.task('build', ['resources']);
