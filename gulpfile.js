/**
 *
 * Created by cristi on 26/06/2017.
 */

var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var merge       = require('merge-stream');
var colors      = require('colors');
var sequence    = require('run-sequence');
var del         = require('del');

var URL = '';

// Check for --production flag
var isProduction = !!(argv.production);


// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 10'];


// File paths to various assets are defined here.
var PATHS = {
    sass: [
        'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
        'assets/sass/jgm.sass'
    ],
    javascript: [
        'node_modules/lodash/lodash.min.js',

        'node_modules/angular/angular.min.js',

        'node_modules/angular-ui-router/release/angular-ui-router.min.js',

        'node_modules/angular-translate/dist/angular-translate.min.js',

        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
    ]
};


// Browsersync task
gulp.task('browser-sync', ['build'], function () {
    var files = [
        'index.php',
        '**/*.js',
        '**/*.sass',
        'assets/images/**/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {proxy: URL})
});


// Compile Sass into CSS. In production, the CSS is compressed
gulp.task('sass', function () {
    // Minify CSS if run wtih --production flag
    var minifycss = $.if(isProduction, $.minifyCss());

    return gulp.src('assets/sass/jgm.sass')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.sass
        }))
        .on('error', $.notify.onError({
            message: "<%= error.message %>",
            title: "Sass Error"
        }))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(minifycss)
        .pipe($.if(!isProduction, $.sourcemaps.write('.')))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream({match: '**/*.css'}))
});


// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
    var uglify = $.uglify()
        .on('error', $.notify.onError({
            message: "<%= error.message %>",
            title: "Uglify JS Error"
        }));

    return gulp.src(PATHS.javascript)
        .pipe($.sourcemaps.init())
        .pipe($.concat('libs.js', { newLine:'\n;'}))
        .pipe($.if(isProduction, uglify))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream())
});


// Copy task
gulp.task('copy', function() {
    // Font Awesome
    var fontAwesome = gulp.src('node_modules/font-awesome/fonts/**/*.*')
        .pipe(gulp.dest('assets/fonts'));

    return merge(fontAwesome)
});


// Build task
// Runs copy then runs sass & javascript in parallel
gulp.task('build', ['clean'], function(done) {
    sequence('copy', ['sass', 'javascript'], done)
});


// Clean task
gulp.task('clean', function(done) {
    sequence(['clean:javascript', 'clean:css'], done)
});


// Clean JS
gulp.task('clean:javascript', function() {
    return del([
        'app/libs.js'
    ])
});


// Clean CSS
gulp.task('clean:css', function() {
    return del([
        'assets/css/jgm.css',
        'assets/css/jgm.css.map'
    ])
});


// Default gulp task
// Run build task and watch for file changes
gulp.task('default', ['build', 'browser-sync'], function() {

    // Log file changes to console
    function logFileChange(event) {
        var fileName = require('path').relative(__dirname, event.path);
        console.log('[' + 'WATCH'.green + '] ' + fileName.magenta + ' was ' + event.type + ', running tasks...')
    }

    // Sass Watch
    gulp.watch(['assets/sass/**/*.sass'], ['clean:css', 'sass'])
        .on('change', function(event) {
            logFileChange(event)
        });

    // JS Watch
    gulp.watch(['gulpfile.js','app/**/*.js'], ['clean:javascript', 'javascript'])
        .on('change', function(event) {
            logFileChange(event)
        });
});
