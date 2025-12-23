import { IUser } from './../../src/app/users/models/interfaces';
/// <reference types="cypress" />

import { IUserDetail } from '../../src/app/users/models/interfaces';

Cypress.Commands.add('validateUserRow', (rowIndex: number, user: IUser) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(user.date));

  cy.get('tbody tr')
    .eq(rowIndex)
    .within(() => {
      cy.get('td').eq(0).should('contain', user.name);
      cy.get('td').eq(1).should('contain', user.email);
      cy.get('td').eq(2).should('contain', formattedDate);
      cy.get('td').eq(3).should('contain', user.position);
    });
});

Cypress.Commands.add('validateDeletionUserModal', (user: IUser) => {
  cy.get('.modal-dialog').should('be.visible');
  cy.get('h3').should('contain', 'Delete user');
  cy.get('span').should('contain', `${user.name}`);
  cy.get('span').should('contain', `${user.email}`);
});

Cypress.Commands.add('validateEditionMode', (userDetail: IUserDetail) => {
  cy.contains('button', 'Edit').click();
  cy.get('app-navbar').should('be.visible');
  cy.get('app-back-users').should('be.visible');
  cy.get('app-info').should('not.exist');
  cy.get('app-user-form').should('be.visible');
  cy.get('app-avatar').should('be.visible');
  cy.get('h4').should('contain', userDetail.info.name);
  cy.get('h5').should('contain', userDetail.info.email);
});

Cypress.Commands.add('validateCreation', (newUser: IUser) => {
  cy.get('input[id="Name"]').type(newUser.name!);
  cy.get('input[id="Lastname"]').type(newUser.lastName!);
  cy.get('input[id="Email"]').type(newUser.email!);
  cy.get('input[id="Position"]').type(newUser.position!);
  const isoDate = new Date().toISOString().split('T')[0];

  cy.get('input[type="date"]')
    .click()
    .focus()
    .invoke('val', isoDate)
    .trigger('input')
    .trigger('change');

  cy.get('input[type="date"]').should('have.value', isoDate);

  cy.get('input[id="Salary"]').type(newUser.salary!.toString());
});
