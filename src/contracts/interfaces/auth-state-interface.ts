import { UserModel } from '../models/user/user-model';

export interface AuthStateInterface {
  user: UserModel | null;
  authError: string | null;
  loading: boolean;
}
