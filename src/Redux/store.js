
import { configureStore } from '@reduxjs/toolkit';
import savedCartReducer from './savedCartSlice';

const store = configureStore({
  reducer: {
    savedCart: savedCartReducer,
  },
});

export default store;
