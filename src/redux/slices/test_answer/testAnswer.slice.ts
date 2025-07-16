import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITestAnswer, TestAnswerItems5, TestAnswerItemsNuska } from "./testAnswer.interface";
import { getState, removeState, setState } from "../../storage";

const initialState: ITestAnswer = {
   data: getState("userTestItems") ?? [],
   data5: getState("userTestItems5") ?? [],
   dataNuska: getState("userTestItemsNuska") ?? [],
   dataTeacher: getState("userTestItemsTeacher") ?? [],
};

const updateAnswerItems = (items: any, payload: any, identifier = "ForId") => {
   const existingItem = items.find((x: any) => x[identifier] === payload[identifier]);
   if (existingItem) {
      existingItem.Otvet = payload.Otvet || payload.otvet;
   } else {
      items.push(payload);
   }
};

const updateTestAnswerData = (stateData: any[], actionPayload: any, key: "TestId" | "PanId") => {
   const { testId, panId, otvet, forId } = actionPayload;
   const answerObj = { Otvet: otvet, ForId: forId };

   const testItem = stateData.find((x) => x[key] === (testId || panId));

   if (testItem) {
      updateAnswerItems(testItem.Items, answerObj);
   } else {
      stateData.push({
         [key]: testId || panId,
         PanId: panId,
         Items: [answerObj],
      });
   }
};

export const testAnswerSlice = createSlice({
   name: "testAnswer",
   initialState,
   reducers: {
      setTestAnswerItemsTeacher: (state, action) => {
         updateAnswerItems(state.dataTeacher, action.payload);
         setState("userTestItemsTeacher", state.dataTeacher);
      },

      setTestAnswerItems: (state, action) => {
         updateAnswerItems(state.data, action.payload);
         setState("userTestItems", state.data);
      },

      setInitialTestAnswerItems5: (state, action: PayloadAction<TestAnswerItems5[]>) => {
         state.data5 = action.payload;
         setState("userTestItems5", state.data5);
      },
      setTestAnswerItems5: (state, action) => {
         updateTestAnswerData(state.data5, action.payload, "TestId");

         setState("userTestItems5", state.data5);
      },

      setInitialTestAnswerItemsNuska: (state, action: PayloadAction<TestAnswerItemsNuska[]>) => {
         state.dataNuska = action.payload;
         setState("userTestItemsNuska", state.dataNuska);
      },
      setTestAnswerItemsNuska: (state, action) => {
         updateTestAnswerData(state.dataNuska, action.payload, "PanId");
         setState("userTestItemsNuska", state.dataNuska);
      },

      removeTestAnswerItems: (state) => {
         state.data = [];
         state.data5 = [];
         state.dataNuska = [];
         state.dataTeacher = [];
         removeState("userTestItems");
         removeState("userTestItems5");
         removeState("userTestItemsNuska");
         removeState("userTestItemsTeacher");
      },
   },
});

export const {
   setTestAnswerItems,
   setTestAnswerItems5,
   setTestAnswerItemsNuska,
   setTestAnswerItemsTeacher,
   setInitialTestAnswerItems5,
   setInitialTestAnswerItemsNuska,
   removeTestAnswerItems,
} = testAnswerSlice.actions;
export const testAnswerReducer = testAnswerSlice.reducer;
