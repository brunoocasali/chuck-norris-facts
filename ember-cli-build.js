'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const environment = EmberApp.env();
const isProd = environment === 'production';
const isTest = environment === 'test';

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    hinting: isTest,
    tests: isTest,
    'ember-cli-babel': {
      includePolyfill: isProd,
    },
    autoprefixer: {
      sourcemap: false,
    },
    sourcemaps: {
      enabled: isProd,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\\.js?$/,
              exclude: /mirage.*|cypress.*/,
            },
          ],
        },
      },
    },
  });
};
