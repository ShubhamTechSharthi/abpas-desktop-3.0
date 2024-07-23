import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    isPlotIrregular: "No",
    buildingIsFor: "Self Use",
    minRequiredParking: "On No. of Bed",
    floorAreaRation: "1.25",
    maxGroundCovrage: "50",
    maxBuildingHeight: "N/A",
    minFrontage: "N/A",
    minFrontMOS: "N/A",
    minSide1MOS: "N/A",
    minRoadWidth: "N/A",
    minRearMOS: "N/A",
    minSide2MOS: "N/A",
  },
  page: 0,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    removeFormData: (state) => {
      state.formData = {
        isPlotIrregular: "No",
        buildingIsFor: "Self Use",
        minRequiredParking: "On No. of Bed",
        floorAreaRation: "1.25",
        maxGroundCovrage: "50",
        maxBuildingHeight: "N/A",
        minFrontage: "N/A",
        minFrontMOS: "N/A",
        minSide1MOS: "N/A",
        minRoadWidth: "N/A",
        minRearMOS: "N/A",
        minSide2MOS: "N/A",
      };
      state.page = 0;
    },
    nextPage: (state, action) => {
      state.page = state.page + 1;
    },
    prevPage: (state, action) => {
      state.page = state.page - 1;
    },
  },
});

export const { addFormData, removeFormData, nextPage, prevPage } =
  formSlice.actions;

export default formSlice.reducer;
