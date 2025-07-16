import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, useHistory, useParams } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { getTestList, loadTestWeek } from "../../../redux/slices/test/actions/test.load_actions";
import { FioModal } from "../../../components/modals/FioModal";
import { getSchoolData } from "../../../redux/slices/school.slice";

interface ParamTypes {
   panNumber: string;
}

export const TestList = () => {
   const [pan1, setPan1] = useState<number>();
   const { panNumber } = useParams<ParamTypes>();

   const authData = useAppSelector((state) => state.auth.data);
   const { dataNuska, testList, error, isLoading, confirm } = useAppSelector((state) => state.test);

   const dispatch = useAppDispatch();
   const history = useHistory();

   useEffect(() => {
      dispatch(getTestList(parseInt(panNumber)));
   }, []);

   useEffect(() => {
      dispatch(getSchoolData());
      if (confirm) {
         history.push(`/TestingNuska/${dataNuska?.testId}`);
         window.location.reload(); // для корректной работы MathJax
      }
   }, [confirm]);

   const startHandler = () => {
      pan1 && dispatch(loadTestWeek({ userId: authData?.userId!, pan1 }));
   };

   return (
      testList && (
         <>
            <FioModal startHandler={startHandler} />

            <div className="container-fluid">
               <PageTitle>{testList[0].name}</PageTitle>

               {error && <p style={{ color: "red" }}>{error}</p>}

               <div className="row">
                  {!isLoading ? (
                     testList.map((item, i) => {
                        const bgNumber = ((5 + i) % 5) + 1;
                        const bgText = "widget-bg" + bgNumber;

                        return (
                           <div key={item.id.toString()} className="col-md-4 col-lg-3 col-xl-3 col-sm-6 col-12">
                              <div className={`widget-card ${bgText}`}>
                                 <div
                                    className="wc-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                       document.getElementById("open_fio_modal")?.click();
                                       setPan1(item.id);
                                       // startHandler(item.id)}
                                    }}
                                 >
                                    <h4 className="wc-title">{item.oneTestNumber} - нұсқа</h4>
                                    <span className="wc-des" style={{ color: "#fff" }}>
                                       жаңа формат
                                    </span>
                                    <span className="wc-stats" style={{ color: "#fff" }}></span>
                                    <div className="progress wc-progress">
                                       <div
                                          className="progress-bar"
                                          role="progressbar"
                                          style={{ width: "0%" }}
                                          aria-valuenow={50}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                       ></div>
                                    </div>
                                    <span className="wc-progress-bx" style={{ color: "#fff" }}>
                                       <span className="wc-change">
                                          {/* {data.dostup ? "Тапсыру" : <i className="fa fa-lock"></i>} */}
                                          Тапсыру
                                       </span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <SkeletonTheme>
                        {Array.from(Array(6).keys()).map((x) => (
                           <div
                              key={"skeleton_" + x.toString()}
                              className="mb-4 col-md-4 col-lg-3 col-xl-3 col-sm-6 col-12"
                           >
                              <Skeleton height={115} />
                           </div>
                        ))}
                     </SkeletonTheme>
                  )}
               </div>
            </div>
         </>
      )
   );
};
