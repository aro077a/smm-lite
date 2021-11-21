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
export interface ISchedule {
  scheduledPosts: TSchedule[];
  loading: boolean;
  errors: any;
}

export type TScheduleError = {
  field: string;
  message?: string;
};

export type TUserAccount = {
  id: number;
  username?: string;
};

type TUser = {
  email?: string;
  password?: string;
};

type TToken = {
  token?: string;
};

export type TSchedule = {
  publish_at?: string;
  date: number | Date;
  image?: File | string;
  text?: string;
};

export type TUserIdType = number;

export type NewUser = TUser;
export type TokenType = TToken;
export type ScheduleType = TSchedule;
export type UserIdType = TUserIdType;
