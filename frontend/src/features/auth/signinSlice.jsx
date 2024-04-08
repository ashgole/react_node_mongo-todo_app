import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userid: "",
  username: "",
  email: "",
  isAuthenticated: false,
};

export const signinSlice = createSlice({
  name: "signinSlice",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    addUserAuth: (state, action) => {
      const cred = {
        userid: nanoid(),
        email: action.payload.email,
        username: action.payload.username,
      };
      return (state = cred);
    },
  },
});

export const { addUserAuth, setAuthentication } = signinSlice.actions;

export default signinSlice.reducer;
