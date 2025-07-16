import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import axios from "axios";
import { BASE_URL_ANALIZ } from "../../../../utils/constants/base_url";

export const getTodayFiveId = createAsyncThunk<{ fiveId: number }, void, { state: RootState }>(
   "test/today",
   async (_, { getState }) => {
      try {
         const { data } = await axios.post<{ fiveId: number }>(`${BASE_URL_ANALIZ}/api/analiz/today`, {
            userId: getState().auth.data?.userId,
         });
         if (!data) throw new Error("(Result is null)! ");
         if (data.fiveId === 0) document.getElementById("open_today_modal")?.click();

         return data;
      } catch (e: any) {
         throw new Error("Қателік кетті! " + e.message);
      }
   }
);
