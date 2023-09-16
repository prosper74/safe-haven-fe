import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  status: '',
  message: '',
  open: false,
};

export const feedbackReducer = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setSnackbar: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setSnackbar } = feedbackReducer.actions;

export default feedbackReducer.reducer;
