import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import userInfoSlice from "./slices/userInfoSlice";
import searchObjects from "./slices/searchObjectsSlice";
import objectHistogram from "./slices/oblectsHistogramSlice";
import documentList from "./slices/documentListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoSlice,
    searchObjects: searchObjects,
    objectHistogram: objectHistogram,
    documentList: documentList,
  },
});
