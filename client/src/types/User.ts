import { ICartItem } from "./Product";

export interface IUser {
  id: string;
  username: string;
}

export interface IUserData {
  username: string;
  password: string;
}

export interface IResponseLoadUser {
  user: { id: string; username: string; orders: ICartItem[] };
}
