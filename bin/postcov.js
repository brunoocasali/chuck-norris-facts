/* eslint-disable */
var fs = require('fs');
var path = require('path');
var currentPath = path.resolve(__dirname, '..');
var filename = 'cypress-coverage/coverage-final.json';
var re = new RegExp(`${currentPath}/chuck-norris-facts|${currentPath}/chuck-norris-facts.js`, 'ig');

console.info(`Replacing all occurrences from ${currentPath} in ${filename}`);

fs.readFile(filename, 'utf8', function(err, data) {
  if (err)
    return console.log(err);

  const result = data.replace(re, 'app');

  fs.writeFile(filename, result, 'utf8', function(err) {
    if (err)
      return console.log(err);
  });
});

console.info('done!');
