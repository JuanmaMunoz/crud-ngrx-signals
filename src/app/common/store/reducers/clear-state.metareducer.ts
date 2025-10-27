import { ActionReducer, MetaReducer } from '@ngrx/store';
import { logoutSuccess } from '../../../login/store/actions/login.action';

export function clearStateMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === logoutSuccess.type) {
      state = undefined; // 🔥 clear all store
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [clearStateMetaReducer];
