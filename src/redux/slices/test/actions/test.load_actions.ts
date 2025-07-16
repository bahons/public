import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITest, ITest5, ITestList, ITestTeacher } from "../../../../utils/models/test.models";
import { BASE_URL, BASE_URL_ANALIZ, BASE_URL_NUSKA, BASE_URL_OFFICE } from "../../../../utils/constants/base_url";
import {
   setInitialTestAnswerItems5,
   setInitialTestAnswerItemsNuska,
   setTestAnswerItems5,
} from "../../test_answer/testAnswer.slice";
import { RootState } from "../../../store";
import { ITestNuska } from "../../../../utils/models/nuska.models";
import { setTestDataType } from "../test.slice";
import { TestAnswerItems5, TestAnswerItemsNuska } from "../../test_answer/testAnswer.interface";
import { getState } from "../../../storage";

export const loadTestTeacher = createAsyncThunk("test/teacher", async (params: { Id: string }) => {
   try {
      const { data } = await axios.post<ITestTeacher>(`${BASE_URL}/api/kval/create`, params);

      if (!data || typeof data === "string") {
         console.log("Error startHandler(): Result is null or string!");
         throw new Error("Қателік кетті! Қайталаңыз");
      }
      if (!data.state) {
         throw new Error("Сізде тест тапсыруға доступ жоқ!");
      }
      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const getTestList = createAsyncThunk("test/list", async (panNumber: number) => {
   try {
      const { data } = await axios.get<ITestList[]>(`${BASE_URL_NUSKA}/week/${panNumber}`);
      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const loadTest = createAsyncThunk("test/one", async (params: { PanId: number; UserId: string }) => {
   try {
      const { data } = await axios.post<ITest>(`${BASE_URL}/api/test/one`, params);
      if (!data) throw new Error("Result is null");
      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const loadTest5 = createAsyncThunk<
   ITest5,
   { type: "five" | "analiz" | "office"; body: { FiveId?: number; UserId: string; Pan1: number; Pan2: number } },
   { state: RootState }
>("test/five", async (params, { dispatch }) => {
   try {
      const api = {
         five: `${BASE_URL}/api/five/build`,
         analiz: `${BASE_URL_ANALIZ}/api/analiz/build`,
         office: `${BASE_URL_OFFICE}/api/office/build`,
      };
      const { data } = await axios.post<ITest5>(api[params.type], params.body);
      if (!data) throw new Error("Result is null");

      const initialTestItems: TestAnswerItems5[] = data.items.map((item) => ({
         TestId: item.id,
         PanId: item.panId,
         Items: [],
      }));

      dispatch(setInitialTestAnswerItems5(initialTestItems));
      dispatch(setTestDataType(params.type));

      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const loadTestNuska = createAsyncThunk<
   ITestNuska,
   { NuskaId: number; UserId: string; Pan1: number; Pan2: number },
   { state: RootState }
>("test/nuska", async (params, { dispatch }) => {
   try {
      const { data } = await axios.post<ITestNuska>(`${BASE_URL_NUSKA}/quiz/post`, params);

      document.getElementById("close_fio")?.click(); // Close Fio Modal

      if (!data) throw new Error("Result is null");

      const initialTestItems: TestAnswerItemsNuska[] = data.items.map((item) => ({
         PanId: item.panId,
         Items: [],
      }));
      dispatch(setInitialTestAnswerItemsNuska(initialTestItems));
      dispatch(setTestDataType("nuska"));

      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const loadTestWeek = createAsyncThunk<ITestNuska, { userId: string; pan1?: number }, { state: RootState }>(
   "test/week",
   async (params, { dispatch }) => {
      try {
         const { data } = await axios.post<ITestNuska>(`${BASE_URL_NUSKA}/week/post`, params);

         if (!data) throw new Error("Result is null");

         console.log(data);

         const initialTestItems: TestAnswerItemsNuska[] = data.items.map((item) => ({
            PanId: item.panId,
            Items: [],
         }));

         dispatch(setInitialTestAnswerItemsNuska(initialTestItems));
         dispatch(setTestDataType("week"));

         return data;
      } catch (e: any) {
         throw new Error(e.message);
      }
   }
);
