import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../../customStyles/dashstyle.css";
import { RootState } from "../../../redux/store";
import { TarifModal } from "../../../components/modals/TarifModal";
import { FioModal } from "../../../components/modals/FioModal";
import { PageTitle } from "../../../components/PageTitle";
import { loadTestNuska } from "../../../redux/slices/test/actions/test.load_actions";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { PansChanger } from "../../../components/PansChanger";
import { StartTestButton } from "../../../components/buttons/StartTestButton";
import { getSchoolData } from "../../../redux/slices/school.slice";

type Params = {
   nuskaId: string;
};

export const TestNuska = () => {
   const [pan1, setPan1] = useState<number>(0);
   const [pan2, setPan2] = useState<number>(0);

   const { nuskaId } = useParams<Params>();
   const nuskaNumber = useAppSelector((state) => state.nuska.data?.nuskas)?.find(
      (x) => x.id == parseInt(nuskaId)
   )?.number;

   const { dataNuska, error, confirm } = useAppSelector((state) => state.test);
   const authUserId = useAppSelector((state: RootState) => state.auth.data?.userId);

   const dispatch = useAppDispatch();
   const history = useHistory();

   const startHandler = () =>
      dispatch(loadTestNuska({ UserId: authUserId!, NuskaId: parseInt(nuskaId), Pan1: pan1, Pan2: pan2 }));

   useEffect(() => {
      dispatch(getSchoolData());
      if (confirm) {
         history.push(`/TestingNuska/${dataNuska?.testId}`);
         window.location.reload(); // для корректной работы MathJax
      }
   }, [confirm]);

   return (
      <>
         <TarifModal />
         <FioModal startHandler={startHandler} />
         <div className="container-fluid">
            <PageTitle>{nuskaNumber + "-нұсқа"}</PageTitle>

            <div style={{ textAlign: "center" }}>
               <p className="pan widget-bg2">Қазақстан тарихы</p>
               <p className="pan widget-bg3">Оқу Сауаттылығы</p>
               <p className="pan widget-bg4">Математикалық Сауаттылық</p>
               <hr />
               <PansChanger
                  {...{ setPan1, setPan2, startHandler: () => document.getElementById("open_fio_modal")?.click() }}
               />
               {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
         </div>
      </>
   );
};
