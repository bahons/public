import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "../../../customStyles/dashstyle.css";

import { TodayModal } from "../../../components/modals/TodayModal";
import { PageTitle } from "../../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { getTodayFiveId } from "../../../redux/slices/test/actions/test.actions";
import { loadTest5 } from "../../../redux/slices/test/actions/test.load_actions";
import { FinishTestLoader } from "../../../components/loaders/FinishTestLoader";
import { PansChanger } from "../../../components/PansChanger";
import { StartTestButton } from "../../../components/buttons/StartTestButton";

export const TestAnaliz = () => {
   const [pan1, setPan1] = useState<number>(0);
   const [pan2, setPan2] = useState<number>(0);

   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const { confirm, isLoading: loading, analizFiveId, error } = useAppSelector((state) => state.test);

   const dispatch = useAppDispatch();
   const history = useHistory();

   const startHandler = async () => {
      if (!analizFiveId || analizFiveId === 0) {
         document.getElementById("open_today_modal")?.click();
         return;
      }
      dispatch(
         loadTest5({ type: "analiz", body: { FiveId: analizFiveId, UserId: authUserId!, Pan1: pan1, Pan2: pan2 } })
      );
   };

   useEffect(() => {
      dispatch(getTodayFiveId());
   }, []);
   useEffect(() => {
      if (confirm) {
         history.push(`/TestAnaliz/${analizFiveId}`);
         window.location.reload(); // для корректной работы MathJax
      }
   }, [confirm]);

   return (
      <>
         <TodayModal />

         <div className="container-fluid">
            <PageTitle>Тест анализ</PageTitle>
            <div style={{ textAlign: "center" }}>
               <p className="pan widget-bg2">Қазақстан тарихы</p>
               <p className="pan widget-bg3">Оқу Сауаттылығы</p>
               <p className="pan widget-bg4">Математикалық Сауаттылық</p>
               <hr />
               <PansChanger {...{ setPan1, setPan2, startHandler }} />
               {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
         </div>
         <FinishTestLoader loading={loading} />
      </>
   );
};
