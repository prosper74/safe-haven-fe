/* eslint-disable import/no-named-as-default */
import { combineReducers } from '@reduxjs/toolkit';

// reducer import
// import customizationReducer from './customizationReducer';
import feedbackReducer from './feedbackReducer';
import userReducer from './userReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  feedback: feedbackReducer,
  user: userReducer,
});

export default rootReducer;
