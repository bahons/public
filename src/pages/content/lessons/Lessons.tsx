import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { PageTitle } from "../../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { getPredmets } from "../../../redux/slices/predmet.slice";

export const Lessons = () => {
   const predmets = useAppSelector((state) => state.predmets.data);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getPredmets());
   }, []);

   return (
      <div className="container-fluid">
         <PageTitle>Видео-сабақтар</PageTitle>

         <div className="row">
            {predmets ? (
               predmets.map((p, i) => {
                  const bgNumber = ((5 + i) % 5) + 1;
                  const bgText = "widget-bg" + bgNumber;

                  return (
                     <div key={p.id.toString()} className="col-md-4 col-lg-3 col-xl-3 col-sm-6 col-12">
                        <div className={`widget-card ${bgText}`}>
                           <Link className="wc-item" to={`/VideoGroup/${p.id}`}>
                              <h4 className="wc-title">{p.predmetName}</h4>
                              <span className="wc-des" style={{ color: "#fff" }}>
                                 тақырып бойынша
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
                                 <span className="wc-change">Көру</span>
                              </span>
                           </Link>
                        </div>
                     </div>
                  );
               })
            ) : (
               <SkeletonTheme>
                  {new Array(1, 2, 3, 4).map((x) => (
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
