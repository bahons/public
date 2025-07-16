import React, { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getNuskaList } from "../../../redux/slices/nuska.slice";
import { PageTitle } from "../../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";

export const NuskaList = () => {
   const { data: nuskaData, error, isLoading } = useAppSelector((state) => state.nuska);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getNuskaList());
   }, []);

   return (
      <div className="container-fluid">
         <PageTitle>Нұсқалар</PageTitle>

         {error && <p style={{ color: "red" }}>{error}</p>}

         <div className="row">
            {!isLoading ? (
               nuskaData &&
               nuskaData.nuskas?.map((p, i) => {
                  const bgNumber = ((5 + i) % 5) + 1;
                  const bgText = "widget-bg" + bgNumber;

                  return (
                     <div key={p.id.toString()} className="col-md-4 col-lg-3 col-xl-3 col-sm-6 col-12">
                        <div className={`widget-card ${bgText}`}>
                           <Link className="wc-item" to={nuskaData.dostup ? `/TestNuska/${p.id}` : "/NuskaList"}>
                              <h4 className="wc-title">{p.number} - нұсқа</h4>
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
                                    {nuskaData.dostup ? "Тапсыру" : <i className="fa fa-lock"></i>}
                                 </span>
                              </span>
                           </Link>
                        </div>
                     </div>
                  );
               })
            ) : (
               <SkeletonTheme>
                  {Array.from(Array(6).keys()).map((x) => (
                     <div key={"skeleton_" + x.toString()} className="mb-4 col-md-4 col-lg-3 col-xl-3 col-sm-6 col-12">
                        <Skeleton height={115} />
                     </div>
                  ))}
               </SkeletonTheme>
            )}
         </div>
      </div>
   );
};
