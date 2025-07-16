import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthData } from "./auth.interface";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants/base_url";
import { getState, setState } from "../../storage";
import { checkLoginForm, checkRegisterForm } from "../../../utils/helpers/checkAuthForm";
import { REQUEST_STATUSES } from "../../../utils/constants/request_statuses";
import { ISchool } from "../../../utils/models/school.models";

interface authState {
   data: IAuthData | null;
   errorMessage?: string;
   isLoading?: boolean;
}

const initialState: authState = {
   data: getState<IAuthData>("authUserData") ?? null,
};

export const login = createAsyncThunk("auth/login", async (params: { email: string; password: string }) => {
   try {
      const errMsg = checkLoginForm(params.email, params.password);
      if (errMsg != null) throw new Error(errMsg);

      const { data } = await axios.post<IAuthData>(`${BASE_URL}/api/auth/login`, {
         Login: params.email,
         Password: params.password,
      });

      if (data.requestStatus !== "103") {
         throw new Error(
            REQUEST_STATUSES.find((x) => x.key === parseInt(data.requestStatus))?.value ?? "Қателік кетті!"
         );
      }
      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const register = createAsyncThunk(
   "auth/register",
   async (params: { fio: string; email: string; phone: string; password: string; passwordConfirm: string }) => {
      try {
         const errMsg = checkRegisterForm(
            params.fio,
            params.email,
            params.phone,
            params.password,
            params.passwordConfirm
         );
         if (errMsg != null) throw new Error(errMsg);

         const { data } = await axios.post<IAuthData>(`${BASE_URL}/api/auth/register`, {
            Fio: params.fio,
            Email: params.email,
            Phone: params.phone,
            Password: params.password,
         });

         if (data.requestStatus !== "100") {
            throw new Error(
               REQUEST_STATUSES.find((x) => x.key === parseInt(data.requestStatus))?.value ?? "Қателік кетті!"
            );
         }
         return data;
      } catch (e: any) {
         throw new Error(e.message);
      }
   }
);

export const checkTarif = createAsyncThunk("auth/checkTarif", async (UserId: string) => {
   try {
      const { data } = await axios.post<IAuthData>(`${BASE_URL}/api/auth/state`, { UserId });

      if (!data || typeof data === "string")
         throw new Error("*** Error checkTarif() Result is null or not an object ***");

      return data;
   } catch (e: any) {
      throw new Error(e.message);
   }
});

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      signOut: (state) => {
         state.data = null;
      },
      setFioSchool: (state, action: PayloadAction<{ fio: string; school: ISchool }>) => {
         if (state.data) {
            state.data.fio = action.payload.fio;
            state.data.school = action.payload.school;
            setState("authUserData", state.data);
         }
      },
   },
   extraReducers(builder) {
      builder.addCase(login.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(login.rejected, (state, action) => {
         state.isLoading = false;
         state.errorMessage = action.error.message;
      });
      builder.addCase(login.fulfilled, (state, action) => {
         state.isLoading = false;
         state.data = action.payload;
      });

      builder.addCase(register.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(register.rejected, (state, action) => {
         state.isLoading = false;
         state.errorMessage = action.error.message;
      });
      builder.addCase(register.fulfilled, (state, action) => {
         state.isLoading = false;
         state.data = action.payload;
      });

      builder.addCase(checkTarif.fulfilled, (state, action) => {
         state.data = action.payload;
      });
   },
});

export const { signOut, setFioSchool } = authSlice.actions;
export default authSlice.reducer;
