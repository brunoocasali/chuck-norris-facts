import { makeServer } from 'chuck-norris-facts/mirage/config';
import config from 'chuck-norris-facts/config/environment';

// An object to register the container to ensure that mirage is shutdown when app is destroyed
class MirageShutdown {
  server = null;

  willDestroy() {
    this.server.shutdown();
  }
}

export default {
  // Make sure the mirage will not start twice when we running tests
  // and running the development server.
  name: 'mirage.js',

  initialize(application) {
    const { START_MIRAGE, MIRAGE_SCENARIO, environment } = config;
    const scenario = MIRAGE_SCENARIO || 'develop';

    if (START_MIRAGE && !window.Cypress) {
      MirageShutdown.server = makeServer({ environment, scenario });
      application.register('mirage:shutdown', MirageShutdown);
    }
  }
}
