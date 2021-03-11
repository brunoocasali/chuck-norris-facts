import { Server, Model } from "miragejs"

import index from "./servers/index";

import ApplicationSerializer from "./serializers/application";
import FactFactory from "./factories/fact";

export function makeServer({ environment = "test" } = {}) {
  return new Server({
    environment,
    timing: 2000,

    models: {
      fact: Model,
    },

    serializers: {
      application: ApplicationSerializer,
    },

    factories: {
      fact: FactFactory
    },

    seeds(server) {
      server.createList("fact", 10);
    },

    routes() {
      index.factsAPI.call(this);
    }
  });
}
