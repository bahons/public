import React, { useEffect } from "react";
import { Auth } from "./layouts/auth/Auth";
import { BrowserRouter } from "react-router-dom";
import { Content } from "./layouts/content/Content";
import { useAppDispatch, useAppSelector } from "./redux/redux";
import { setConfirmm } from "./redux/slices/test/test.slice";

import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const dispatch = useAppDispatch();

   document.addEventListener("contextmenu", (event) => event.preventDefault());

   const leaveConfirmation = (callback: Function) => {
      document.getElementById("open_confirm")?.click();
      document.getElementById("finish_confirm")?.addEventListener("click", function () {
         callback(true);
         dispatch(setConfirmm(false));
         document.getElementById("open_confirm")?.click();
      });
   };

   // geoid-edu.kz основной доменге публ жасауға керек, клиентский жақта қате шығып кэш тазармай қалды
   // useEffect(() => {
   //    window.location.href = "https://app.geoid-edu.kz/";
   // }, []);

   return (
      <BrowserRouter
         getUserConfirmation={(_, callback) => {
            return leaveConfirmation(callback);
         }}
         basename="/"
      >
         {!authUserId ? <Auth /> : <Content />}
      </BrowserRouter>
   );
};
export default App;
