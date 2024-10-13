import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";

export const add = createAction("[User] Add", props<{ user: User }>());
export const remove = createAction("[User] Remove");
export const setAccessToken = createAction("[Auth] Set Token", props<{ accessToken: string }>());
