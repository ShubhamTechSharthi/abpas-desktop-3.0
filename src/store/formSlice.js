import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  page : 0
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    removeFormData: (state) => {
      state.formData = {};
      state.page = 0;
    },
    nextPage: (state,action) => {
      state.page = state.page + 1
    },
    prevPage: (state,action) => {
      state.page = state.page - 1
    }
  },
});

export const { addFormData, removeFormData, nextPage, prevPage } = formSlice.actions;

export default formSlice.reducer;
