declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Valida los datos de una fila en la tabla de usuarios.
       * @param rowIndex Índice de la fila (0 para la primera)
       * @param user Objeto con los datos del usuario
       */
      validateUserRow(rowIndex: number, user: any): Chainable<void>;
    }
  }
}

export {};
