import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  status: '',
  message: '',
  open: false,
  backgroundColor: '',
};

export const feedbackReducer = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setSnackbar: (state, action) => ({
      ...state,
      ...action.payload,
      backgroundColor:
        action.payload.status === 'error' ? '#FF3232' : '#4BB543',
    }),
  },
});

export const { setSnackbar } = feedbackReducer.actions;

export default feedbackReducer.reducer;
