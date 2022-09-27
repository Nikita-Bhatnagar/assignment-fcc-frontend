import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./../config";

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
    const url = `${URL}/api/user/signup`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(url, data, config);

      localStorage.setItem(
        "fcctoken",
        JSON.stringify(response.data.user.token)
      );

      return response.data.user.token;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    const url = `${URL}/api/user/signin`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(url, data, config);

      localStorage.setItem(
        "fcctoken",
        JSON.stringify(response.data.user.token)
      );

      return response.data.user.token;
    } catch (err) {
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
        url: `${URL}/api/user/googlesignup`,
        data: { idToken },
      });

      localStorage.setItem("fcctoken", JSON.stringify(response.data.token));

      return response.data.token;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const googleSignin = createAsyncThunk(
  "auth/googleSignin",
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${URL}/api/user/googlelogin`,
        data: { idToken },
      });

      localStorage.setItem("fcctoken", JSON.stringify(response.data.token));

      return response.data.token;
    } catch (err) {
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
      state.signupError = "";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.token = action.payload;
      state.signupError = "";
      state.isLoggedIn = true;
    },
    [signupUser.rejected]: (state, action) => {
      state.signupLoading = false;
      state.signupError =
        action.payload || "You couldn't be registered. Try again.";

      state.token = "";
      state.isLoggedIn = false;
    },

    [signinUser.pending]: (state, action) => {
      state.signupLoading = true;
      state.signupError = "";
    },
    [signinUser.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.token = action.payload;
      state.signupError = "";
      state.isLoggedIn = true;
    },
    [signinUser.rejected]: (state, action) => {
      state.signupLoading = false;
      state.signupError =
        action.payload || "You couldn't be logged in. Try again.";

      state.token = "";
      state.isLoggedIn = false;
    },

    [googleSignup.pending]: (state, action) => {
      state.signupLoading = true;
      state.signupError = "";
    },
    [googleSignup.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.token = action.payload;
      state.isLoggedIn = true;
      state.signupError = "";
    },
    [googleSignup.rejected]: (state, action) => {
      state.signupLoading = false;
      state.signupError =
        action.payload || "You couldn't be registered. Try again.";
      state.token = "";
      state.isLoggedIn = false;
    },
    [googleSignin.pending]: (state, action) => {
      state.signupLoading = true;
      state.signupError = "";
    },
    [googleSignin.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.token = action.payload;
      state.isLoggedIn = true;
      state.signupError = "";
    },
    [googleSignin.rejected]: (state, action) => {
      state.signupLoading = false;
      state.signupError =
        action.payload || "You couldn't be logged in. Try again.";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});
export default authSlice.actions;

export const reducer = authSlice.reducer;
