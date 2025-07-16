import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/constants/base_url";
import { IVideoLessonGroup, IVideoTest } from "../../utils/models/predmet.models";

export const lesson = createApi({
   reducerPath: "lessonApi",
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
   }),
   endpoints: (build) => ({
      getVideoTest: build.mutation<IVideoTest[] | null, { Id: string }>({
         query: (body: { Id: string }) => ({
            url: "/api/kurs/videotest",
            method: "POST",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body,
         }),
      }),
      getVideos: build.mutation<IVideoLessonGroup | null, any>({
         query: (body: { UserId: string; Id: number; Number: string | null; PredmetId: number }) => ({
            url: "/api/kurs/videos",
            method: "POST",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body,
         }),
      }),
   }),
});
