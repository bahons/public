import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import authReducer from "./slices/auth/auth.slice";

import { testReducer } from "./slices/test/test.slice";
import { testAnswerReducer } from "./slices/test_answer/testAnswer.slice";
import { testWorkReducer } from "./slices/test_work/testwork.slice";
import { testHistoryReducer } from "./slices/test_history/testHistory.slice";

import { setTimerText, timerReducer } from "./slices/timer.slice";
import { searchReducer } from "./slices/search.slice";
import { predmetReducer } from "./slices/predmet.slice";
import { nuskaReducer } from "./slices/nuska.slice";

import { lesson } from "./api/lesson";
import { setState } from "./storage";
import { getTimer } from "../utils/helpers/timerScript";
import { schoolReducer } from "./slices/school.slice";

export const store = configureStore({
   reducer: {
      [lesson.reducerPath]: lesson.reducer,
      auth: authReducer,
      test: testReducer,
      testAnswer: testAnswerReducer,
      testHistory: testHistoryReducer,
      testWork: testWorkReducer,
      timer: timerReducer,
      search: searchReducer,
      predmets: predmetReducer,
      nuska: nuskaReducer,
      school: schoolReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(lesson.middleware),
});

let interval: NodeJS.Timer | undefined;
store.subscribe(() => {
   setState("authUserData", store.getState().auth.data);
   setState("confirm", store.getState().test.confirm); // true = test bolyp jatyr

   const timer = store.getState().timer;
   if (timer.isOn && !interval) {
      interval = setInterval(() => {
         const timerText = getTimer(timer.finishTime);
         store.dispatch(setTimerText(timerText));
      }, 1000);
   }
   if (!timer.isOn && interval) {
      clearInterval(interval);
      interval = undefined;
   }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
