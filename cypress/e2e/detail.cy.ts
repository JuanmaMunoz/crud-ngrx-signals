import { statistics } from './../../src/assets/data/statistics';
/// <reference types="cypress" />
import { IUserDetail } from '../../src/app/users/models/interfaces';
import { users } from '../fixtures/users';
const userDetail: IUserDetail = {
  info: users[0],
  statistics: statistics[0],
};
describe('Detail User Tests', () => {
  beforeEach(() => {
    cy.fixture('login').then((user) => {
      const jwt = { email: user.email, expiration: new Date().getTime() + 3600000 };
      const token = btoa(JSON.stringify(jwt));
      localStorage.setItem('token', token);
      cy.visit(`http://localhost:4200/#/users/detail/${userDetail.info.email}`);
    });
  });

  it('Check the content on the web', () => {
    cy.get('app-navbar').should('be.visible');
    cy.get('app-back-users').should('be.visible');
    cy.get('app-info').should('be.visible');
    cy.get('app-user-form').should('not.exist');
    cy.get('app-avatar').should('be.visible');
    cy.contains('button', 'Edit').should('be.visible');
    cy.contains('button', 'Delete').should('be.visible');
    cy.get('app-box-info').each(($el, index) => {
      cy.wrap($el).within(() => {
        if (index === 0) {
          cy.get('h5').should('contain', 'Position');
          cy.get('h4').should('contain', userDetail.info.position);
        } else if (index === 1) {
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }).format(new Date(userDetail.info.date));

          cy.get('h5').should('contain', 'Incorporation');
          cy.get('h4').should('contain', formattedDate);
        } else {
          cy.get('h5').should('contain', 'Salary');
          const formattedSalary = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(userDetail.info.salary);
          cy.get('h4').should('contain', formattedSalary);
        }
      });
    });
    cy.get('app-chart').should('be.visible');
  });

  it('Should return to /users when clicking Back to users', () => {
    cy.get('a[href="#/users"]').click();
    cy.url().should('eq', 'http://localhost:4200/#/users');
  });

  it('Should show edition mode when clicking Edit button', () => {
    cy.validateEditionMode(userDetail);
  });

  it('Should show a modal and delete the user when clicking the delete button', () => {
    cy.get('button').contains('Delete').first().click();
    cy.get('.modal-dialog')
      .filter(':visible')
      .should('be.visible')
      .within(() => {
        cy.contains('button', 'Delete').click({ force: true });
      });
    cy.get('.modal-dialog').should('not.be.visible');
    cy.url().should('eq', 'http://localhost:4200/#/users');
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('td').eq(0).should('not.contain', users[0].name);
      });
  });

  it('Should show a modal and cancel user deletion when clicking the delete button', () => {
    cy.get('button').contains('Delete').first().click();
    cy.validateDeletionUserModal(users[0]);
    cy.contains('button', 'Cancel').filter(':visible').first().click();
    cy.get('.modal-dialog').should('not.be.visible');
    cy.url().should('eq', `http://localhost:4200/#/users/detail/${userDetail.info.email}`);
  });

  // it('Should fail getUser and show error 500 message (MOCK REAL API)', () => {
  //   cy.intercept('GET', '**/user*', {
  //     statusCode: 500,
  //     body: { error: 'Internal Server Error', message: 'Error Get Users' },
  //     delay: 500,
  //   }).as('getUserFailure');
  //   cy.visit('/users');
  //   cy.wait('@getUserFailure');
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
});
