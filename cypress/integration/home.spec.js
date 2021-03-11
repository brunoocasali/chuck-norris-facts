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

  it('visits home page', () => {
    cy.visit('/');

    cy.url().should('include', '/');
    cy.get('button').should('exist');
    cy.get('title').contains('Home | Chuck Norris - Facts');
  });

  it('loads random fact automatically', () => {
    mirage.create('fact');
    mirage.timing = 200;

    cy.visit('/');

    cy.get('.qa-loader').should('exist');
    cy.get('.qa-fact').should('exist');
    cy.get('.qa-fact > .qa-fact-value').should('not.be.empty');
  });

  context('when click on see more button', () => {
    it('loads another random fact', () => {
      mirage.createList('fact', 3);

      cy.visit('/');
      cy.get('.qa-fact-btn').click();

      cy.get('.qa-fact').should('exist');
      cy.get('.qa-fact > .qa-fact-value').should('not.be.empty');
    });

    it('guarantees that new fact will be different', () => {
      const fact1 = mirage.create('fact', { value: 'fact 1' });
      const fact2 = mirage.create('fact', { value: 'fact 2' });

      let counter = 0;

      mirage.get(`https://api.chucknorris.io/jokes/random`, () => {
        // the idea is to force same response even in multiple callings
        counter++;

        return [1, 2, 3].includes(counter) ? fact1 : fact2;
      });

      cy.visit('/');

      cy.get('.qa-fact').should('exist');
      cy.get('.qa-fact-value').contains('fact 1');

      cy.get('.qa-fact-btn').click();

      cy.get('.qa-fact-value').contains('fact 2');
    });

    it('does not retries more than 5 times', () => {
      const fact1 = mirage.create('fact', { value: 'fact 1' });

      let counter = 0;

      mirage.logging = true;
      mirage.get(`https://api.chucknorris.io/jokes/random`, () => {
        // the idea is to force same response even in multiple callings
        counter++;

        // 1 (first call does not counts) + 5 retries
        return fact1;
      });

      cy.visit('/');

      cy.get('.qa-fact').should('exist');
      cy.get('.qa-fact-value').contains('fact 1');

      cy.get('.qa-fact-btn').click();

      cy.get('.qa-fact-value').then(($h1) => {
        cy.wrap($h1).contains('fact 1');

        expect(counter).to.eq(6);
      });
    });
  });
});
