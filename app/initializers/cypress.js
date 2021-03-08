import { Server, Response } from "miragejs";
import config from 'chuck-norris-facts/config/environment';

export default {
  name: 'cypress.js',

  initialize() {
    if (window.Cypress) {
      new Server({
        environment: "test",

        routes() {
          const methods = ["get", "put", "patch", "post", "delete"];
          const hosts = [config.API];

          hosts.forEach((host) => {
            this.urlPrefix = host;

            methods.forEach((method) => {
              this[method]("/*", async (_schema, request) => {
                let [status, headers, body] = await window.handleFromCypress(request);

                return new Response(status, headers, body);
              });
            });
          });
        }
      });
    }
  }
};
