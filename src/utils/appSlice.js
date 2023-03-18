import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isMenuOpen: true,
    isSideBarOpen: false,
  },
  reducers: {
    //action : reducer function(state, actionPayload){}
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

export const { toggleMenu, toggleSideBar } = appSlice.actions;
export default appSlice.reducer;
