/// <reference types="cypress" />
describe('Logout Tests', () => {
  beforeEach(() => {
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + 5000 };
      const token = btoa(JSON.stringify(jwt));
      localStorage.setItem('token', token);
      cy.visit('http://localhost:4200/#/users');
    });
  });

  it('Should log out successfully and navigate to /login', () => {
    cy.get('.nav-bar__logout').click();
    cy.url().should('include', '/login');
    cy.window().then((win) => {
      const token = localStorage.getItem('token');
      expect(token).to.equal(null);
    });
  });

  it('Should fail log out and show error message', () => {
    cy.get('.nav-bar__logout').click();
    cy.window().then((win) => {
      cy.stub(win.localStorage, 'removeItem').throws(new Error('Persistent Storage Error'));
    });
    cy.get('app-modal').should('be.visible');
    cy.get('h3').should('contain', 'Error');
  });
});
