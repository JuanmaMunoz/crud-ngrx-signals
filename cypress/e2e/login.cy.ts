/// <reference types="cypress" />
describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#/login');
  });

  it('Check the content on the web', () => {
    cy.get('app-header').should('be.visible');
    cy.get('app-info-crud').should('be.visible');
    cy.get('app-login-form').should('be.visible');
    cy.get('app-about-me').should('be.visible');
    cy.get('app-navbar').should('not.exist');
  });

  it('Should log in successfully and navigate to /users', () => {
    cy.fixture('login').then((user) => {
      cy.get('input[id="Email"]').clear().type(user.email);
      cy.get('input[id="Password"]').clear().type(user.pass);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/users');
      cy.window().then((win) => {
        const token = localStorage.getItem('token');
        const jwt = JSON.parse(atob(token!));
        expect(jwt.email).to.equal(user.email);
      });
    });
  });

  it('Should fail login and show an error message', () => {
    cy.fixture('login').then((user) => {
      cy.get('input[id="Email"]').clear().type(user.email);
      cy.get('input[id="Password"]').clear().type('fake');
      cy.get('button[type="submit"]').click();
      cy.get('app-error').should('be.visible');
    });
  });

  // it('Should fail log in and show error 500 message (MOCK REAL API)', () => {
  //   cy.intercept('POST', '**/login', {
  //     statusCode: 500,
  //     body: { error: 'Internal Server Error', message: 'Error Login' },
  //     delay: 500,
  //   }).as('loginFailure');
  //   cy.get('input[id="Email"]').clear().type(user.email);
  //   cy.get('input[id="Password"]').clear().type(user.pass);
  //   cy.get('button[type="submit"]').click();
  //   cy.wait('@loginFailure');
  //   cy.get('app-error').should('be.visible');
  // });
});
