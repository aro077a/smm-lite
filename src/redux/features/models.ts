export interface IAuthState {
  loading: boolean;
  signUpError: string | any;
  signInError: string | any;
}
export interface IInstagramAuthState {
  loading: boolean;
  success: boolean;
  instaAuthError: string | any;
}
export interface IUSer {
  user: null;
  loading: boolean;
}

type TUser = {
  email?: string;
  password?: string;
};

type TToken = {
  token?: string;
};

export type NewUser = TUser;
export type TokenType = TToken;
