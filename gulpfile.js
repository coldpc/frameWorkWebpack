'use strict';

//编译路径
var baseConfig = {
	jsPath: ["./src/**/*.js"],
	dest: './build', //目标路径
	version: "2.0.2", //版本号
};

var pathName = "./";
var gulp = require('gulp');


/*
 * 安装 gulp-imports npm install gulp-imports --save-dev
 * 书写格式 : //import("subdir1a/file3.js");
 */
var gulpImports = require('gulp-imports');
gulp.task('imports', function() {
    gulp.src(baseConfig.jsPath)
        .pipe(gulpImports())
        .pipe(gulp.dest(baseConfig.dest));
});

/*
 * 安装 gulp-css-imports npm install gulp-cssimports --save-dev
 * @import "a.css";
 
var cssimport = require("gulp-cssimport");
var options = {};
	gulp.task("import", function() {
    gulp.src("src/style.css")
        .pipe(cssimport(options))
        .pipe(gulp.dest("dist/"));
}); */

gulp.task('default', function() {
    gulp.run('imports');
});

