import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import { RESERVED_WORDS } from 'chuck-norris-facts/constants';

export default helper(function highlight([data, words = RESERVED_WORDS]) {
  words.map((word) => {
    data = data.replace(new RegExp(word.trim(), 'gi'), '<mark>$&</mark>');
  });

  return htmlSafe(data);
});
