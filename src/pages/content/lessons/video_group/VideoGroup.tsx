import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getVideoGroup } from "../../../../redux/slices/predmet.slice";
import { useAppDispatch, useAppSelector } from "../../../../redux/redux";

import "../../../../customStyles/videoGroup.css";

interface ParamTypes {
   predmetId: string;
}

export const VideoGroup = () => {
   const { predmetId } = useParams<ParamTypes>();
   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const videoGroup = useAppSelector((state) => state.predmets.videoGroup);

   const dispatch = useAppDispatch();

   useEffect(() => {
      console.log(videoGroup);
      authUserId && dispatch(getVideoGroup({ UserId: authUserId, PredmetId: parseInt(predmetId) }));
   }, []);

   return (
      <div className="container-fluid">
         <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Тақырыптық видео-сабақтар</h4>
            <ul className="db-breadcrumb-list">
               <li>
                  <Link to="/Profil">
                     <i className="fa fa-home"></i>Сабақтар
                  </Link>
               </li>
               <li>Тақырыптық видео-сабақтар</li>
            </ul>
         </div>
         <div className="row">
            <div className="col-lg-12 m-b30">
               <div className="widget-box">
                  <div className="widget-inner">
                     {videoGroup && videoGroup.length !== 0 ? (
                        videoGroup.map((vg) => (
                           <div
                              key={vg.id.toString()}
                              className="card-courses-list bookmarks-bx"
                              title={vg.openStatus ? "" : "Сізде бұл тақырыпқа доступ жоқ!"}
                           >
                              <div className="card-courses-media">
                                 <img src="/assets/images/vd-banner.jpg" alt="" />
                              </div>
                              <div className="card-courses-full-dec">
                                 <div className="card-courses-title">
                                    <h4 className="m-b5">{vg.name}</h4>
                                 </div>
                                 <div className="row card-courses-dec">
                                    <div className="col-md-12">
                                       {vg.openStatus ? (
                                          <a href={`/VideoShow/${predmetId}/${vg.id}`} className="btn">
                                             Сабақты көру
                                          </a>
                                       ) : (
                                          <span className="btn brown" title="Сізде бұл тақырыпқа доступ жоқ!">
                                             <i className="fa fa-lock"></i>
                                          </span>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <SkeletonTheme>
                           {new Array(1, 2, 3).map((x) => (
                              <div key={"skel_" + x.toString()} className="card-courses-list bookmarks-bx">
                                 <Skeleton className="card-courses-media" style={{ marginRight: 0 }} />
                                 <div className="card-courses-full-dec card-courses-full-dec-ml">
                                    <div className="card-courses-title">
                                       <Skeleton width={130} height={26} style={{ marginBottom: "5px" }} />
                                    </div>
                                    <div className="card-courses-list-bx">
                                       <ul className="card-courses-view">
                                          <li className="card-courses-review">
                                             <Skeleton height={30} width={100} />
                                          </li>
                                       </ul>
                                    </div>
                                    <div className="row card-courses-dec">
                                       <div className="col-md-12">
                                          <ul>
                                             <Skeleton width={250} height={20} count={4} />
                                          </ul>
                                       </div>
                                       <div className="col-md-12">
                                          <Skeleton className="btn" width={130} height={40} />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </SkeletonTheme>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
