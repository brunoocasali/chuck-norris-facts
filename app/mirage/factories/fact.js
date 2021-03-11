import { Factory } from 'miragejs';
import { random } from 'faker';

export default Factory.extend({
  iconUrl: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',

  id() {
    return random.uuid();
  },

  url() {
    return `https://api.chucknorris.io/jokes/${this.id}`;
  },

  value() {
    return random.arrayElement([
      'Chuck Norris is the reason that the Army had to change their slogan, "An Army of One',
      'Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Masacre',
      'When Chuck Norris pokes you on Facebook you can feel it',
      'coyote vs road runner is just a performance how fast can Chuck Norris bip-iping',
      "Every time someone types 'Chuck Norris', a gas station explodes",
      'On a recent trip to Vegas, Chuck Norris won a hand of blackjack with 21 aces.',
      "Hurricanes are mother nature's way of running from Chuck Norris.",
    ]);
  },
});
