import { statistics } from '../../src/assets/data/statistics';
/// <reference types="cypress" />
import { IUserDetail } from '../../src/app/users/models/interfaces';
import { users } from '../fixtures/users';
const userDetail: IUserDetail = {
  info: users[0],
  statistics: statistics[0],
};
describe('Edition User Tests', () => {
  beforeEach(() => {
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + 3600000 };
      const token = btoa(JSON.stringify(jwt));
      localStorage.setItem('token', token);
      cy.visit(`http://localhost:4200/#/users/detail/${userDetail.info.email}`);
      cy.validateEditionMode(userDetail);
    });
  });

  it('Check the content on the web', () => {
    // The rest of the checks are done in validateEditionModel.
    cy.get('input[id="Name"]').should('have.value', userDetail.info.name);
    cy.get('input[id="Lastname"]').should('have.value', userDetail.info.lastName);
    cy.get('input[id="Email"]').should('have.value', userDetail.info.email);
    cy.get('input[id="Position"]').should('have.value', userDetail.info.position);
    const isoDate = new Date(userDetail.info.date).toISOString().split('T')[0];
    cy.get('input[id="Incorporation date"]').should('have.value', isoDate);
    cy.get('input[id="Email"]').should('have.value', userDetail.info.email);
    cy.get('input[id="Salary"]').should('have.value', userDetail.info.salary);
    cy.get('input[id="Coworker"]').should('have.value', userDetail.statistics.coworker);
    cy.get('input[id="Hardworking"]').should('have.value', userDetail.statistics.hardworking);
    cy.get('input[id="Knowledge"]').should('have.value', userDetail.statistics.knowledge);
    cy.get('input[id="Proactivity"]').should('have.value', userDetail.statistics.proactivity);
    cy.get('input[id="Productivity"]').should('have.value', userDetail.statistics.productivity);
    cy.contains('button', 'Cancel').should('be.visible').should('be.enabled');
    cy.contains('button', 'Save').should('be.visible').should('be.enabled');
  });

  it('Should return to /users when clicking Back to users', () => {
    cy.get('a[href="#/users"]').click();
    cy.url().should('eq', 'http://localhost:4200/#/users');
  });

  it('Should cancel edition when clicking Cancel button', () => {
    cy.contains('button', 'Cancel').click();
    cy.url().should('eq', `http://localhost:4200/#/users/detail/${userDetail.info.email}`);
    cy.get('app-user-form').should('not.exist');
    cy.get('app-info').should('be.visible');
  });

  it('Should disable Save button when form is invalid', () => {
    cy.get('input[id="Name"]').clear();
    cy.contains('button', 'Save').should('be.disabled');
  });

  it('should save the changes when clicking Save button', () => {
    const newName = 'UpdatedName';
    cy.get('input[id="Name"]').clear().type(newName);
    cy.contains('button', 'Save').click();
    cy.url().should('eq', `http://localhost:4200/#/users/detail/${userDetail.info.email}`);
    cy.get('app-user-form').should('not.exist');
    cy.get('app-info').should('be.visible');
    cy.get('h4').should('contain', newName);
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
