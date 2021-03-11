import factsAPI from './facts';

// This servers was defined individually and called by binding `this` to server function
// because today miragejs does not support multi-api's
// https://github.com/miragejs/discuss/issues/44

export default { factsAPI };
