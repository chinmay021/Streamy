import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import searchSlice from './searchSlice';
import videoSlice from './videoSlice';

const store = configureStore({
  reducer: {
    //name of Slice : slice
    app: appSlice,
    HomeVideos: videoSlice,
    search: searchSlice,
  },
});

export default store;
