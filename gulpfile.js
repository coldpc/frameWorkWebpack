gulp.src('src/templates/*.html')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/templates'));