import { createSlice } from '@reduxjs/toolkit';

const loginData = createSlice({
  name: 'SignIn',
  initialState: {
    loggedInUser: {},
    userId: '',
  },
  reducers: {
    signUp: (state, action) => {},
    login: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
    deleteUser: (state, action) => {
      const userIdToDelete = action.payload;
      state.users = state.users?.filter(
        (user) => user.userId !== userIdToDelete
      );
      state.loggedInUser = {};
    },
  },
});

export default loginData.reducer;
export const { login, logout, signUp, deleteUser } = loginData.actions;
