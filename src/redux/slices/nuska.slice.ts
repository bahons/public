import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INuskaData } from "../../utils/models/nuska.models";
import { getState, setState } from "../storage";
import { BASE_URL_NUSKA } from "../../utils/constants/base_url";
import axios from "axios";
import { RootState } from "../store";

interface NuskaDataProps {
   data: INuskaData | null;
   error?: string;
   isLoading?: boolean;
}

const initialState: NuskaDataProps = {
   data: getState("nuskaData") ?? null,
   // data: null,
};

export const getNuskaList = createAsyncThunk<INuskaData, void, { state: RootState }>(
   "nuska/list",
   async (_, { getState }) => {
      try {
         const { data } = await axios.post<INuskaData>(`${BASE_URL_NUSKA}/quiz/valid`, {
            userId: getState().auth.data?.userId,
         });
         // console.log(data);
         if (!data) {
            throw new Error("Нұсқаларды алу кезінде қателік кетті!");
         }
         if (!data.dostup) {
            throw new Error("Нұсқаларға доступ жоқ!");
         }
         return data;
      } catch (e: any) {
         throw new Error(e.message);
      }
   }
);

export const nuskaSlice = createSlice({
   name: "nuska",
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getNuskaList.fulfilled, (state, action) => {
         state.data = action.payload;
         state.isLoading = false;
         setState("nuskaData", action.payload);
      });
      builder.addCase(getNuskaList.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getNuskaList.rejected, (state, action) => {
         state.error = action.error.message;
         state.isLoading = false;
         state.data = null;
      });
   },
});

// export const {} = nuskaSlice.actions;
export const nuskaReducer = nuskaSlice.reducer;
