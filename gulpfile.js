var gulp = require('gulp')
  , usemin = require('gulp-usemin')
  , uglify = require('gulp-uglify')
  , rimraf = require('rimraf')
  , minifyCss = require('gulp-minify-css')
  , less = require('gulp-less')
  , inject = require('gulp-inject')
  , templateCache = require('gulp-angular-templatecache')
  , ngmin = require('gulp-ngmin')
  , jshint = require('gulp-jshint')
  , rev = require('gulp-rev')
  , express = require('express')
  , basicAuth = require('basic-auth-connect')
  , logfmt = require("logfmt")
  , fs = require('fs')
  , linker = require('gulp-linker')
  , beautify = require('gulp-beautify')
  ;

// Constants
var SERVER_PORT = process.env.PORT || 9000;

var serveDirectories = function (directories) {
  var app = express();
  app.use(logfmt.requestLogger());
  app.use(basicAuth('policy-engine', 'openstack'));

// Create the server
  directories.forEach(function(directory) {
    app.use("/", express.static(directory));
  })

  var sendData = function (res, endpoint) {
    path = 'mock_data/' + endpoint + '.json';
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        res.status(404).send('mock data not found');
      }
      res.send(data);
    });
  };

  app.get("/api/:endpoint", function (req, res) {
    sendData(res, req.params.endpoint);
  });

  app.listen(SERVER_PORT, function () {
    console.log('listening')
  });
};

// Compilation tasks
gulp.task('clean', function (cb) {
  rimraf.sync('./tmp');
  rimraf.sync('./build');
  cb(null);
});

gulp.task('lint', function () {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

gulp.task('beautify', function () {
  gulp.src(['./app/scripts/**/*.js', '.app/index.html'])
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./app/scripts/'))
});

gulp.task('views', function () {
  return gulp.src('./app/scripts/**/*.html')
    .pipe(templateCache({
      module: 'policyEngine',
      root: 'scripts'
    }))
    .pipe(gulp.dest('./tmp/assets/javascripts'));
});

gulp.task('images', function () {
  return gulp.src('./app/images/**/*.*')
    //.pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
});

// less
gulp.task('less', function () {
  return gulp.src(['./app/styles/**/*.less', './app/scripts/**/*.less'])
    .pipe(less({
      error: true,
      include: 'app'
    }))
    .pipe(gulp.dest('./tmp/scripts'))
});

// fonts
gulp.task('fonts', function () {
  return gulp.src(['./app/fonts/*'])
    .pipe(gulp.dest('./build/fonts'));
});

//mockData
gulp.task('mockData', function () {
  return gulp.src('app/scripts/mockData/*')
    .pipe(gulp.dest('./build/scripts/mockData'));
});

gulp.task('jsSource', function () {
  gulp.src('app/index.html')
    .pipe(linker({
      scripts: ['app/scripts/**/*.js'],
      startTag: '<!--app scripts-->',
      endTag: '<!--end app scripts-->',
      fileTmpl: '<script src="%s"></script>',
      appRoot: 'app/'
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('cssSource', function () {
  gulp.src('app/index.html')
    .pipe(linker({
      scripts: ['tmp/scripts/**/*.css', 'tmp/styles/**/*.css'],
      startTag: '<!--app styles-->',
      endTag: '<!--end app styles-->',
      fileTmpl: '<link rel="stylesheet" href="%s">',
      appRoot: 'tmp/'
    }))
    // Write modified files to www/
    .pipe(gulp.dest('app/'));
});

gulp.task('compile', ['clean', 'views', 'images', 'less', 'fonts', 'mockData'], function () {

  gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./tmp/assets/javascripts/templates.js', {read: false}),
      {
        starttag: '<!-- inject:templates:js -->',
        ignorePath: '/tmp'
      }
    ))

    .pipe(usemin({
      css: [rev()],
      css_libs: [minifyCss({ rebase: false }), rev()],
      html: [],
      js: [ngmin(), uglify(), rev()],
      js_libs: [rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', ['less'], function () {
  gulp.watch('app/styles/**/*.less', ['less', 'cssSource']);
  gulp.watch('app/scripts/**/*.less', ['less', 'cssSource']);
  gulp.watch('app/scripts/**/*.js', ['jsSource']);
  //gulp.watch('app/**/*.html', []);
});

gulp.task('test', function () {
  var karma = require('karma').server
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  });
});

gulp.task('serve:app', ['watch'], function () {
  serveDirectories(['./tmp', './app'])
});

gulp.task('serve:build', function () {
  serveDirectories(['./build'])
});

gulp.task('default', ['compile']);
