import {
  createAction,
  createAsyncThunk,
  createSlice,
  isPending,
} from "@reduxjs/toolkit";
import searchObjectsSlice from "./searchObjectsSlice";

const action = createAction("action");

export const fetchUserInfo = createAsyncThunk(
  "fetch/userInfo",
  async (token) => {
    const response = await fetch(
      "https://gateway.scan-interfax.ru/api/v1/account/info/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userInfo = response.json();

    return userInfo;
  }
);

const initialState = {
  usedCompanyCount: null,
  companyLimit: null,
  status: null, // loading // success // error
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.usedCompanyCount =
          action.payload.eventFiltersInfo.usedCompanyCount;
        state.companyLimit = action.payload.eventFiltersInfo.companyLimit;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default userInfoSlice.reducer;
