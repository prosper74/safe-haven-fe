import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// ==============================|| REDUX - MAIN STORE ||============================== //

export default configureStore({ reducer: rootReducer });
