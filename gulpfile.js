// jshint node:true

var gulp = require("gulp");
var sass = require("gulp-sass")(require('node-sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var bs = require('browser-sync').create();

var sassSources = "./scss/**/*.scss";
var cssDest = "./css";
var mapDest = "./maps";
var htmlSources = ["./pages/**/*.html","./partials/**/*.html"];

// Build files once
gulp.task('build', css);

// Watch and build files on change
gulp.task('watch', function () {
	bs.init({
		server: "./"
	});
	//gulp.watch(htmlSources, ['sync']);
	gulp.watch(htmlSources).on('change', bs.reload);
	gulp.watch(sassSources, gulp.series(css));
});

// Run BrowserSync after HTML changes
/* gulp.task("sync", function () {
	// Pipe nothing
	return gulp.src("!./")
		.pipe(bs.stream());
}); */

// bs, Compiles Sass, autoprefixes, minifies, and creates sourcemaps
function css() {
	return gulp.src(sassSources)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS({
			level: 1
		}))
		.pipe(sourcemaps.write(mapDest))
		.pipe(gulp.dest(cssDest))
		.pipe(bs.stream());
}
