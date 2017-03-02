var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var shell = require('gulp-shell');
var task = require('shell-task');
var wiki = require('./package.json').repository.wiki;
var repogitbook = require('./package.json').repogitbook;


gulp.task('deploy', function() {
      return gulp.src('./txt/**/*')
        .pipe(ghPages());
});

gulp.task('deploygh', function() {
        return gulp.src('').pipe(shell(['node ./scripts/deploy-gh-pages.js']))
});

gulp.task('build', function() {
        return gulp.src('').pipe(shell(['gitbook build ./txt ./gh-pages']));
});

gulp.task('wiki', function() {
        return gulp.src('').pipe(shell(['node ./scripts/generate-wiki.js']));
});

gulp.task('deploywiki', function() {
  return gulp.src('').pipe(shell([
      'cd wiki',
      'rm -rf .git',
      'git init',
      'git add .',
      'git commit -m "Deploy to Wiki"',
      'git remote add wiki https://github.com/ULL-ESIT-PL-1617/estudiar-las-rutas-en-expressjs-tpka',
      'git push wiki master'
  ]));
});

gulp.task('deploygb', function() {
        return gulp.src('').pipe(shell(['node ./scripts/deploy-gitbook.js']));
});

gulp.task('serve', function() {
        return gulp.src('').pipe(shell(['sudo node hello.js']));
});

gulp.task('basicR', function() {
        return gulp.src('').pipe(shell(['sudo node scripts/basicR.js']));
});

gulp.task('userR', function() {
        return gulp.src('').pipe(shell(['sudo node scripts/user.js']));
});

gulp.task('rout', function() {
        return gulp.src('').pipe(shell(['sudo node scripts/main_rout.js']));
});

gulp.task('middle', function() {
        return gulp.src('').pipe(shell(['sudo node scripts/middle.js']));
});

gulp.task('api', function() {
        return gulp.src('').pipe(shell(['sudo node scripts/api.js']));
});


