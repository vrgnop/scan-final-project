import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchObjectHistograms = createAsyncThunk(
  "fetch/objectHistograms",
  async (props) => {
    const response = await fetch(
      "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(props.bodyRequest),
      }
    );
    const histograms = await response.json();
    return histograms;
  }
);

const initialState = {
  histograms: null,
  status: null, // loading // success // error
  total: null,
};

const objectHistogramSlice = createSlice({
  name: "objectHistogram",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjectHistograms.fulfilled, (state, action) => {
        state.histograms = action.payload.data
          .find((item) => item.histogramType === "totalDocuments")
          .data.map((itemTotal) => ({
            date: itemTotal.date,
            totalDocuments: itemTotal.value,
            riskFactors: action.payload.data
              .find((item) => item.histogramType === "riskFactors")
              .data.find((itemRisk) => itemRisk.date === itemTotal.date).value,
          }))
          .sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date);
          });
        state.status = "success";
        state.total = action.payload.data
          .find((item) => item.histogramType === "totalDocuments")
          .data.reduce((accum, item) => {
            accum += +item.value;
            return accum;
          }, 0);
      })
      .addCase(fetchObjectHistograms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchObjectHistograms.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default objectHistogramSlice.reducer;
