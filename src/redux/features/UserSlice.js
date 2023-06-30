import { createSlice } from '@reduxjs/toolkit';



const _initialState = {
  loaded: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: _initialState,
    reducers: {
      setUserData: (state = [], action) => {
        const keys = Object.keys(action.payload);
          keys.forEach((key) => {
              state[key] = action.payload[key]
          })    
      },
      logout: (state) => {
        const keys = Object.keys(state);
        keys.forEach((key) => state[key] = '')
        state.loaded = true;
      },
    }
});

export const { setUserData,logout } = userSlice.actions;

export const selectUser = state => state?.user;

export default userSlice.reducer;
