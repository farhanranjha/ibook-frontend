import { ActionCreator, ActionReducer, ActionType, createReducer, ReducerTypes } from "@ngrx/store";

export function createRehydrateReducer<S>(
  key: string,
  initialState: S,
  ...ons: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S> {
  const item = localStorage.getItem(key);
  const newInitialState = (item && JSON.parse(item)) ?? initialState;

  const persistState = (state: S) => {
    localStorage.setItem(key, JSON.stringify(state));
    return state;
  };

  const mappedOns = ons.map((on) => ({
    ...on,
    reducer: (state: S | undefined = newInitialState, action: ActionType<ActionCreator[]>): S => {
      const newState = on.reducer(state, action);
      return persistState(newState);
    },
  })) as ReducerTypes<S, ActionCreator[]>[];

  return createReducer(newInitialState, ...mappedOns);
}
