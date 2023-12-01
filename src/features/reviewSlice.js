import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  reviewList: null,
  total: null,
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getListReviewSuccess(state, action) {
      const total = action.payload.data;
      state.isLoading = false;
      state.error = null;
      state.reviewList = action.payload.data;
    },
  },
});

export default slice.reducer;

export const getListReview = (enqueueSnackbar) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const res = await apiService.get("/orther/listorther/reviews");
    dispatch(slice.actions.getListReviewSuccess(res?.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    enqueueSnackbar(error.message, { variant: "error" });
  }
};

export const updateReview =
  ({ id, data }, enqueueSnackbar) =>
  async (dispatch) => {
    try {
      const res = await apiService.post(`/reviews/${id}`, {...data, id:id});
      if(res.success){
        dispatch(getListReview())
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
