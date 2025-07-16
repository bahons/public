import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPredmet, IVideoGroup, IPredmetState } from "../../utils/models/predmet.models";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/base_url";
import { getState, setState } from "../storage";

const initialState: IPredmetState = {
   data: null,
   videoGroup: getState("videoGroup") ?? null,
};

export const getPredmets = createAsyncThunk("kurs/predmets", async () => {
   const { data } = await axios.get<IPredmet[]>(`${BASE_URL}/api/kurs/predmets`);
   return data;
});

export const getVideoGroup = createAsyncThunk("kurs/groups", async (params: { UserId: string; PredmetId: number }) => {
   try {
      const { data } = await axios.post<IVideoGroup[]>(`${BASE_URL}/api/kurs/groups`, {
         UserId: params.UserId,
         PredmetId: params.PredmetId,
      });
      return data;
   } catch (e: any) {
      console.log(e.message);
      throw new Error(e.message);
   }
});

export const predmetSlice = createSlice({
   name: "predmets",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getVideoGroup.fulfilled, (state, action) => {
         state.videoGroup = action.payload;
         setState("videoGroup", action.payload);
      });

      builder.addCase(getPredmets.fulfilled, (state, action) => {
         state.data = action.payload;
      });
   },
});

// export const {} = predmetSlice.actions;
export const predmetReducer = predmetSlice.reducer;
