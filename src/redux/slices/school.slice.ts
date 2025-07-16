import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getState, setState } from "../storage";
import { BASE_URL_NUSKA } from "../../utils/constants/base_url";
import axios from "axios";
import { ISchool } from "../../utils/models/school.models";

interface SchoolDataProps {
   data: Array<ISchool> | null;
}

const initialState: SchoolDataProps = {
   data: getState("schoolData") ?? null,
};

export const getSchoolData = createAsyncThunk("school/get", async () => {
   try {
      const { data } = await axios.get<ISchool[]>(`${BASE_URL_NUSKA}/other/smschool `);

      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const schoolSlice = createSlice({
   name: "school",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getSchoolData.fulfilled, (state, action) => {
         state.data = action.payload;
         setState("schoolData", action.payload);
      });
   },
});

export const schoolReducer = schoolSlice.reducer;
