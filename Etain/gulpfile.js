/// <binding ProjectOpened='development' />

var gulp = require("gulp");
var rename = require("gulp-rename");
var gulpSass = require("gulp-sass");
var gulpClean = require("gulp-clean");
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");

var ts = require("gulp-typescript");
var project = ts.createProject("tsconfig.json");

gulp.task("sass", function (done) {
    gulp.src(["Content/SCSS/*.scss"])
        .pipe(gulpSass())
        .pipe(gulp.dest("Content/SCSS/"))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("Content/SCSS/"));

    done();
});

gulp.task("tscompile", function (done) {
    var tsResult = project.src()
        .pipe(sourcemaps.init())
        .pipe(project())
        .on('error', function () { process.exit(1) });

    tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(function (file) { return file.base; }))
        .on('error', function () { process.exit(1) });

    done();
});

gulp.task("cleanup", function (done) {
    gulp.src("Content/TS/**/*.map", { read: false })
        .pipe(gulpClean());

    gulp.src("Content/TS/**/*.js", { read: false })
        .pipe(gulpClean());

    gulp.src("Content/SCSS/**/*.css", { read: false })
        .pipe(gulpClean());

    done();
});