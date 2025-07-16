import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITestHistory } from "./testhistory.interface";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants/base_url";
import { RootState } from "../../store";

interface historyProps {
   data: ITestHistory | null;
}

const initialState: historyProps = {
   data: null,
};

export const getTestHistory = createAsyncThunk<ITestHistory, void, { state: RootState }>(
   "account/testHistory",
   async (_, thunkApi) => {
      try {
         const UserId = thunkApi.getState().auth.data?.userId;
         const { data } = await axios.post(`${BASE_URL}/api/profile`, { UserId });

         return data;
      } catch (e) {
         console.log(e);
      }
   }
);

export const testHistorySlice = createSlice({
   name: "testHistory",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getTestHistory.fulfilled, (state, action) => {
         state.data = action.payload;
      });
   },
});

// export const {} = testHistorySlice.actions;
export const testHistoryReducer = testHistorySlice.reducer;
