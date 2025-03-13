import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loaderSlice';
import errorReducer from './errorSlice';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    error: errorReducer,
  },
});

export default store;
