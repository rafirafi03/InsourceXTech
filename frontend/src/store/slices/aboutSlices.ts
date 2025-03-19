import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAboutResponse } from "../../types";

interface AboutState {
  data: IAboutResponse | null;
  isLoading: boolean;
}

const initialState: AboutState = {
  data: null,
  isLoading: false
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAboutData: (state, action: PayloadAction<IAboutResponse>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setAboutData, setLoading } = aboutSlice.actions;
export default aboutSlice.reducer;
