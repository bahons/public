import React, { useEffect } from "react";

import { getTestHistory } from "../../../redux/slices/test_history/testHistory.slice";
import { FiveTestHistory } from "./FiveTestHistory";
import { OfficialTest } from "./OfficialTest";
import { OneTestHistory } from "./OneTestHistory";
import { PersonalDetails } from "./PersonalDetails";
import { useAppDispatch } from "../../../redux/redux";
import { PageTitle } from "../../../components/PageTitle";

export const Account = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getTestHistory());
   }, []);

   return (
      <div className="container-fluid">
         <PageTitle>Жеке кабинет</PageTitle>

         <div className="row">
            <div className="col-lg-12 m-b30">
               <div className="row">
                  <PersonalDetails />
                  <OfficialTest />
               </div>
            </div>

            <div className="col-lg-12 m-b30">
               <div className="row">
                  <OneTestHistory />
                  <FiveTestHistory />
               </div>
            </div>
         </div>
      </div>
   );
};
