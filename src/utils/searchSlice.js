import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
  name: 'search',
  initialState: {
    suggestions: {},
  },
  reducers: {
    cacheResults: (state, action) => {
      state.suggestions = { ...action.payload, ...state.suggestions };
    },
  },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
