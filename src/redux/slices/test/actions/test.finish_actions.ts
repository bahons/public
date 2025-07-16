import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL, BASE_URL_ANALIZ, BASE_URL_NUSKA, BASE_URL_OFFICE } from "../../../../utils/constants/base_url";
import { removeTestAnswerItems } from "../../test_answer/testAnswer.slice";
import { RootState } from "../../../store";
import { ITestWork, ITestWork5 } from "../../test_work/testwork.interface";
import { stopTimer } from "../../timer.slice";
import { setWorkData, setWorkData5, setWorkDataNuska, setWorkDataTeacher } from "../../test_work/testwork.slice";
import { removeTestData, setConfirmm } from "../test.slice";

const finishTestAction = (dispatch: any) => {
   dispatch(stopTimer());
   dispatch(removeTestAnswerItems());
   dispatch(setConfirmm(false));
   dispatch(removeTestData());
};

export const finishTestTeacher = createAsyncThunk<void, void, { state: RootState }>(
   "test/finish",
   async (_, { getState, dispatch }) => {
      const state = getState();
      const testData = state.test.dataTeacher;
      const userId = state.auth.data?.userId;
      const testAnswers = state.testAnswer.dataTeacher;

      if (!testData || !userId) {
         throw new Error("Test data or User ID is null!");
      }

      try {
         const { data } = await axios.post<ITestWork>(`${BASE_URL}/api/kval/end`, {
            Id: testData.userTestId,
            UserId: userId,
            Items: testAnswers,
         });

         if (!data) {
            throw new Error("Result is null");
         }

         dispatch(setWorkDataTeacher(data));
         finishTestAction(dispatch);
      } catch (e: any) {
         throw new Error(e.message);
      }
   }
);

export const finishTest = createAsyncThunk<void, void, { state: RootState }>(
   "test/finish",
   async (_, { getState, dispatch }) => {
      const state = getState();
      const testData = state.test.data;
      const userId = state.auth.data?.userId;
      const testAnswers = state.testAnswer.data;

      if (!testData || !userId) {
         throw new Error("Test data or User ID is null!");
      }

      try {
         const { data } = await axios.post<ITestWork>(`${BASE_URL}/api/test/onepost`, {
            Id: testData.id,
            UserId: userId,
            Items: testAnswers,
         });

         if (!data) {
            throw new Error("Result is null");
         }

         dispatch(setWorkData(data));
         finishTestAction(dispatch);
      } catch (e: any) {
         throw new Error(e.message);
      }
   }
);

export const finishTest5 = createAsyncThunk<void, { type: "five" | "analiz" | "office" }, { state: RootState }>(
   "test/finish5",
   async (params, { getState, dispatch }) => {
      const state = getState();
      const testData = state.test.data5;
      const userId = state.auth.data?.userId;
      const testAnswers = state.testAnswer.data5;

      if (!testData || !userId) {
         throw new Error("Test data or User ID is null!");
      }

      const apiEndpoints = {
         five: `${BASE_URL}/api/five/post`,
         analiz: `${BASE_URL_ANALIZ}/api/analiz/valid`,
         office: `${BASE_URL_OFFICE}/api/office/post`,
      };

      try {
         const { data } = await axios.post<ITestWork5>(apiEndpoints[params.type], {
            FiveId: testData.id,
            UserId: userId,
            Items: testAnswers,
         });

         if (!data) {
            throw new Error("Result is null!");
         }
         dispatch(setWorkData5(data));
         finishTestAction(dispatch);
      } catch (e: any) {
         throw new Error(e.message);
      }
   }
);

const logErrorToServer = async (error: Error, userId: string | null, testId: number) => {
   try {
      await axios.post(`https://geo.gdh.kz/log/api/frontlog`, {
         ErrorMessage: error.message,
         UserId: userId,
         TestId: testId,
      });
   } catch (e: any) {
      console.error("Failed to log error:", e.message);
   }
};
export const finishTestNuska = createAsyncThunk<void, void, { state: RootState }>(
   "test/finishNuska",
   async (_, { getState, dispatch }) => {
      const { auth, test, testAnswer } = getState();

      const authData = auth.data;
      const testData = test.dataNuska;

      if (!authData || !testData) throw new Error("Auth or Test data is null!");

      const postData = {
         Login: authData.userName,
         TestId: testData.testId,
         UserId: authData.userId,
         Fio: authData.fio,
         SmSchoolId: authData.school.id,
         // ...(test.dataType === "nuska" && { SmSchoolId: authData.school.id }),
         NuskaId: testData.nuskaId,
         Items: testAnswer.dataNuska,
      };

      const endpoint = test.dataType === "nuska" ? "/quiz/result" : "/week/result";
      // console.log(endpoint);
      try {
         const { data } = await axios.post(`${BASE_URL_NUSKA + endpoint}`, postData);

         if (!data) throw new Error("Result is null!");

         dispatch(setWorkDataNuska(data));
         finishTestAction(dispatch);
      } catch (error: any) {
         test.dataType === "nuska" && logErrorToServer(error, authData.userId, testData.testId);
      }
   }
);
