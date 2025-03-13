import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errMessage: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errMessage = action.payload.errMessage;
    },
    clearError: (state) => {
      state.errMessage = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
