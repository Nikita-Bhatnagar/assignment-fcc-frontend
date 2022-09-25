import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signupLoading: false,
  signupError: "",
  isLoggedIn: localStorage.getItem("fcctoken") ? true : false,
  token: localStorage.getItem("fcctoken")
    ? JSON.parse(localStorage.getItem("fcctoken"))
    : "",
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    const url = `http://127.0.0.1:5000/api/user/signup`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(url, data, config);
      console.log(response);
      localStorage.setItem(
        "fcctoken",
        JSON.stringify(response.data.user.token)
      );

      return response.data.user.token;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const googleSignup = createAsyncThunk(
  "auth/googleSignup",
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://127.0.0.1:5000/api/user/googlesignup`,
        data: { idToken },
      });
      console.log(response);
      localStorage.setItem("fcctoken", JSON.stringify(response.data.token));

      return response.data.token;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("fcctoken");
      state = { ...state, token: "", isLoggedIn: false };

      return state;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state, action) => {
      state.signupLoading = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    [signupUser.rejected]: (state, action) => {
      state.signupLoading = false;
      state.signupError =
        action.payload || "You couldn't be registered. Try again.";
      state.token = "";
      state.isLoggedIn = false;
      console.log(action.error);
      console.log(action.payload);
    },
    [googleSignup.pending]: (state, action) => {
      state.signupLoading = true;
    },
    [googleSignup.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    [googleSignup.rejected]: (state, action) => {
      state.signupLoading = false;
      state.signupError =
        action.payload || "You couldn't be registered. Try again.";
      state.token = "";
      state.isLoggedIn = false;
      console.log(action.error);
      console.log(action.payload);
    },
  },
});
export default authSlice.actions;

export const reducer = authSlice.reducer;
