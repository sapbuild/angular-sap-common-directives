var pkg = require('../package.json');
var config = {
    clean: [ 'coverage', 'log/**/*' ],
    mocha: [ 'test/*.js'],
    src: ['common-directives/**/*.js']
};

config.eslint = config.src;

module.exports = config;