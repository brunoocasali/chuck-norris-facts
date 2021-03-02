import { random } from 'faker';

/*
  chucknorris.io configuration:
*/
export default function() {
  // Using a hardcoded and interpoled string instead of urlPrefix
  // because today miragejs does not support multi-api's
  // https://github.com/miragejs/discuss/issues/44
  const url = 'https://api.chucknorris.io/';

  this.get(`${url}/jokes/random`, (db) => {
    return random.arrayElement(db.facts.all().models);
  });
}
