'use strict'

var cached = require('gulp-cached')
var childProcess = require('child_process');
var del = require('delete')
var gulp = require('gulp')
var mocha = require('gulp-mocha')
var nodemon = require('gulp-nodemon')
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript')
var tslint = require('gulp-tslint')
var typedoc = require('gulp-typedoc')
var util = require('gulp-util')

gulp.task('clean:dist', () => {
  util.log('Cleaning transpiled source...')
  return del(['dist/**/*'])
})

gulp.task('clean:docs', () => {
  util.log('Cleaning documentation...')
  return del(['docs/**/*'])
})

gulp.task('readme', () => {
  util.log('Generating documentation...')
  return gulp.src(['src/**/*.ts'])
    .pipe(typedoc({
      excludeExternals: true,
      ignoreCompilerErrors: false,
      includeDeclarations: true,
      name: 'cso2-users-service',
      out: './docs',
      plugins: ['mdFlavour github'],
      theme: 'markdown',
      tsconfig: 'tsconfig.json',
      version: true
    }))
})

gulp.task('tslint', () => {
  util.log('Linting source code...')
  const cfg = ts.createProject('tsconfig.json')
  return cfg.src()
    .pipe(cached('tslint'))
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report({
      summarizeFailureOutput: true
    }))
})

gulp.task('typescript', () => {
  util.log('Transpiling source code...')
  const project = ts.createProject('tsconfig.json')
  return project.src()
    .pipe(cached('typescript'))
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '../src'
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch:dev', () => {
  util.log('Watching app in development environment...')
  util.log(process.version)
  const stream = nodemon()
    .on('restart', function () {
      console.log('restarted!')
    }).on('crash', function () {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) // restart the server in 10 seconds
    })

  return stream
})

gulp.task('watch:prod', () => {
  util.log('Watching app in production environment...')
  const stream = nodemon()
    .on('restart', function () {
      console.log('restarted!')
    }).on('crash', function () {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) // restart the server in 10 seconds
    })

  return stream
})

gulp.task('build', gulp.series(
  'clean:dist',
  'tslint',
  'typescript'
))

gulp.task('run:dev', gulp.series(
  'typescript',
  () => {
    childProcess.spawn('node', ['dist/service.js'], { stdio: 'pipe' });
  }
))

gulp.task('typedoc', gulp.series(
  'clean:docs',
  'readme'
))

gulp.task('test', () => {
  util.log('Testing code...')
  return gulp.src('test/**/*.ts')
    .pipe(mocha({
      require: 'ts-node/register'
    }))
})

gulp.task('default', gulp.series(
  'clean:dist',
  'typescript'
))