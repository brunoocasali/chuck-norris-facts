module.exports = {
  reporters: ['json', 'lcov'],
  coverageFolder: 'unit-coverage',
  excludes: ['**/mirage/**/*', 'mirage', 'app/mirage/**/*.js']
}
