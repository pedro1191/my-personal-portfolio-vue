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

    cy.get('header').within(() => {
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
      data: [
        {
          description: faker.lorem.paragraph(),
          id: faker.datatype.uuid(),
          image: faker.image.dataUri(),
          link: faker.internet.url(),
          live_demo_link: faker.internet.url(),
          name: faker.lorem.words(),
          order: faker.datatype.number(),
          source_code_link: faker.internet.url(),
        },
      ],
    };
    cy.interceptAPICall('GET', 'projects', mockedReturnData);

    cy.visit('/');

    cy.wait('@projects').then((interception) => {
      assert.isNotNull(interception.response.body, 'API call has data');
    });

    cy.get('#portfolio').within(() => {
      cy.get('.portfolio-item').should('have.length', 1).first().click();
    });

    cy.get('.modal-mask').should('be.visible');
    cy.get('.modal-mask').within(() => {
      const project = mockedReturnData.data[0];
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
      message: 'Your message has been sent successfully.',
      status_code: 200,
    };
    cy.interceptAPICall('POST', 'messages', mockedReturnData);

    cy.visit('/');

    cy.get('form').within(() => {
      cy.get('[placeholder="Name *"]').type(faker.name.findName());
      cy.get('[placeholder="Email *"]').type(faker.internet.email());
      cy.get('[placeholder="Message *"]').type(faker.lorem.sentence());
      cy.get('button').should('be.enabled').click();
    });

    cy.wait('@messages').then((interception) => {
      assert.isNotNull(interception.response.body, 'API call has data');
    });

    cy.get('.modal-mask').should('be.visible');
    cy.get('.modal-mask').debug();
    cy.get('.modal-mask').within(() => {
      cy.contains('p', mockedReturnData.message);
      cy.contains('button', 'Ok');
      cy.get('button').click();
    });
    cy.get('.modal-mask').should('not.exist');
  });
});
