module.exports = function (grunt) {
    var embedOption = grunt.option('embedLocales'),
        embedLocaleDest = embedOption ?
            'min/frozen-moment-with-customlocales.js' :
            'min/frozen-moment-with-locales.js',
        embedLocaleSrc = 'locale/*.js';

    if (embedOption && embedOption.match(/,/)) {
        embedLocaleSrc = 'locale/{' + embedOption + '}.js';
    }
    else if (embedOption) {
        embedLocaleSrc = 'locale/' + embedOption + '.js';
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat : {
            locales: {
                src: 'locale/*.js',
                dest: 'min/locales.js'
            },
            tests: {
                src: [
                    'test/browser-prefix.js',
                    'test/frozen-moment/*.js',
                    'test/locale/*.js',
                    'test/browser-suffix.js'
                ],
                dest: 'min/tests.js'
            }
        },
        env : {
            sauceLabs : (grunt.file.exists('.sauce-labs.creds') ?
                    grunt.file.readJSON('.sauce-labs.creds') : {})
        },
        karma : {
            options: {
                frameworks: ['nodeunit'],
                files: [
                    'min/frozen-moment-with-locales.js',
                    'min/tests.js',
                    'test/browser.js'
                ],
                sauceLabs: {
                    startConnect: true,
                    testName: 'FrozenMoment'
                },
                customLaunchers: {
                    slChromeWinXp: {
                        base: 'SauceLabs',
                        browserName: 'chrome',
                        platform: 'Windows XP'
                    },
                    slIe9Win7: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 7',
                        version: '9'
                    },
                    slIe8Win7: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 7',
                        version: '8'
                    },
                    slFfLinux: {
                        base: 'SauceLabs',
                        browserName: 'firefox',
                        platform: 'Linux'
                    },
                    slSafariOsx: {
                        base: 'SauceLabs',
                        browserName: 'safari',
                        platform: 'OS X 10.8'
                    }
                }
            },
            server: {
                browsers: []
            },
            chrome: {
                singleRun: true,
                browsers: ['Chrome']
            },
            firefox: {
                singleRun: true,
                browsers: ['Firefox']
            },
            sauce: {
                options: {reporters: ['dots']},
                singleRun: true,
                browsers: [
                    'slChromeWinXp',
                    'slIe9Win7',
                    'slIe8Win7',
                    'slFfLinux',
                    'slSafariOsx'
                ]
            }
        },

        uglify : {
            target: {
                files: {
                    'min/frozen-moment-with-locales.min.js'       : 'min/frozen-moment-with-locales.js',
                    'min/frozen-moment-with-customlocales.min.js' : 'min/frozen-moment-with-customlocales.js',
                    'min/locales.min.js'                          : 'min/locales.js',
                    'min/frozen-moment.min.js'                    : 'frozen-moment.js'
                }
            },
            options: {
                mangle: true,
                compress: {
                    dead_code: false // jshint ignore:line
                },
                output: {
                    ascii_only: true // jshint ignore:line
                },
                report: 'min',
                preserveComments: 'some'
            }
        },
        nodeunit : {
            all : ['test/frozen-moment/**/*.js', 'test/locale/**/*.js'],
            core : ['test/frozen-moment/**/*.js']
        },
        jshint: {
            all: [
                'Gruntfile.js', 'frozen-moment.js', 'locale/**/*.js', 'test/**/*.js',
                '!test/browser*.js'
            ],
            options: {
                'node'     : true,
                'browser'  : true,
                'boss'     : false,
                'curly'    : true,
                'debug'    : false,
                'devel'    : false,
                'eqeqeq'   : true,
                'eqnull'   : true,
                'evil'     : false,
                'forin'    : false,
                'immed'    : false,
                'laxbreak' : false,
                'newcap'   : true,
                'noarg'    : true,
                'noempty'  : false,
                'nonew'    : false,
                'onevar'   : true,
                'plusplus' : false,
                'regexp'   : false,
                'undef'    : true,
                'sub'      : true,
                'strict'   : false,
                'white'    : true,
                'es3'      : true,
                'camelcase' : true,
                'globals': {
                    'define': false
                }
            }
        },
        jscs: {
            all: [
                'Gruntfile.js', 'frozen-moment.js', 'locale/**/*.js',
                'test/**/*.js', '!test/browser*.js'
            ],
            options: {
                config: '.jscs.json'
            }
        },
        watch : {
            test : {
                files : [
                    'frozen-moment.js',
                    'locale/*.js',
                    'test/**/*.js'
                ],
                tasks: ['nodeunit']
            },
            jshint : {
                files : '<%= jshint.all %>',
                tasks: ['jshint']
            }
        },
        embedLocales: {
            moment: 'frozen-moment.js',
            dest: embedLocaleDest,
            targetLocales: embedLocaleSrc
        },
        benchmark: {
            all: {
                src: ['benchmarks/*.js']
            }
        }
    });

    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask('default', ['jshint', 'jscs', 'nodeunit']);

    // test tasks
    grunt.registerTask('test', ['test:node', 'test:browser']);
    grunt.registerTask('test:node', ['nodeunit']);
    grunt.registerTask('test:server', ['concat', 'embedLocales', 'karma:server']);
    grunt.registerTask('test:browser', ['concat', 'embedLocales', 'karma:chrome', 'karma:firefox']);
    grunt.registerTask('test:sauce-browser', ['concat', 'embedLocales', 'env:sauceLabs', 'karma:sauce']);
    grunt.registerTask('test:travis-sauce-browser', ['concat', 'embedLocales', 'karma:sauce']);

    // travis build task
    grunt.registerTask('build:travis', [
        // code style
        'jshint', 'jscs',
        // node tests
        'test:node'
    ]);

    // Task to be run when releasing a new version
    grunt.registerTask('release', [
        'jshint', 'nodeunit', 'concat', 'embedLocales',
        'component', 'uglify'
    ]);
};
