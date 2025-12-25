import { createAction, props } from '@ngrx/store';

export const messageShow = createAction('[Message] Show', props<{ message: string }>());
export const setInitialStateMessage = createAction('[Message] Set initial state');
