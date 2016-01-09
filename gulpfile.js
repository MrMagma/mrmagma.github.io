var gulp = require("gulp");

var del = require("del");

gulp.task("clean-dist", function() {
    return del.sync("dist/**/*");
});

var browserify = require("browserify");
var babelify = require("babelify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");

gulp.task("build-scripts", function() {
    var b = browserify({
        entries: "./src/scripts/index.js",
        debug: true,
        transform: [babelify]
    });
    
    return b.bundle()
        .pipe(source("index.js"))
        .pipe(buffer())
        .pipe(gulp.dest("dist"));
});

var postcss = require("gulp-postcss");
var postcssImport = require("postcss-import");

gulp.task("build-styles", function() {
    return gulp.src("./src/styles/*.css")
        .pipe(postcss([
            postcssImport
        ]))
        .pipe(gulp.dest("dist"));
});

gulp.task("build", ["clean-dist", "build-scripts", "build-styles"]);

gulp.task("default", ["build"]);
