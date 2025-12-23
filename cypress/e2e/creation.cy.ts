import { statistics } from '../../src/assets/data/statistics';
/// <reference types="cypress" />
import { IUser, IUserDetail } from '../../src/app/users/models/interfaces';
import { users } from '../fixtures/users';
const userDetail: IUserDetail = {
  info: users[0],
  statistics: statistics[0],
};
describe('Creation User Tests', () => {
  beforeEach(() => {
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + 3600000 };
      const token = btoa(JSON.stringify(jwt));
      localStorage.setItem('token', token);
      cy.visit('http://localhost:4200/#/users/create');
    });
  });

  it('Check the content on the web', () => {
    // The rest of the checks are done in validateEditionModel.
    cy.get('input[id="Name"]').should('have.value', '');
    cy.get('input[id="Lastname"]').should('have.value', '');
    cy.get('input[id="Email"]').should('have.value', '');
    cy.get('input[id="Position"]').should('have.value', '');
    cy.get('input[id="Incorporation date"]').should('have.value', '');
    cy.get('input[id="Email"]').should('have.value', '');
    cy.get('input[id="Salary"]').should('have.value', '');
    cy.get('input[id="Coworker"]').should('have.value', 5);
    cy.get('input[id="Hardworking"]').should('have.value', 5);
    cy.get('input[id="Knowledge"]').should('have.value', 5);
    cy.get('input[id="Proactivity"]').should('have.value', 5);
    cy.get('input[id="Productivity"]').should('have.value', 5);
    cy.contains('button', 'Cancel').should('be.visible').should('be.enabled');
    cy.contains('button', 'Save').should('be.visible').should('be.disabled');
  });

  it('Should return to /users when clicking Back to users', () => {
    cy.get('a[href="#/users"]').click();
    cy.url().should('eq', 'http://localhost:4200/#/users');
  });

  it('Should cancel edition when clicking Cancel button', () => {
    cy.contains('button', 'Cancel').click();
    cy.url().should('eq', 'http://localhost:4200/#/users');
  });

  it('Should disable Save button when form is invalid', () => {
    cy.contains('button', 'Save').should('be.disabled');
  });

  it('should save the changes when clicking Save button', () => {
    const newUser: Partial<IUser> = {
      name: 'New User created',
      lastName: 'New User Lastname',
      email: 'newuser@example.com',
      salary: 50000,
      position: 'New User Position',
    };
    cy.validateCreation(newUser as IUser);
    cy.contains('button', 'Save').click();
    cy.wait(500);
    cy.get('app-user-form').should('not.exist');
    cy.get('app-info').should('be.visible');
    cy.get('h4').should('contain', newUser.name);
    cy.get('h5').should('contain', newUser.email);
  });

  it('Should show an error message when trying to create a user with an existing email', () => {
    const existingUser: Partial<IUser> = {
      name: 'Existing User',
      lastName: 'Existing User Lastname',
      email: users[0].email, // Existing email
      salary: 60000,
      position: 'Existing User Position',
    };
    cy.validateCreation(existingUser as IUser);
    cy.contains('button', 'Save').click();
    cy.get('app-error').should('be.visible');
    cy.get('p').should('contain', 'The email is already in use.');
  });

  // it('Should fail createUser and show error 500 message (MOCK REAL API)', () => {
  //   cy.intercept('POST', '**/user', {
  //     statusCode: 500,
  //     body: { error: 'Internal Server Error', message: 'Error Create User' },
  //     delay: 500,
  //   }).as('createUserFailure');
  //   cy.visit('/users');
  //   cy.wait('@createUserFailure');
  //   cy.get('app-error').should('be.visible');
  // });
});
