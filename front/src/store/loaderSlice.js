import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setloading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setloading } = loadingSlice.actions;
export default loadingSlice.reducer;
