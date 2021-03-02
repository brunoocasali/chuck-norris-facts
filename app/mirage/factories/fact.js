import { Factory } from 'miragejs';
import { lorem } from 'faker';

export default Factory.extend({
  iconUrl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",

  value() {
    return lorem.paragraph(4);
  },
});
