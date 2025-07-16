import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearch } from "../../utils/models/search.models";
import { getState, setState } from "../storage";
import { BASE_URL } from "../../utils/constants/base_url";
import axios from "axios";

interface SearchDataProps {
   data: Array<ISearch> | null;
}

const initialState: SearchDataProps = {
   data: getState("searchData") ?? null,
};

export const getSearchData = createAsyncThunk("search/get", async () => {
   try {
      const { data } = await axios.get<ISearch[]>(`${BASE_URL}/api/search/get`);

      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const searchSlice = createSlice({
   name: "search",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getSearchData.fulfilled, (state, action) => {
         state.data = action.payload;
         setState("searchData", action.payload);
      });
   },
});

export const searchReducer = searchSlice.reducer;
