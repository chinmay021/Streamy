import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'HomeVideos',
  initialState: {
    videos: [],
    nextPageToken: undefined,
    category: 'All',
  },
  reducers: {
    addVideos: (state, action) => {
      state.videos = action.payload;
    },
    addNextPageToken: (state, action) => {
      state.nextPageToken = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { addVideos, addNextPageToken, changeCategory } =
  videoSlice.actions;

export default videoSlice.reducer;
