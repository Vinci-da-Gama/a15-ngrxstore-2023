import { createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from './../../contracts/interfaces/auth-state-interface';

const AuthInitState: AuthStateInterface = {
  user: null,
  authError: null,
  loading: false,
};

const _typeReducer = createReducer(
  initialState,
  on(action, (state) => state)
);
