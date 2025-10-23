import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
  username: '',
  useremail: '',
  userId: -1,
  isLoggedIn: false,
},
};

export const userDetailsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetails: (state, action) => {
      console.log('action.payload',action.payload);
      state.user = action.payload;
    },
    removeUserDetails: (state) => {
      state.user = initialState
    },
  },
})

export const { addUserDetails, removeUserDetails } = userDetailsSlice.actions

export const userInfo = (state) => state?.user?.user

export default userDetailsSlice.reducer