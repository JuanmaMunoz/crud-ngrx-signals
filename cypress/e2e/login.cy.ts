describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#/login');
  });

  it('Check content in the template', () => {
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
});
