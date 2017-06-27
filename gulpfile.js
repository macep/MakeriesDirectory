var $ = require('gulp-load-plugins')();
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var merge       = require('merge-stream');
var colors      = require('colors');
var sequence    = require('run-sequence');
var del         = require('del');

var Config = require('./gulp.config')();

// Browsersync task
gulp.task('browser-sync', ['build'], function () {
    var files = [
        'index.php',
        '**/*.js',
        '**/*.sass',
        'assets/images/**/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {proxy: Config.url})
});


// Compile Sass into CSS. In production, the CSS is compressed
gulp.task('sass', function () {
    // Minify CSS if run wtih --production flag
    var minifycss = $.if(Config.isProduction, $.minifyCss());

    return gulp.src('assets/sass/jgm.sass')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: Config.sass
        }))
        .on('error', $.notify.onError({
            message: "<%= error.message %>",
            title: "Sass Error"
        }))
        .pipe($.autoprefixer({
            browsers: Config.compatibility
        }))
        .pipe(minifycss)
        .pipe($.if(!Config.isProduction, $.sourcemaps.write('.')))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream({match: '**/*.css'}))
});


// Combine JavaScript libraries into one file
// In production, the file is minified
gulp.task('javascriptLibs', function() {
    var uglify = $.uglify()
        .on('error', $.notify.onError({
            message: "<%= error.message %>",
            title: "Uglify JS Error"
        }));

    return gulp.src(Config.javascriptLibs)
        .pipe($.sourcemaps.init())
        .pipe($.concat('libs.js', { newLine:'\n;'}))
        .pipe($.if(Config.isProduction, uglify))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream())
});


// Combine Angular modules into one file
gulp.task('javascriptModules', function() {
    var uglify = $.uglify()
        .on('error', $.notify.onError({
            message: "<%= error.message %>",
            title: "Uglify JS Error"
        }));

    return gulp.src(Config.javascriptModules)
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.js', { newLine:'\n;'}))
        .pipe($.if(Config.isProduction, uglify))
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
    sequence('copy', ['sass', 'javascriptLibs', 'javascriptModules'], done)
});


// Clean task
gulp.task('clean', function(done) {
    sequence(['clean:javascript', 'clean:css'], done)
});


// Clean JS
gulp.task('clean:javascript', function() {
    return del([
        'app/app.js',
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
    gulp.watch(['gulpfile.js','app/**/*.js'], ['clean:javascript', 'javascriptLibs', 'javascriptModules'])
        .on('change', function(event) {
            logFileChange(event)
        });
});
