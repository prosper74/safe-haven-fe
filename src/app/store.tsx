import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export function makeStore() {
  return configureStore({
    reducer: {
      setUser: (state, action) => {
        let newState = { ...state };
        if (action.payload.username === 'Guest') {
          typeof window !== 'undefined' &&
            window.localStorage.removeItem('user');
        } else {
          typeof window !== 'undefined' &&
            window.localStorage.setItem('user', JSON.stringify(action.payload));
        }

        newState = action.payload;
        return newState;
      },
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
