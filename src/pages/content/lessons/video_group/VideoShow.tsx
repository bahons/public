import React, { ReactNode, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../redux/redux";
import { lesson } from "../../../../redux/api/lesson";
import { VideoWrap } from "./VideoWrap";

interface ParamTypes {
   predmetId: string;
   videoGroupId: string;
   videoId: string;
}

export const VideoShow = () => {
   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const videoGroup = useAppSelector((state) => state.predmets.videoGroup);

   const { predmetId, videoGroupId, videoId } = useParams<ParamTypes>();

   const [getVideos, { data: videoLessonGroup }] = lesson.useGetVideosMutation();

   const history = useHistory();

   useEffect(() => {
      if (videoGroup?.find((x) => x.id === parseInt(videoGroupId))?.openStatus) {
         getVideos({
            UserId: authUserId,
            Id: parseInt(videoGroupId),
            Number: videoId ? videoId : null,
            PredmetId: parseInt(predmetId),
         });
      } else {
         history.push(`/VideoGroup/${predmetId}`);
      }
   }, [videoGroupId, videoId]);

   return (
      <div className="container-fluid">
         <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Тақырыптық видео-сабақтар</h4>
            <ul className="db-breadcrumb-list">
               <li>
                  <Link to={`/VideoGroup/${predmetId}`}>
                     <i className="fa fa-arrow-left"></i>Тақырыптар
                  </Link>
               </li>
               {/* <li>VideoGroupName</li> */}
            </ul>
         </div>
         <div className="row">
            <VideoWrap {...{ predmetId, videoId, videoLessonGroup }} />

            <div className="col-lg-4 m-b30">
               <div className="widget-box">
                  <div className="wc-title px-3">
                     <h4>Сабақтар</h4>
                  </div>
                  <div className="widget-inner">
                     <div className="noti-box-list">
                        <ul>
                           {videoLessonGroup
                              ? videoLessonGroup.items.map((item) => {
                                   interface Props {
                                      children: ReactNode;
                                   }
                                   const LessonWrapper = ({ children }: Props) =>
                                      item.dostupStatus ? (
                                         <Link
                                            to={`/VideoShow/${predmetId}/${videoGroupId}/${item.vlId}`}
                                            style={{ display: "flex", alignItems: "center" }}
                                         >
                                            {children}
                                         </Link>
                                      ) : (
                                         <span
                                            style={{
                                               display: "flex",
                                               alignItems: "center",
                                               cursor: "default",
                                               color: "#bbb",
                                            }}
                                         >
                                            {children}
                                         </span>
                                      );
                                   const icon = item.dostupStatus ? "fa fa-video-camera" : "fa fa-lock";

                                   return (
                                      <li key={item.vlId.toString()}>
                                         <LessonWrapper>
                                            <span className="notification-icon dashbg-gray">
                                               <i className={icon}></i>
                                            </span>
                                            <span>{item.name}</span>
                                         </LessonWrapper>
                                      </li>
                                   );
                                })
                              : new Array(1, 2, 3).map((x) => (
                                   <li key={x.toString()} style={{ display: "flex", alignItems: "center" }}>
                                      <span className="notification-icon dashbg-gray">
                                         <Skeleton />
                                      </span>
                                      <span style={{ width: "100%" }}>
                                         <Skeleton style={{ width: "100%" }} />
                                         <Skeleton style={{ width: "70%" }} />
                                      </span>
                                   </li>
                                ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
