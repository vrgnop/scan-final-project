import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";

export const fetchObjectSearch = createAsyncThunk(
  "fetch/objectSearch",
  async (props) => {
    const response = await fetch(
      "https://gateway.scan-interfax.ru/api/v1/objectsearch",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(props.body),
      }
    );
    const objects = await response.json();

    return {
      objects: objects,
      body: props.body,
    };
  }
);

const initialState = {
  objects: null,
  bodyRequest: null,
  totalOptions: null,
  status: null, // loading // success // error
};

const searchObjectsSlice = createSlice({
  name: "searchObjects",
  initialState,
  reducers: {
    setStatus(state) {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjectSearch.fulfilled, (state, action) => {
        state.status = "success";
        state.objects = action.payload.objects.items;
        state.totalOptions = action.payload.objects.items.length;
        state.bodyRequest = action.payload.body;
      })
      .addCase(fetchObjectSearch.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchObjectSearch.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { setStatus } = searchObjectsSlice.actions;

export default searchObjectsSlice.reducer;
