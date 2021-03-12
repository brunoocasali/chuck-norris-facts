import { makeServer } from '../../app/mirage/config';

describe('Home', () => {
  let mirage;

  beforeEach(() => {
    mirage && mirage.shutdown();
    mirage = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    mirage && mirage.shutdown();
  });

  context('when visits invalid page', () => {
    it('redirects to 404', () => {
      cy.visit('/non-existent-route');

      cy.url().should('include', '/non-existent-route');

      cy.get('a.qa-link').should('exist');
      cy.get('title').contains('404 | Chuck Norris - Facts');

      cy.contains(
        "You don't found this page but you know, Chuck Norris can found you..."
      );
    });

    it('goes back to home if click in link', () => {
      cy.visit('/non-existent-route');

      cy.url().should('include', '/non-existent-route');

      cy.get('.qa-link').click();

      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
