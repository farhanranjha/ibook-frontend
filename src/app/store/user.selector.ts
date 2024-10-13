import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "./user.model";

export const selectUserState = createFeatureSelector<User>("user");

export const selectUser = createSelector(selectUserState, (state: User) => state);
export const selectRefreshToken = createSelector(selectUserState, (userState: User) => userState.refreshToken);
export const selectAccessToken = createSelector(selectUserState, (userState: User) => userState.accessToken);
