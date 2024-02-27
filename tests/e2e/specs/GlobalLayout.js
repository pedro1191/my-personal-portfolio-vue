// https://docs.cypress.io/api/table-of-contents

import { faker } from '@faker-js/faker';

describe('GlobalLayout.vue', () => {
  it('Loads the home page content', () => {
    cy.visit('/');

    cy.get('nav').within(() => {
      cy.get('a[title="Home"]');
      cy.contains('a', 'PORTFOLIO');
      cy.contains('a', 'ABOUT');
      cy.contains('a', 'CONTACT');
    });

    cy.get('header')
      .first()
      .within(() => {
        cy.contains('h1', 'Pedro de Almeida');
        cy.contains('h2', 'Full Stack Web Developer');
      });

    cy.get('#portfolio').within(() => {
      cy.contains('h1', 'PORTFOLIO');
      cy.get('.portfolio-item').should('have.length.gte', 1);
    });

    cy.get('#about').within(() => {
      cy.contains('h1', 'ABOUT');
    });

    cy.get('#contact').within(() => {
      cy.contains('h1', 'CONTACT');
      cy.get('form').within(() => {
        cy.get('[placeholder="Name *"]');
        cy.get('[placeholder="Email *"]');
        cy.get('[placeholder="Message *"]');
        cy.get('button').should('be.disabled');
      });
    });

    cy.get('footer').within(() => {
      cy.contains('h4', 'LOCATION');
      cy.contains('p', 'Lisbon - Portugal.');
      cy.contains('h4', 'AROUND THE WEB');
      cy.contains('a', 'LinkedIn');
      cy.contains('a', 'GitHub');

      const currentYear = new Date().getFullYear();
      cy.contains(`Pedro de Almeida's Portfolio ${currentYear}`);
    });
  });

  it('Opens the details of a project', () => {
    const mockedReturnData = {
      body: {
        data: [
          {
            description: faker.lorem.paragraph(),
            id: faker.string.uuid(),
            image: faker.image.url(),
            link: faker.internet.url(),
            live_demo_link: faker.internet.url(),
            name: faker.lorem.words(),
            order: faker.number.int(),
            source_code_link: faker.internet.url(),
          },
        ],
      },
      statusCode: 200,
      delay: 500,
    };
    cy.interceptAPICall('GET', 'projects', mockedReturnData);

    cy.visit('/');

    cy.get('.loader').should('be.visible');

    cy.wait('@projects').then((interception) => {
      expect(interception.response.body.data.length).to.be.equal(
        mockedReturnData.body.data.length
      );
    });

    cy.get('.loader').should('not.exist');

    cy.get('#portfolio').within(() => {
      cy.get('.portfolio-item').should('have.length', 1).first().click();
    });

    cy.get('.modal-mask')
      .should('be.visible')
      .within(() => {
        const project = mockedReturnData.body.data[0];
        cy.contains('h1', project.name);
        cy.get(`a[href="${project.live_demo_link}"]`);
        cy.get(`a[href="${project.source_code_link}"]`);
        cy.contains(project.description);
        cy.get(`img[src="${project.image}"]`);
        cy.get('button[title="Close"]').click();
      });
    cy.get('.modal-mask').should('not.exist');
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
        mockedReturnData.body.message
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
