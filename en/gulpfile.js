const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

const paths = {
  css: {
    dist: 'assets/bundles/css',
    files: [
      'assets/css/**/[!cielo|custom]*.css',
      'assets/css/custom.css',
      'assets/css/cielo.css',
    ],
    output: 'bundle.min.css',
  },
  js: {
    dist: 'assets/bundles/js',
    main: {
      minified: [
        'assets/js/main/jquery.min.js',
        'assets/js/main/jquery-ui-1.9.1.custom.min.js',
      ],
      files: [
        'assets/js/main/jquery.tocify.js',
        'assets/js/main/bootstrap.js',
        'assets/js/main/prettify.js',
        'assets/js/main/custom.js',
      ],
      output: 'bundle.min.js',
    },
    language_buttons: {
      files: [
        'assets/js/language_buttons/**/*.js',
      ],
      output: 'language_buttons.min.js',
    },
    search: {
      minified: [
        'assets/js/search/lunr.min.js',
      ],
      files: [
        'assets/js/search/**/[!lunr]*.js',
      ],
      output: 'search.min.js',
    },
  },
};

const babelOptions = {
  presets: ['env'],
};

gulp.task('clean-tmp', () => gulp.src('tmp/**/*').pipe(clean()));

gulp.task('styles', () => gulp.src(paths.css.files)
  .pipe(concat(paths.css.output))
  .pipe(cleanCSS())
  .pipe(gulp.dest(paths.css.dist)));

gulp.task('main-minify', () => gulp.src([...paths.js.main.files])
  .pipe(concat(paths.js.main.output))
  .pipe(babel(babelOptions))
  .pipe(uglify())
  .pipe(gulp.dest('tmp')));

gulp.task('main-scripts', gulp.series('main-minify', () => gulp.src([
  ...paths.js.main.minified,
  `tmp/${paths.js.main.output}`,
])
  .pipe(concat(paths.js.main.output))
  .pipe(gulp.dest(paths.js.dist))));

gulp.task('search-minify', () => gulp.src([...paths.js.search.files])
  .pipe(concat(paths.js.search.output))
  .pipe(babel(babelOptions))
  .pipe(uglify())
  .pipe(gulp.dest('tmp')));

gulp.task('search-scripts', gulp.series('search-minify', () => gulp.src([
  ...paths.js.search.minified,
  `tmp/${paths.js.search.output}`,
])
  .pipe(concat(paths.js.search.output))
  .pipe(gulp.dest(paths.js.dist))));

gulp.task('language_buttons-scripts', () => gulp.src(paths.js.language_buttons.files)
  .pipe(concat(paths.js.language_buttons.output))
  .pipe(babel(babelOptions))
  .pipe(uglify())
  .pipe(gulp.dest(paths.js.dist)));

gulp.task('scripts', gulp.series('main-scripts', 'search-scripts', 'language_buttons-scripts'));
gulp.task('dist', gulp.series('styles', 'scripts', 'clean-tmp'));

gulp.task('default', () => {
  console.log('Gulp Running');
  gulp.watch('assets/css/**/*', gulp.series('styles'));
  gulp.watch(paths.js.main.files, gulp.series('main-scripts'));
  gulp.watch(paths.js.search.files, gulp.series('search-scripts'));
  gulp.watch(paths.js.language_buttons.files, gulp.series('language_buttons-scripts'));
});
