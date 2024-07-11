import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.formData.push(action.payload);
    },
    removeFormData: (state) => {
      state.formData = [];
    },
  },
});

export const { addFormData, removeFormData } = formSlice.actions;

export default formSlice.reducer;
