import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'counter',
  initialState: {
    isLogin:false
  },
  reducers: {
    login_status: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLogin = action.payload;
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login_status, decrement, incrementByAmount } = userReducer.actions

export default userReducer.reducer