import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import searchSlice from './searchSlice';
import categorySlice from './categorySlice';

const store = configureStore({
  reducer: {
    //name of Slice : slice
    app: appSlice,
    videosCategory: categorySlice,
    search: searchSlice,
  },
});

export default store;
