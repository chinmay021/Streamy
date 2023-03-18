import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import videoSlice from './videoSlice';

const store = configureStore({
  reducer: {
    //name of Slice : slice
    app: appSlice,
    HomeVideos: videoSlice,
  },
});

export default store;
