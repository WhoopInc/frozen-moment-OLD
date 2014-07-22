var path = require('path');

function rename (dest, src) {
	var basename = path.basename(src, path.extname(src));

	if (basename === "index") {
		basename = "";
	}

	return path.join(dest, path.dirname(src), basename, 'index.html');
}

module.exports = function(grunt) {
	grunt.config('assemble', {
		'options' : {
			partials   : 'pages/partials/**/*.hbs',
			layoutdir  : 'pages/layout',
			helpers    : 'pages/helpers/**/*.js',
			marked     : { sanitize: false }
		},
		'moment' : {
			options : {
				docs : require('../.temp/docs/moment.json')
			},
			files: [{
				expand : true,
				rename : rename,
				dest   : 'build',
				cwd    : 'pages/moment',
				src    : '**/*.{hbs,md}'
			}]
		}
	});

	grunt.registerTask('html', [
		'docs:moment',
		'assemble:moment'
	]);

	grunt.config('watch.html-moment', {
		files: [
			'.temp/docs/moment.json',
			'pages/**/*.{hbs,json,md,js}'
		],
		tasks: ['assemble:moment']
	});
};
