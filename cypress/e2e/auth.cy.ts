/// <reference types="cypress" />

import { users } from '../fixtures/users';

describe('Auth Tests', () => {
  beforeEach(() => {
    localStorage.removeItem('token');
  });

  it('Check authGuard runs', () => {
    cy.visit(`http://localhost:4200/#/users}`);
    cy.url().should('eq', 'http://localhost:4200/#/login');
  });

  it('Check loginGuard runs', () => {
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + 3600000 };
      const token = btoa(JSON.stringify(jwt));
      localStorage.setItem('token', token);
      cy.visit(`http://localhost:4200/#/users`);
      cy.wait(500);
      cy.visit(`http://localhost:4200/#/login`);
      cy.url().should('eq', 'http://localhost:4200/#/users');
    });
  });

  it('Check show session expired message', () => {
    const email = users[0].email;
    const duration = 5000;
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + duration };
      const token = btoa(JSON.stringify(jwt));
      localStorage.setItem('token', token);
      cy.visit(`http://localhost:4200/#/users`);
      cy.wait(duration + 100);
      cy.visit(`http://localhost:4200/#/users/detail/${email}`);
      cy.get('.modal-dialog').should('be.visible');
      cy.get('p')
        .contains('Your session has expired. Please log in again to continue.')
        .should('be.visible');
    });
  });
});
