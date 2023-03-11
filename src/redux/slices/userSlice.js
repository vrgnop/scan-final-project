import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Functions from "../../functions/functions";

export const fetchUser = createAsyncThunk("fetch/userStatus", async (user) => {
  const response = await fetch(
    "https://gateway.scan-interfax.ru/api/v1/account/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const token = response.json();
  return token;
});

const initialState = {
  login: null,
  token: null,
  status: null, // loading // success // error
  date: null,
  err: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
    },
    removeUser(state) {
      state.login = null;
      state.token = null;
      state.status = null;
      localStorage.removeItem("items");
    },
    getStorageUser(state) {
      const user = JSON.parse(localStorage.getItem("items"));
      state.login = user.login;
      state.token = user.token;
      state.date = user.date;
    },
    removeStatus(state) {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          state.token = action.payload.accessToken;
          state.status = "success";
          state.date = action.payload.expire;
          Functions.saveLocaleStorage({
            login: state.login,
            token: action.payload.accessToken,
            date: action.payload.expire,
          });
        } else {
          state.status = "error";
          state.err = action.payload.message;
        }
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setUser, removeUser, getStorageUser, removeStatus } =
  userSlice.actions;

export default userSlice.reducer;
