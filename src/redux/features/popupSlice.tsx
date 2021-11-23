import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  modalType: null,
  modalIsOpen: false,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (state, { payload }) => {
      state.modalType = payload.modalType;
      state.modalIsOpen = payload.modalIsOpen;
    },
  },
});

export const { togglePopup } = popupSlice.actions;

export default popupSlice.reducer;
