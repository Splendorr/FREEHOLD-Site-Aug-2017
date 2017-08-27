'use strict';

// var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
// var fs = require('fs');
// var del = require('del');
var browsersync = require('browser-sync');
// var connect = require('gulp-connect-php');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
// var ext_replace = require('gulp-ext-replace');
var stylus = require('gulp-stylus');
var axis = require('axis');
var jeet = require('jeet');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');
// var gulpHandlebars = require('gulp-handlebars');
var changed = require('gulp-changed');
var imageResize = require('gulp-image-resize');
// var wrap = require('gulp-wrap');
// var declare = require('gulp-declare');
// var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
// var merge = require('merge-stream');
var pump = require('pump');

var dev_path =
  {
    root: 'dev/',
    styl: 'dev/styl/',
    pug: 'dev/pug/',
    templates: 'dev/templates/',
    js: 'dev/js/',
    fonts: 'dev/fonts/',
    slick: 'dev/slick/',
    img: 'dev/img/',
    screenshots: 'dev/img/screenshots/'
  };


var build_path =
  {
    root: 'public/',
    css: 'public/css/',
    js: 'public/js/',
    fonts: 'public/fonts/',
    slick: 'public/slick/',
    img: 'public/img/',
    screenshots: 'public/img/screenshots/'
  };

// gulp.task('clean', function () {
//   return del([
//     build_path.root + '*.html'
//     // 'dist/report.csv',
//     // // here we use a globbing pattern to match everything inside the `mobile` folder
//     // 'dist/mobile/**/*',
//     // // we don't want to clean this file though so we negate the pattern
//     // '!dist/mobile/deploy.json'
//   ]);
// });

// Compile pug
gulp.task('pug', function() {
  return gulp.src([
    dev_path.pug + '**/*.pug',
    '!' + dev_path.pug + '**/_*.pug'
  ])
  .pipe(plumber({
    errorHandler: notify.onError('Pug Error: <%= error.message %>')
  }))
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest(build_path.root))
  // .pipe(ext_replace('.php'))
  // .pipe(gulp.dest(build_path.php))
  .pipe(browsersync.reload({stream: true}));
});

// Compile Stylus
gulp.task('stylus', function() {
  gulp.src([
    dev_path.styl + '*.styl',
    '!' + dev_path.styl + '_*.styl',
    '!' + dev_path.styl + '_*'
  ])
    .pipe(plumber({
      errorHandler: notify.onError('Stylus Error: <%= error.message %>')
    }))
    .pipe(stylus({
      use: [axis(), jeet(), rupture(), autoprefixer()],
      compress: false
      //
      // TK this isn't right, isn't building properly
      // sourcemap: {
      //   inline: false,
      //   sourceRoot: build_path.css
      // }
    }))
    // .on('error', console.log)
    .pipe(gulp.dest(build_path.css))
    .pipe(browsersync.reload({stream: true}));
});

// JavaScript
gulp.task('js', function(cb) {
  // gulp.src(dev_path.js + '*.js')
  //   .pipe(changed(build_path.js))
  //   .pipe(plumber({
  //     errorHandler: notify.onError('Javascript Error: <%= error.message %>')
  //   }))
  //   .pipe(babel())
  //   .pipe(uglify())
  //   .pipe(gulp.dest(build_path.js))
  //   .pipe(browsersync.reload({stream: true}));

  pump([
    gulp.src(dev_path.js + '*.js'),
    babel(),
    uglify(),
    gulp.dest(build_path.js),
    browsersync.reload({stream: true})
  ],
    cb
    // notify.on(cb)
  );

  // gulp.src(dev_path.js + '*.js')
  //   // .on('error', console.log)
  //   .pipe(plumber({
  //     errorHandler: notify.onError('Javascript Error: <%= error.message %>')
  //   }))
  //   .pipe(uglify({
	// 		mangle: true,
	// 		preserveComments: false,
  //     compressor: true
	// 	}))
  //   .pipe(gulp.dest(build_path.js))
  //   .pipe(browsersync.reload({stream: true}));
});

// Minification Images
gulp.task('images', function() {
  gulp.src([dev_path.img + '**/*'])
    .pipe(changed(build_path.img))
    // .pipe(imagemin())
    .pipe(gulp.dest(build_path.img))
    .pipe(browsersync.reload({stream: true}));
});

// Generate Screenshot Thumbnails
gulp.task('screenshot_thumbs', function() {
  gulp.src([dev_path.screenshots + '**/*'])
    .pipe(changed(build_path.screenshots))
    .pipe(imageResize({ percentage: 40 }))
    .pipe(rename(function (path) { path.basename += "-thumb"; }))
    // .pipe(imagemin())
    .pipe(gulp.dest(build_path.screenshots))
    .pipe(browsersync.reload({stream: true}));
});

// Start Browser-Sync server
gulp.task('browsersync-server', function() {
  browsersync.init(null, {
    server: {
      baseDir: build_path.root,
      routes: {
        '/api': 'local_api'
      }
    },
    open: false,
    notify: false
  });
});

//
// TRANSFER VENDOR FILES
//

gulp.task('vendor', function() {
  gulp.src(dev_path.root + 'favicon.png').pipe(gulp.dest(build_path.root));
  gulp.src(dev_path.styl + 'vendor/*').pipe(gulp.dest(build_path.css));
  gulp.src(dev_path.js + 'vendor/*').pipe(gulp.dest(build_path.js));
  gulp.src('dev/fonts/**/*').pipe(gulp.dest(build_path.root + '/fonts/'));
  gulp.src('dev/slick/**/*').pipe(gulp.dest(build_path.root + '/slick/'));
  gulp.src('dev/swipebox/**/*').pipe(gulp.dest(build_path.root + '/swipebox/'));
  // gulp.src('dev/local_api/**/*').pipe(gulp.dest('build/local_api/'));
});


//
// WATCH TASK
//

gulp.task('watch', function() {
  gulp.watch(dev_path.pug + '**/*.pug', ['pug']);
  gulp.watch(dev_path.pug + '**/*.pugphp', ['pug']);
  // gulp.watch(dev_path.templates + '**/*.pug', ['templates']);
  // gulp.watch(dev_path.pug + '**/*.json', ['pug']);
  gulp.watch(dev_path.styl + '**/*.styl', ['stylus']);
  gulp.watch([dev_path.img + '**/*'], ['images']);
  gulp.watch([dev_path.screenshots + '**/*'], ['screenshot_thumbs']);
  gulp.watch(dev_path.js + '**/*.js', ['js']);

  gulp.watch([dev_path.styl + 'vendor/*', dev_path.js + 'vendor/*'], ['vendor']);
});

//
// DEFAULT TASK
//

// gulp.task('default', ['hb_iframes', 'vendor', 'pug', 'templates', 'stylus', 'images', 'js'
gulp.task('default', ['vendor', 'stylus', 'images', 'js'
]);

// gulp.task('localdev', ['hb_iframes', 'vendor', 'pug', 'templates', 'stylus', 'images', 'js', 'browsersync-server', 'watch'

// gulp.task('localdev', ['vendor', 'pug', 'stylus', 'images', 'screenshot_thumbs', 'js', 'browsersync-server', 'watch'
gulp.task('localdev', ['vendor', 'pug', 'stylus', 'images', 'screenshot_thumbs', 'js', 'browsersync-server', 'watch'
  // 'vendor', 'pug', 'stylus', 'js', 'connect-sync', 'watch',
]);
