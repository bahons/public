import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "../../../customStyles/dashstyle.css";

import { TarifModal } from "../../../components/modals/TarifModal";
import { checkTarif } from "../../../redux/slices/auth/auth.slice";
import { getUserTarifDate } from "../../../utils/helpers/getUserTarifDate";
import { useHasTarif } from "../../../utils/hooks/useHasTarif";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { PageTitle } from "../../../components/PageTitle";
import { loadTest5 } from "../../../redux/slices/test/actions/test.load_actions";
import { PansChanger } from "../../../components/PansChanger";

export const Test5 = () => {
   const [pan1, setPan1] = useState<number>(0);
   const [pan2, setPan2] = useState<number>(0);

   const hasTarif = useHasTarif();

   const authData = useAppSelector((state) => state.auth.data);
   const { error, confirm, data5 } = useAppSelector((state) => state.test);

   const dispatch = useAppDispatch();
   const history = useHistory();

   useEffect(() => {
      authData && dispatch(checkTarif(authData.userId!));
   }, [hasTarif]);

   useEffect(() => {
      if (confirm) {
         history.push(`/Test5/${data5?.id}`);
         window.location.reload(); // для корректной работы MathJax
      }
   }, [confirm]);

   const startHandler = () => {
      hasTarif
         ? dispatch(loadTest5({ type: "five", body: { UserId: authData?.userId!, Pan1: pan1, Pan2: pan2 } }))
         : document.getElementById("open_tarif_modal")?.click();
   };

   return (
      <>
         <TarifModal />
         <div className="container-fluid">
            <PageTitle>ҰБТ тапсыру</PageTitle>

            {authData && authData.tarif >= 2 && <p>Тариф бітетін уақыт: {getUserTarifDate(authData)}</p>}

            <div style={{ textAlign: "center" }}>
               <p className="pan widget-bg2">Қазақстан тарихы</p>
               <p className="pan widget-bg3">Оқу Сауаттылығы</p>
               <p className="pan widget-bg4">Математикалық Сауаттылық</p>
               <hr />
               <PansChanger {...{ setPan1, setPan2, startHandler }} />
               {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
         </div>
      </>
   );
};
