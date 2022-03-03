/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';

const defaultUser = { username: 'Guest' };
let getStoredUser;
const getLSI = () => {
  if (typeof window !== 'undefined') {
    let currentUser = window.localStorage.getItem('user');
    getStoredUser = currentUser ? JSON.parse(currentUser) : {};
    return getStoredUser;
  }
};

const storedUser = getLSI();

const initialState = storedUser || defaultUser;

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      let newState = { ...state };
      if (action.payload.username === 'Guest') {
        typeof window !== 'undefined' && window.localStorage.removeItem('user');
      } else {
        typeof window !== 'undefined' &&
          window.localStorage.setItem('user', JSON.stringify(action.payload));
      }

      newState = action.payload;
      return newState;
    },
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
