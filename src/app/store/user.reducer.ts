import { on } from "@ngrx/store";
import { User } from "./user.model";
import { createRehydrateReducer } from "./persistantStore";
import { add, remove, setAccessToken } from "./user.actions";

const initialState: User = {
  username: "",
  accessToken: "",
  refreshToken: "",
};

export const userReducer = createRehydrateReducer(
  "user",
  initialState,
  on(add, (state, { user }) => ({ ...state, ...user })),
  on(remove, (state) => initialState),
  on(setAccessToken, (state, { accessToken }) => ({
    ...state,
    accessToken: accessToken,
  }))
);
