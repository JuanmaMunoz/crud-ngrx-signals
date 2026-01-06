import { createReducer, on } from '@ngrx/store';
import { IMessageState } from '../../models/interfaces';
import { messageShow, setInitialStateMessage } from '../actions/message.action';

export const initialState: IMessageState = { message: null };

export const messageReducer = createReducer(
  initialState,
  on(messageShow, (state, { message }) => ({
    ...state,
    message,
  })),
  on(setInitialStateMessage, () => initialState),
);
