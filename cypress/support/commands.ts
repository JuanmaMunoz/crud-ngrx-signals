/// <reference types="cypress" />
Cypress.Commands.add('validateUserRow', (rowIndex, user) => {
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
