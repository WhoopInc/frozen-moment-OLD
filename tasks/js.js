module.exports = function(grunt) {
	grunt.config('concat.js', {
		files : {
			'build/static/js/global.js' : [
				'libs/frozen-moment/frozen-moment.js'
				// 'libs/frozen-moment/min/langs.js'
			],
			'build/static/js/core-test.js' : [
				'assets/js/test-start.js',
				'libs/nodeunit/nodeunit.js',
				'libs/frozen-moment/test/frozen-moment/*.js',
				// 'libs/frozen-moment/test/lang/*.js',
				'assets/js/test.js',
				'assets/js/test-end.js'
			],
			'build/static/js/core-home.js' : [
				'assets/js/core-home.js'
			],
			'build/static/js/docs.js' : [
				'assets/js/docs.js'
			]
		}
	});

	grunt.config('uglify.js', {
		src: 'build/static/js/global.js',
		dest: 'build/static/js/global.min.js'
	});

	grunt.config('copy.js', {
		files : {
			'build/downloads/frozen-moment.js'                : 'libs/frozen-moment/frozen-moment.js',
			'build/downloads/frozen-moment.min.js'            : 'libs/frozen-moment/min/frozen-moment.min.js',
			'build/downloads/frozen-moment-with-langs.js'     : 'libs/frozen-moment/min/frozen-moment-with-langs.js',
			'build/downloads/frozen-moment-with-langs.min.js' : 'libs/frozen-moment/min/frozen-moment-with-langs.min.js',
		}
	});

	grunt.config('watch.js', {
		files: [
			'assets/**/*.js',
			'libs/**/*.js'
		],
		tasks: ['js']
	});

	grunt.registerTask('js', ['concat:js', 'copy:js', 'uglify:js']);
};
