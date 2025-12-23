import { IUser, IUserDetail } from './../../src/app/users/models/interfaces';
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Valida los datos de una fila en la tabla de usuarios.
       * @param rowIndex Índice de la fila (0 para la primera)
       * @param user Objeto con los datos del usuario
       */
      validateUserRow(rowIndex: number, user: IUser): Chainable<void>;
      validateDeletionUserModal(user: IUser): Chainable<void>;
      validateEditionMode(userDetail: IUserDetail): Chainable<void>;
      validateCreation(newUser: IUser): Chainable<void>;
    }
  }
}

export {};
