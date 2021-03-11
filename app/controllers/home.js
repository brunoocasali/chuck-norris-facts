import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

import ENV from 'chuck-norris-facts/config/environment';

export default class HomeController extends Controller {
  @tracked data;

  constructor() {
    super(...arguments);

    this.random.perform();
  }

  @dropTask *random() {
    let counter = 0;
    let unchanged = true;
    let currentData = this.data;

    do {
      const response = yield fetch(`${ENV.API}/jokes/random`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });

      currentData = yield response.json();

      if (this.data?.id !== currentData?.id) {
        unchanged = false;
        this.data = currentData;
      } else {
        counter ++;
      }
    } while (unchanged && counter < 5);
  }
}
