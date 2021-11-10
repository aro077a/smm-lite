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
  account: TUserAccount[];
  loading: boolean;
}

export type TUserAccount = {
  id?: string | number;
  username?: string;
};
type TUser = {
  email?: string;
  password?: string;
};

type TToken = {
  token?: string;
};

export type NewUser = TUser;
export type TokenType = TToken;
