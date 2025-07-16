import React from "react";

import { Link, useHistory } from "react-router-dom";

import { getStrDate } from "../../../utils/helpers/getStrDate";
import { TestHistorySkeleton } from "./TestHistorySkeleton";
import { getTestWork5 } from "../../../redux/slices/test_work/testwork.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";

export const FiveTestHistory = () => {
   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const data = useAppSelector((state) => state.testHistory.data);

   const { isLoading } = useAppSelector((state) => state.testWork);

   const dispatch = useAppDispatch();
   const history = useHistory();

   const getTestHistory = async (testId: number) => {
      dispatch(getTestWork5({ userId: authUserId!, testId }))
         .then(() => {
            history.push(`/TestWork5/${testId}`);
         })
         .catch((error) => console.log(error));
   };

   return (
      <div className="col-md-5">
         <div className="widget-box">
            <div className="wc-title">
               <h4>5 пәндік тапсырылған тесттер:</h4>
            </div>
            <div className="widget-inner row" id="ubt">
               <div className="col-lg-12 m-b30">
                  <div className="widget-box">
                     <div className="widget-inner">
                        <div className="noti-box-list">
                           <ul>
                              {data ? (
                                 data.fiveItems && data.fiveItems.length !== 0 ? (
                                    data.fiveItems.map((item, i) => (
                                       <li key={i.toString()}>
                                          <span className="notification-icon dashbg-green">
                                             <i className="fa fa-check"></i>
                                          </span>
                                          <span className="notification-text date-ball date-ball-5">
                                             <span>{getStrDate(item.createDate)} | </span>
                                             <span>{item.ball} балл</span>
                                          </span>
                                          <button
                                             onClick={() => getTestHistory(item.id)}
                                             className="notification-time btn"
                                             disabled={isLoading === item.id}
                                          >
                                             {isLoading === item.id ? (
                                                <i className="fas fa-spinner fa-pulse"></i>
                                             ) : (
                                                <i className="fa fa-angle-double-right"></i>
                                             )}
                                          </button>
                                       </li>
                                    ))
                                 ) : (
                                    <>
                                       <span>5 пән бойынша тест тапсырылмаған!</span>
                                       <br />
                                       <Link to="/Test5" className="btn gold mt-2">
                                          Тапсыру
                                       </Link>
                                    </>
                                 )
                              ) : (
                                 new Array(1, 2, 3, 4, 5).map((x) => (
                                    <TestHistorySkeleton key={"sk_5_" + x.toString()} />
                                 ))
                              )}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
