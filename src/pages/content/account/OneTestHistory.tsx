import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getStrDate } from "../../../utils/helpers/getStrDate";
import { TestHistorySkeleton } from "./TestHistorySkeleton";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { getTestWork } from "../../../redux/slices/test_work/testwork.slice";

export const OneTestHistory = () => {
   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const { data } = useAppSelector((state) => state.testHistory);
   const { isLoading } = useAppSelector((state) => state.testWork);

   const history = useHistory();
   const dispatch = useAppDispatch();

   const getTestHistory = (testId: number, ball: number) => {
      dispatch(getTestWork({ testId, userId: authUserId!, ball }))
         .then(() => {
            history.push(`/TestWork/${testId}`);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   return (
      <div className="col-md-7">
         <div className="widget-box">
            <div className="wc-title">
               <h4>1 пәндік тапсырылған тесттер:</h4>
            </div>
            <div className="widget-inner row">
               <div className="col-lg-12 m-b30">
                  <div className="widget-box">
                     <div className="widget-inner">
                        <div className="noti-box-list">
                           <ul>
                              {data ? (
                                 data.oneItems && data.oneItems.length !== 0 ? (
                                    data.oneItems.map((item, i) => (
                                       <li key={i.toString()}>
                                          <span className="notification-icon dashbg-green">
                                             <i className="fa fa-check"></i>
                                          </span>
                                          <span className="notification-text date-ball">
                                             <a>{item.panName + " | "}</a>
                                             <span>
                                                {item.ball} балл | {getStrDate(item.createDate)}
                                             </span>
                                          </span>
                                          <button
                                             onClick={() => getTestHistory(item.id, item.ball)}
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
                                       <span>Пән бойынша тест тапсырылмаған!</span>
                                       <br />
                                       <Link to="/Test1" className="btn gold mt-2">
                                          Тапсыру
                                       </Link>
                                    </>
                                 )
                              ) : (
                                 new Array(1, 2, 3, 4, 5).map((x) => (
                                    <TestHistorySkeleton key={"sk_1_" + x.toString()} />
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
