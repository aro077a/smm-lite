import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isPopupOpen: false,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (state, { payload }) => {
      state.popUpIsOpen = payload;
    },
  },
});

export default popupSlice.reducer;
