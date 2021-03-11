import { RestSerializer } from 'miragejs';
import snakeCase from 'lodash.snakecase';

export default RestSerializer.extend({
  root: false,
  embed: true,

  keyForAttribute(attr) {
    return snakeCase(attr);
  },

  typeKeyForModel(model) {
    return snakeCase(model);
  },
});
