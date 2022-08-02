export interface IUser {
  id: string;
  username: string;
}

export interface IUserWithPassword extends IUser {
  passwordHash: string;
}

export interface IUserRequestBody {
  username: string;
  password: string;
}
