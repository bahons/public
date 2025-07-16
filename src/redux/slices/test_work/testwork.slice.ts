import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getState, setState } from "../../storage";
import { ITestWork, ITestWork5, ITestWorkState } from "./testwork.interface";
import axios from "axios";
import { TestItems } from "../../../utils/models/test.models";
import { BASE_URL } from "../../../utils/constants/base_url";

const initialState: ITestWorkState = {
   dataWork: getState("dataWork") ?? null,
   dataWork5: getState("dataWork5") ?? null,
   dataWorkNuska: getState("dataWorkNuska") ?? null,
   dataWorkTeacher: getState("dataWorkTeacher") ?? null,
};

export const getTestWork = createAsyncThunk(
   "testwork/one",
   async (params: { userId: string; testId: number; ball: number }) => {
      try {
         const { data } = await axios.post<TestItems[]>(`${BASE_URL}/api/test/onemistake`, {
            UserId: params.userId,
            Id: params.testId,
         });

         return {
            id: params.testId,
            ball: params.ball,
            items: data,
         } as ITestWork;
      } catch (e: any) {
         throw new Error(e.message);
      }
   }
);

export const getTestWork5 = createAsyncThunk("testwork/five", async (params: { userId: string; testId: number }) => {
   try {
      const { data } = await axios.post<ITestWork5>(`${BASE_URL}/api/five/mistake`, {
         UserId: params.userId,
         FiveId: params.testId,
      });

      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const testWorkSlice = createSlice({
   name: "test",
   initialState,
   reducers: {
      setWorkData: (state, action) => {
         state.dataWork = action.payload;
         setState("dataWork", action.payload);
      },
      setWorkData5: (state, action) => {
         state.dataWork5 = action.payload;
         setState("dataWork5", action.payload);
      },
      setWorkDataNuska: (state, action) => {
         state.dataWorkNuska = action.payload;
         setState("dataWorkNuska", action.payload);
      },
      setWorkDataTeacher: (state, action) => {
         state.dataWorkTeacher = action.payload;
         setState("dataWorkTeacher", action.payload);
      },
   },
   extraReducers(builder) {
      builder.addCase(getTestWork.fulfilled, (state, action) => {
         state.isLoading = null;
         state.dataWork = action.payload;
         setState("dataWork", action.payload);
      });
      builder.addCase(getTestWork.pending, (state, action) => {
         state.isLoading = action.meta.arg.testId;
      });
      builder.addCase(getTestWork.rejected, (state, action) => {
         state.isLoading = null;
         console.log(action.error.message);
      });

      builder.addCase(getTestWork5.fulfilled, (state, action) => {
         state.isLoading = null;
         state.dataWork5 = action.payload;
         setState("dataWork5", action.payload);
      });
      builder.addCase(getTestWork5.pending, (state, action) => {
         state.isLoading = action.meta.arg.testId;
      });
      builder.addCase(getTestWork5.rejected, (state, action) => {
         state.isLoading = null;
         console.log(action.error.message);
      });
   },
});

export const { setWorkData, setWorkData5, setWorkDataNuska, setWorkDataTeacher } = testWorkSlice.actions;

export const testWorkReducer = testWorkSlice.reducer;
