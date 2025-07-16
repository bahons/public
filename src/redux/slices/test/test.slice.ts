import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ITestState, TestDataType } from "./test.interface";
import { getState, removeState, setState } from "../../storage";

import { getTodayFiveId } from "./actions/test.actions";
import {
   getTestList,
   loadTest,
   loadTest5,
   loadTestNuska,
   loadTestTeacher,
   loadTestWeek,
} from "./actions/test.load_actions";
import { finishTest, finishTest5, finishTestNuska, finishTestTeacher } from "./actions/test.finish_actions";

const initialState: ITestState = {
   testList: getState("testList") ?? null,
   data: getState("testData") ?? null,
   data5: getState("testData5") ?? null,
   dataNuska: getState("testDataNuska") ?? null,
   dataTeacher: getState("testDataTeacher") ?? null,
   confirm: getState("confirm") ?? false,
   dataType: getState("testDataType") ?? null,
};

export const testSlice = createSlice({
   name: "test",
   initialState,
   reducers: {
      setTestDataType: (state, action: PayloadAction<TestDataType>) => {
         state.dataType = action.payload;
         setState("testDataType", state.dataType);
      },
      setConfirmm: (state, action) => {
         state.confirm = action.payload;
      },
      setTestDataNuska: (state, action) => {
         state.dataNuska = action.payload;
         setState("testDataNuska", action.payload);
      },
      removeTestData: (state) => {
         // state.dataType = null;
         // removeState("testDataType");

         state.testList = null;
         state.data = null;
         state.data5 = null;
         state.dataNuska = null;
         state.dataTeacher = null;

         removeState("testList");
         removeState("testData");
         removeState("testData5");
         removeState("testDataNuska");
         removeState("testDataTeacher");
      },
   },
   extraReducers(builder) {
      builder.addCase(getTodayFiveId.fulfilled, (state, action) => {
         state.analizFiveId = action.payload.fiveId;
      });
      builder.addCase(getTodayFiveId.rejected, (state, action) => {
         state.error = action.error.message;
      });

      builder.addCase(getTestList.fulfilled, (state, action) => {
         state.testList = action.payload;
         // setState("testList", action.payload);

         state.isLoading = false;
      });

      builder.addCase(loadTest.fulfilled, (state, action) => {
         state.data = action.payload;
         setState("testData", action.payload);

         state.dataType = "one";
         setState("testDataType", state.dataType);
      });
      builder.addCase(loadTestTeacher.fulfilled, (state, action) => {
         state.dataTeacher = action.payload;
         setState("testDataTeacher", action.payload);

         setTestDataType("teacher");
      });
      builder.addCase(loadTest5.fulfilled, (state, action) => {
         state.data5 = action.payload;
         setState("testData5", action.payload);
      });
      builder.addCase(loadTestNuska.fulfilled, (state, action) => {
         state.dataNuska = action.payload;
         setState("testDataNuska", action.payload);
      });
      builder.addCase(loadTestWeek.fulfilled, (state, action) => {
         state.dataNuska = action.payload;
         setState("testDataNuska", action.payload);

         state.dataType = "week";
         setState("testDataType", state.dataType);
      });

      builder.addMatcher(
         isAnyOf(
            getTodayFiveId.pending,
            loadTestTeacher.pending,
            getTestList.pending,
            loadTest.pending,
            loadTest5.pending,
            loadTestNuska.pending,
            loadTestWeek.pending,
            finishTestTeacher.pending,
            finishTest.pending,
            finishTest5.pending,
            finishTestNuska.pending
         ),
         (state) => {
            state.isLoading = true;
         }
      );
      builder.addMatcher(
         isAnyOf(
            loadTestTeacher.rejected,
            getTestList.rejected,
            loadTest.rejected,
            loadTest5.rejected,
            loadTestNuska.rejected,
            loadTestWeek.rejected
         ),
         (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
         }
      );

      builder.addMatcher(
         isAnyOf(
            loadTestTeacher.fulfilled,
            loadTest.fulfilled,
            loadTest5.fulfilled,
            loadTestNuska.fulfilled,
            loadTestWeek.fulfilled
         ),
         (state) => {
            state.isLoading = false;
            state.confirm = true;
            removeState("storeTime");
         }
      );

      builder.addMatcher(
         isAnyOf(
            getTodayFiveId.rejected,
            finishTestTeacher.rejected,
            finishTest.rejected,
            finishTest5.rejected,
            finishTestNuska.rejected
         ),
         (state, action) => {
            console.log(action.error.message);
            state.isLoading = false;
         }
      );
      builder.addMatcher(
         isAnyOf(
            getTodayFiveId.fulfilled,
            finishTestTeacher.fulfilled,
            finishTest.fulfilled,
            finishTest5.fulfilled,
            finishTestNuska.fulfilled
         ),
         (state) => {
            state.isLoading = false;
         }
      );
   },
});

export const { setTestDataType, removeTestData, setTestDataNuska, setConfirmm } = testSlice.actions;

export const testReducer = testSlice.reducer;
