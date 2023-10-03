import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: null,
  error: null,
  infoUserBooking: null,
};

const slice = createSlice({
  name: "imformationBooking",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createInFoUserBookingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.userBooking = action.payload;
    },
    infoUserSuccess(state, action) {
      state.isLoading = false;
      state.error = false;

      state.infoUserBooking = action.payload;
    },
  },
});

export default slice.reducer;

export const createUserBooking =
  (
    { name, phone, email, address, streetsName, district, city },
    enqueueSnackbar
  ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { name, phone, email, address, streetsName, district, city };
      const res = await apiService.post("/users/userBooking", data);
      dispatch(slice.actions.createInFoUserBookingSuccess(res?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

export const inFoUserBooking = () => async (dispatch) => {
  try {
    const res = await apiService.get("/users/userBooking");
    dispatch(slice.actions.infoUserSuccess(res?.data?.user));
  } catch (error) {
    console.log(error);
  }
};
