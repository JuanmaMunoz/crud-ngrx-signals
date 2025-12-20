/// <reference types="cypress" />
import { users } from '../fixtures/users';

describe('Users Tests', () => {
  beforeEach(() => {
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + 3600000 };
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

  it('Should show a modal and delete the user when clicking the delete button', () => {
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('.bi-x-circle').click();
      });
    cy.validateDeletionUserModal(users[0]);
    cy.contains('button', 'Delete').filter(':visible').first().click();
    cy.wait(500);
    cy.get('.modal-dialog').should('not.be.visible');
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('td').eq(0).should('not.have.text', users[0].name);
      });
  });

  it('Should show a modal and cancel user deletion when clicking the delete button', () => {
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('.bi-x-circle').click();
      });
    cy.validateDeletionUserModal(users[0]);
    cy.contains('button', 'Cancel').filter(':visible').first().click();
    cy.wait(500);
    cy.get('.modal-dialog').should('not.be.visible');
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('td').eq(0).should('contain', users[0].name);
      });
  });

  // it('Should fail getUsers and show error 500 message (MOCK REAL API)', () => {
  //   cy.intercept('GET', '**/users', {
  //     statusCode: 500,
  //     body: { error: 'Internal Server Error', message: 'Error Get Users' },
  //     delay: 500,
  //   }).as('getUsersFailure');
  //   cy.visit('/users');
  //   cy.wait('@getUsersFailure');
  //   cy.get('app-error').should('be.visible');
  // });

  // it('Should fail deleteUser and show error 500 message (MOCK REAL API)', () => {
  //   cy.intercept('DELETE', '**/user*', {
  //     statusCode: 500,
  //     body: { error: 'Internal Server Error', message: 'Error Delete User' },
  //     delay: 500,
  //   }).as('deleteUserFailure');
  //   cy.validateDeletionUserModal(users[0]);
  //   cy.contains('button', 'Delete').filter(':visible').first().click()
  //   cy.wait('@deleteUserFailure');
  //   cy.get('app-error').should('be.visible');
  // });

  /*it('Should return to /users when clicking Back to users', () => {
    cy.get('a[href="#/users"]').click();
    cy.url().should('eq', 'http://localhost:4200/#/login');
  });*/
});
