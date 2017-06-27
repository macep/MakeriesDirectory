module.exports = function () {
    var argv = require('yargs').argv;

    var config = {
        isProduction: !!(argv.production),
        url: '',
        app: 'app/',
        builtJs: 'app/built',
        appJs: 'app.js',
        libsJs: 'libs.js',
        fontsUrl: 'assets/fonts',
        mainSass: 'assets/sass/jgm.sass',
        cssUrl: 'assets/css',
        cssFileName: 'jgm.css',
        cssMapFileName: 'jgm.css.map',
        compatibility: ['last 2 versions', 'ie >= 10'],
        fontAwesomeUrl: 'node_modules/font-awesome/fonts/**/*.*',
        uglifyError: {
            message: "<%= error.message %>",
            title: "Uglify JS Error"
        },
        sassError: {
            message: "<%= error.message %>",
            title: "Sass Error"
        },
        sass: [
            'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
            'assets/sass/jgm.sass'
        ],
        javascriptLibs: [
            'node_modules/lodash/lodash.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-translate/dist/angular-translate.min.js',
            'node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
        ],
        javascriptModules: [
            // modules
            'app/main.module.js',

            // main files
            'app/main.js',

            // models

            // directives

            // filters

            // services
            'app/shared/services/api.service.js',
            'app/shared/services/auth.service.js',

            // components/pages
            'app/main.controller.js'
        ]

    };

    return config;
};
