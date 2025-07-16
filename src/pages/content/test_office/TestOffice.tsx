import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import "../../../customStyles/dashstyle.css";

import { PageTitle } from "../../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { loadTest5 } from "../../../redux/slices/test/actions/test.load_actions";
import { PansChanger } from "../../../components/PansChanger";
import { StartTestButton } from "../../../components/buttons/StartTestButton";

type Params = {
   fiveId: string;
};
export const TestOffice = () => {
   const [pan1, setPan1] = useState<number>(0);
   const [pan2, setPan2] = useState<number>(0);

   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const { error, confirm, data5 } = useAppSelector((state) => state.test);

   const { fiveId } = useParams<Params>();

   const dispatch = useAppDispatch();
   const history = useHistory();

   const startHandler = () =>
      dispatch(
         loadTest5({ type: "office", body: { FiveId: parseInt(fiveId), UserId: authUserId!, Pan1: pan1, Pan2: pan2 } })
      );

   useEffect(() => {
      if (confirm) {
         history.push(`/OfficeTesting/${data5?.id}`);
         window.location.reload(); // для корректной работы MathJax
      }
   }, [confirm]);

   return (
      <div className="container-fluid">
         <PageTitle>Пән таңдау</PageTitle>

         <div style={{ textAlign: "center" }}>
            <p className="pan">Қазақстан тарихы</p>
            <p className="pan">Оқу Сауаттылығы</p>
            <p className="pan">Математикалық Сауаттылық</p>
            <hr />
            <PansChanger {...{ setPan1, setPan2, startHandler }} />
            {error && <div style={{ color: "red" }}>{error}</div>}
         </div>
      </div>
   );
};
