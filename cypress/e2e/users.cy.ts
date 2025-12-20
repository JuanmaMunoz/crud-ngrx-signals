/// <reference types="cypress" />
import { users } from '../fixtures/users';

describe('Users Tests', () => {
  beforeEach(() => {
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + 5000 };
      const token = btoa(JSON.stringify(jwt));
      localStorage.setItem('token', token);
      cy.visit('http://localhost:4200/#/users');
    });
  });

  it('Check content in the web', () => {
    cy.get('app-navbar').should('be.visible');
    cy.get('app-list').should('be.visible');
    cy.get('table').should('be.visible').find('tbody tr').should('have.length', 10);
    cy.validateUserRow(0, users[0]);
    cy.validateUserRow(9, users[9]);
  });

  it('should find the user when searching', () => {
    const delay = 400;
    cy.get('input[name="search"]').type(' ');
    cy.wait(delay);
    cy.get('input[name="search"]').clear().type(users[0].email);
    cy.wait(delay);
    cy.get('table').should('be.visible').find('tbody tr').should('have.length', 1);
    cy.validateUserRow(0, users[0]);
  });

  it('should show 10 users when clearing the search', () => {
    const delay = 400;
    cy.get('input[name="search"]').clear();
    cy.wait(delay);
    cy.get('table').should('be.visible').find('tbody tr').should('have.length', 10);
    cy.validateUserRow(0, users[0]);
  });

  it('Should click the row and navigate to /user/detail', () => {
    const user = users[0];
    cy.get('tbody tr').eq(0).click();
    cy.url().should('include', `users/detail/${user.email}`);
    cy.get('h4').should('contain', user.name);
    cy.get('h5').should('contain', user.email);
  });

  it('Should navigate to /users/create when clicking the creation button', () => {
    cy.get('button').find('.bi-person-plus').click();
    cy.url().should('include', 'users/create');
    cy.get('h4').should('contain', 'New User');
    cy.get('h5').should('contain', 'Insert new user in the system');
  });

  it('Should delete user when clicking the icon', () => {
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('.bi-x-circle').click();
      });
    cy.get('h3').should('contain', 'Delete user');
    cy.get('span').should('contain', `${users[0].name}`);
    cy.get('span').should('contain', `${users[0].email}`);
  });

  /*it('Should return to /users when clicking ‘Back to users', () => {
    cy.get('a[href="#/users"]').click();
    cy.url().should('eq', 'http://localhost:4200/#/login');
  });*/
});
