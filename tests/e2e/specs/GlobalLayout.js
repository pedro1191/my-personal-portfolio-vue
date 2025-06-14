// https://docs.cypress.io/api/table-of-contents

import { faker } from '@faker-js/faker';

describe('GlobalLayout.vue', () => {
  it('Loads the home page content', () => {
    cy.visit('/');

    cy.get('nav').within(() => {
      cy.get('a[title="Home"]');
      cy.contains('a', 'Projects');
      cy.contains('a', 'About');
      cy.contains('a', 'Contact');
    });

    cy.get('.header')
      .first()
      .within(() => {
        cy.contains('h1', 'Pedro de Almeida');
        cy.contains('h4', 'Full-stack Web Developer');
        cy.contains('h6', 'Based in Lisbon, Portugal');
      });

    cy.get('#portfolio').within(() => {
      cy.contains('h2', 'Projects');
    });
    cy.get('.portfolio').within(() => {
      cy.get('.project').should('have.length.gte', 3);
    });

    cy.get('#about').within(() => {
      cy.contains('h2', 'About');
    });

    cy.get('#contact').within(() => {
      cy.contains('h2', 'Contact');
    });
    cy.get('form').within(() => {
      cy.get('[placeholder="Name *"]');
      cy.get('[placeholder="Email *"]');
      cy.get('[placeholder="Message *"]');
      cy.get('button').should('be.disabled');
    });

    cy.get('footer').within(() => {
      const currentYear = new Date().getFullYear();
      cy.contains(`Pedro de Almeida's Portfolio ${currentYear}`);
    });
  });

  it('Sends the contact message', () => {
    const mockedReturnData = {
      body: {
        message: 'Your message has been sent successfully.',
      },
      statusCode: 200,
      delay: 500,
    };
    cy.interceptAPICall('POST', 'messages', mockedReturnData);

    cy.visit('/');

    cy.get('form').within(() => {
      cy.get('[placeholder="Name *"]').type(faker.person.fullName());
      cy.get('[placeholder="Email *"]').type(faker.internet.email());
      cy.get('[placeholder="Message *"]').type(faker.lorem.sentence());
      cy.get('button').should('be.enabled').click();
    });

    cy.get('.loader').should('be.visible');

    cy.wait('@messages').then((interception) => {
      expect(interception.response.body.message).to.be.equal(
        mockedReturnData.body.message,
      );
    });

    cy.get('.loader').should('not.exist');

    cy.get('.modal-mask')
      .should('be.visible')
      .within(() => {
        cy.contains('p', mockedReturnData.body.message);
        cy.contains('button', 'Ok');
        cy.get('button').click();
      });
    cy.get('.modal-mask').should('not.exist');
  });
});
