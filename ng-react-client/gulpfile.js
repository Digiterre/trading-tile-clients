"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/**/*.html',
		js: './src/**/*.js',
		images: [
            './src/images/*',
            '../static-tile/spritesheet.png'
        ],
        css: [              
            'node_modules/toastr/build/toastr.min.css',
            '../static-tile/style.css'
        ],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {

	 var bundler = new browserify({debug: true});
	 bundler.add(config.paths.mainJs);

	bundler
		.transform(reactify)
		.plugin('minifyify', {map: '/bundle.map.json', output: config.paths.dist + '/bundle.map.json'})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});



gulp.task('vendorjs', function() {		
		return gulp.src('./src/scripts/*.js')
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
	
	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});


gulp.task('lint', function() {
	return;
	return gulp.src([config.paths.js, '!./src/scripts/*.js'])
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'vendorjs', 'css', 'images', 'lint', 'open', 'watch']);