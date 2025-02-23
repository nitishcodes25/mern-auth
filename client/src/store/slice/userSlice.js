import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStarted: (state) => {
      state.loading = true;
      state.error = false;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStarted: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  signinFailure,
  signinStarted,
  signinSuccess,
  updateFailure,
  updateStarted,
  updateSuccess,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
