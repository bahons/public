import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getState, removeState, setState } from "../storage";
import { testTimes } from "../../utils/constants/test_times";

interface TimerTest {
   isOn?: boolean;
   finishTime: Date;
   time: string;
}

const initialState: TimerTest = {
   isOn: false,
   finishTime: getState("storeTime") ?? new Date(),
   time: "_:_:_",
};

export const timerSlice = createSlice({
   name: "timer",
   initialState,
   reducers: {
      startTimer: (state, action) => {
         state.isOn = true;
         if (!getState("storeTime")) {
            const testTime = testTimes.find((x) => x.panId === action.payload.panId);

            state.finishTime = new Date();
            if (action.payload.testType === "one") {
               state.finishTime.setMinutes(state.finishTime.getMinutes() + 60);
            } else {
               state.finishTime.setMinutes(state.finishTime.getMinutes() + (testTime?.minutes ?? 15));
            }
            state.finishTime.setSeconds(state.finishTime.getSeconds() + 2);

            setState("storeTime", state.finishTime);
         }
      },
      setTimerText: (state, action: PayloadAction<string | null>) => {
         if (action.payload) {
            state.time = action.payload;
         } else {
            state.isOn = false;
            document.getElementById("finishTestBtn")?.click();
         }
      },
      stopTimer: (state) => {
         state.isOn = false;
         removeState("storeTime");
      },
   },
});

export const { startTimer, setTimerText, stopTimer } = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
