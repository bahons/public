import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants/base_url";

import { getStrDate, getStrDate2 } from "../../../utils/helpers/getStrDate";

import { TestHistorySkeleton } from "./TestHistorySkeleton";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { OfficialItems } from "../../../redux/slices/test_history/testhistory.interface";
import { setWorkData5 } from "../../../redux/slices/test_work/testwork.slice";

export const OfficialTest = () => {
   const [loading, setLoading] = useState<number | null>(null);
   const [testNew, setTestNew] = useState<OfficialItems[]>([]);
   const [fiveId, setFiveId] = useState<number | null>(null);
   const [testHistory, setTestHistory] = useState<OfficialItems[] | null>([]);

   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const data = useAppSelector((state) => state.testHistory.data);

   const history = useHistory();
   const dispatch = useAppDispatch();

   useEffect(() => {
      data &&
         data.officalItems &&
         data.officalItems.map((item) => {
            if (!item.status) {
               setTestNew((state) => [...state, item]);
               setFiveId(item.id);
            } else setTestHistory((state) => [...(state ? state : []), item]);
         });
   }, [data]);

   const getTestHistory = async (testId: number) => {
      setLoading(testId);

      await fetch(`${BASE_URL}/api/office/mistake`, {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            FiveId: testId,
            UserId: authUserId,
         }),
      })
         .then((response) => {
            if (response.ok) {
               return response.json();
            }
            throw new Error("*** Error getTestHistory() Response not OK ***");
         })
         .then((result) => {
            setLoading(null);
            if (!result || typeof result === "string") {
               console.log(result);
               throw new Error("*** Error getTestHistory() Result is null or string ***");
            } else {
               dispatch(setWorkData5(result));
               history.push(`/OfficeTestWork/${testId}`);
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const testStartHandler = () => {
      fiveId && history.push(`/OfficeTest/${fiveId}`);
   };
   const testErrorHandler = (testId: number) => {
      getTestHistory(testId);
   };

   return (
      <div className="col-md-7">
         <div className="widget-box">
            <div className="wc-title">
               <h4>Ресми тесттер</h4>
            </div>
            <div className="widget-inner row">
               <div className="col-lg-12 m-b30">
                  {data ? (
                     <>
                        <div className="widget-box">
                           <div className="widget-inner">
                              <div className="noti-box-list">
                                 <ul>
                                    {testNew.length !== 0 ? (
                                       testNew.map((item) => (
                                          <TestItem
                                             key={item.id.toString()}
                                             item={item}
                                             type="testNew"
                                             btnHandler={testStartHandler}
                                             loading={loading}
                                          />
                                       ))
                                    ) : (
                                       <p>Мәлімет жоқ</p>
                                    )}
                                 </ul>
                              </div>
                           </div>
                        </div>

                        {testHistory?.length !== 0 && (
                           <div className="widget-box mt-3">
                              <div className="widget-inner">
                                 <div className="noti-box-list">
                                    <ul>
                                       {testHistory?.map((item) => (
                                          <TestItem
                                             key={item.id.toString()}
                                             item={item}
                                             type="testHistory"
                                             btnHandler={testErrorHandler}
                                             loading={loading}
                                          />
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        )}
                     </>
                  ) : (
                     <div className="widget-box mt-3">
                        <div className="widget-inner">
                           <div className="noti-box-list">
                              <ul>
                                 <TestHistorySkeleton />
                                 <TestHistorySkeleton />
                              </ul>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

interface TestItemProps {
   item: OfficialItems;
   type: "testNew" | "testHistory";
   btnHandler: (testId: number) => void;
   loading: number | null;
}
const TestItem = ({ item, type, btnHandler, loading }: TestItemProps) => {
   const notIconStyle =
      type === "testNew"
         ? {
              backgroundColor: "#f7b205",
              border: "1px solid white",
           }
         : {
              backgroundColor: "none",
           };
   // style={{backgroundColor: '#34bfa3'}}

   return (
      <li>
         <span className="notification-icon dashbg-green" style={notIconStyle}>
            <i className="fa fa-check"></i>
         </span>
         <span className="notification-text  date-ball" style={{ color: "white" }}>
            {type === "testNew" && <a>Басталу уақыты: </a>}
            <span style={{ fontWeight: 600 }}>
               {type === "testNew"
                  ? getStrDate2(item.createDate)
                  : getStrDate(item.createDate) + " | " + item.ball + " балл"}
            </span>
            <span></span>
         </span>
         <button
            className="notification-time btn"
            style={{ border: "1px solid white" }}
            onClick={() => btnHandler(item.id)}
         >
            {loading === item.id ? (
               <i className="fas fa-spinner fa-pulse"></i>
            ) : (
               <>
                  {type === "testNew" ? "БАСТАУ " : ""}
                  <i className="fa fa-angle-double-right"></i>
               </>
            )}
         </button>
      </li>
   );
};
