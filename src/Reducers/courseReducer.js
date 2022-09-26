import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../config";
const initialState = {
  loading: false,
  courses: [],
  error: false,
};

export const getCourses = createAsyncThunk(
  "courses/get",
  async (data, { rejectWithValue }) => {
    const url = `${URL}/api/courses`;

    try {
      const response = await axios.get(url, data);
      console.log(response);

      return response.data.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: {
    [getCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [getCourses.fulfilled]: (state, action) => {
      state.loading = false;
      state.courses = [...action.payload];
    },
    [getCourses.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong.";

      console.log(action.error);
      console.log(action.payload);
    },
  },
});

export const reducer = courseSlice.reducer;
