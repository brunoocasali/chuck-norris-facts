import { makeServer } from "../../app/mirage/config";

describe('Home', () => {
  let mirage;

  beforeEach(() => {
    mirage && mirage.shutdown();
    mirage = makeServer({ environment: "test" });
  });

  afterEach(() => {
    mirage && mirage.shutdown();
  });

  it('visits home page', () => {
    cy.visit('/');

    cy.url().should('include', '/');

    cy.get('title').contains('Home | Chuck Norris - Facts');
  });
});
