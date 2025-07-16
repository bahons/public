import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { loadTestTeacher } from "../../../redux/slices/test/actions/test.load_actions";
import { StartTestButton } from "../../../components/buttons/StartTestButton";

export const TestTeacher = () => {
   const authData = useAppSelector((state) => state.auth.data);
   const { error, confirm, dataTeacher } = useAppSelector((state) => state.test);

   const dispatch = useAppDispatch();
   const history = useHistory();

   useEffect(() => {
      if (confirm) {
         history.push(`/TestTeacher/${dataTeacher?.userTestId}`);
         window.location.reload(); // для корректной работы MathJax
      }
   }, [confirm]);

   return (
      <div className="container-fluid">
         <PageTitle>Ұлттық біліктілік тестілеу</PageTitle>

         <div className="test-div">
            <p>
               <strong>“Педагогика, оқыту әдістемесі”</strong> бойынша тестті бастау!
            </p>

            <StartTestButton {...{ startHandler: () => dispatch(loadTestTeacher({ Id: authData?.userId! })) }} />
            {error && <div style={{ color: "red" }}>{error}</div>}
         </div>
      </div>
   );
};
