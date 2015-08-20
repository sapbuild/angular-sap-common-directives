'use strict';

var gulp = require('gulp');
var config = require('./gulp-config');

var helper = {
    plugins: {},
    getPlugin: function (name) {
        var plugin = this.plugins[name];
        if (!plugin) {
            plugin = require(name);
            this.plugins[name] = plugin;
        }
        return plugin;
    }
};

gulp.task('default', ['build'], function () {
});

gulp.task('build', ['clean', 'eslint'], function () {
});

gulp.task('clean', function (done) {
    var del = helper.getPlugin('del');
    del(['coverage', 'tmp'], function (err) {
        done(err);
    });
});


gulp.task('eslint', function () {
    var eslint = helper.getPlugin('gulp-eslint');
    return gulp.src(['index.js', 'gulpfile.js', 'make', 'common-directives/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('dist', [ 'build' ], function () {
});
