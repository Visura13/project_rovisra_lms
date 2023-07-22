import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "./Api";
//import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
};

export const coursesFetch = createAsyncThunk(
  "courses/coursesFetch",
  async () => {
    try {
      const response = await axios.get('/courses');

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const courseCreate = createAsyncThunk(
  "courses/courseCreate",
  async (values) => {
    try {
      const response = await axios.post(
        '/courses',
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      //toast.error(error.response?.data);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: {
    [coursesFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [coursesFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [coursesFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [courseCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [courseCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      console.log('Course Added')
    },
    [courseCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
  },
});

export default courseSlice.reducer;