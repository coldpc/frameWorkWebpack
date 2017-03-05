var fs = require("fs");
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var filter = require("gulp-filter");
var postcss = require("gulp-postcss");
var include = require("gulp-html-tag-include");
var precss = require("precss");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var modules = fs.readdirSync("src/modules");
var pages = fs.readdirSync("src/pages");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css"); //- 压缩CSS为一行；
var rev = require("gulp-rev");  //版本号控制
var svgSprite = require("gulp-svg-sprites");
// var base64 = require('./build/gulp-base64');
//html
gulp.task("html", function () {
  for(var i in pages){
    //html
    gulp.src("src/pages/"+ pages[i] +"/**.html")
        .pipe(include())
        .pipe(gulp.dest("dist/pages/html/"+ pages[i]));
  }
  for(var i in modules) {
    if(modules[i] !== ".DS_Store") {
      //html
      gulp.src("src/modules/"+ modules[i] +"/**.html")
          .pipe(include())
          .pipe(gulp.dest("dist/modules/"+ modules[i]));      
    }
      
  }
});
//css
gulp.task("css", function () {
  for(var i in pages){
    //css
    gulp.src("src/pages/"+ pages[i] +"/**.css")
    .pipe(
        postcss([
            require("precss")({ /* options */ })
        ])
    )
    .pipe(autoprefixer({
            browsers: ["last 10 versions"],
            cascade: false
    }))
    .pipe(gulp.dest("dist/pages/css/"+ pages[i]));
  }
  for(var i in modules) {
    if(modules[i] !== ".DS_Store") {
      
      //postcss
      gulp.src("src/modules/"+ modules[i] +"/**.css")
        .pipe(
            postcss([
                require("precss")({ /* options */ })
            ])
        )
        .pipe(autoprefixer({
            browsers: ["last 10 versions"],
            cascade: false
        }))
        .pipe(gulp.dest("dist/modules/"+ modules[i]));
    }
      
  }
});
gulp.task("scss", function () {
  for(var i in pages){
    //sass
    gulp.src("src/pages/"+ pages[i] +"/**.scss")
    .pipe(sass({
        includePaths: [
          "./node_modules/sass-list-maps"
        ]
    }).on("error", sass.logError))
    .pipe(autoprefixer({
            browsers: ["last 10 versions"],
            cascade: false
    }))
    .pipe(gulp.dest("dist/pages/html/"+ pages[i]));
  }
  
  for(var i in modules) {
    if(modules[i] !== ".DS_Store") {
      //sass
      gulp.src("src/modules/"+ modules[i] +"/**.scss")
      .pipe(sass.sync().on("error", sass.logError))
      .pipe(autoprefixer({
            browsers: ["last 10 versions"],
            cascade: false
      }))
      .pipe(gulp.dest("dist/modules/"+ modules[i]));
    }
      
  }
});
//concat
gulp.task("concat", function() {   
  gulp.src("**/*.css", {cwd: "dist/pages/html"})
  .pipe(concat("main.min.css"))
  // .pipe(minifyCss())   //压缩文件
  // .pipe(rev()) 
  .pipe(gulp.dest("dist/css/"));       
});
//js
gulp.task("js", function () {
  for(var i in pages){
    gulp.src("src/pages/"+ pages[i] +"/**.js")
    .pipe(gulp.dest("dist/pages/js/"+ pages[i]));
  }
  for(var i in modules) {
    if(modules[i] !== ".DS_Store") {
      gulp.src("src/modules/"+ modules[i] +"/**.js")
      .pipe(gulp.dest("dist/modules/"+ modules[i]));
    }
      
  }
  gulp.src("src/vender/**.js")
  .pipe(gulp.dest("dist/vender/"));
});
//watch
gulp.task("watch", function() {
  for(var i in pages){
    // gulp.watch("src/pages/"+ pages[i] +"/**.svg",["svg"]);
    gulp.watch("src/pages/"+ pages[i] +"/**.html",["html"]);
    gulp.watch("src/pages/"+ pages[i] +"/**.css",["css"]);
    gulp.watch("src/pages/"+ pages[i] +"/**.scss",["scss"]);
    gulp.watch("src/pages/"+ pages[i] +"/**.js",["js"]);
  }
  for(var i in modules){
    // gulp.watch("src/modules/"+ pages[i] +"/**.svg",["svg"]);
    gulp.watch("src/modules/"+ modules[i] +"/**.html",["html"]);
    gulp.watch("src/modules/"+ modules[i] +"/**.css",["css"]);
    gulp.watch("src/modules/"+ modules[i] +"/**.scss",["scss"]);
    gulp.watch("src/modules/"+ modules[i] +"/**.js",["js"]);
  }
});
//svg
gulp.task("svg", function(){
  gulp.src("**/svgs/*.svg", {cwd: "src/modules"})
  .pipe(svgSprite({
    mode: "symbols",
    common: "svg-icon",
    svgId: "svg-%f",
    preview: {
      symbols: "index.html"
    },
    svg:{
      symbols: "svgs.svg"
    },
  }))
  .pipe(gulp.dest("src/modules/symbols"))
  .pipe(gulp.dest("dist/pages/html/symbols"))
  .pipe(gulp.dest("dist/symbols"));
});
//serve
gulp.task("serve", function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task("default", ["watch", "css", "scss", "html", "js",  "serve"]);


