export interface IAuthState {
  loading: boolean;
  signUpError: string | any;
  signInError: string | any;
}

type TUser = {
  email?: string;
  password?: string;
};

export type NewUser = TUser;
