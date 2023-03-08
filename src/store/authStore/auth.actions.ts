import { createAction, props } from '@ngrx/store';

import {
  LOGIN_START,
  SIGNUP_START,
  AUTO_LOGIN,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_CLEAR_ERROR,
  LOGOUT,
} from '../types';
import { UserModel } from './../../contracts/models/user/user-model';
import { EmailPswdInterface } from './../../contracts/interfaces/email-pswd-interface';

export const LoginStart = createAction(
  LOGIN_START,
  props<EmailPswdInterface>()
);

export const SignupStart = createAction(
  SIGNUP_START,
  props<EmailPswdInterface>()
);

export const AutoLogin = createAction(AUTO_LOGIN);

export const AuthenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{ user: UserModel; redirect: boolean }>()
);

export const AuthenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ authError: string }>()
);

export const ClearError = createAction(AUTHENTICATE_CLEAR_ERROR);

export const Logout = createAction(LOGOUT);
