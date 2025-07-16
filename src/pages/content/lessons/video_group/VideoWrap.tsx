import React, { useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import { VideoTest } from "./video_test/VideoTest";
import { VideoPlayer } from "./VideoPlayer";
import { lesson } from "../../../../redux/api/lesson";
import { IVideoLessonGroup } from "../../../../utils/models/predmet.models";

type Props = {
   predmetId: string;
   videoId: string;
   videoLessonGroup: IVideoLessonGroup | null | undefined;
};

export const VideoWrap = ({ predmetId, videoId, videoLessonGroup }: Props) => {
   const [getVideoTest, { data: videoTest, isLoading, isError, error }] = lesson.useGetVideoTestMutation();

   useEffect(() => {
      isError && console.log(error);
   }, [videoTest]);

   return (
      <div className="col-lg-8 m-b30">
         <div className="widget-box">
            <div className="wc-title px-3">
               <h4>
                  {videoLessonGroup ? (
                     videoTest ? (
                        <>
                           <span className="dashbg-gray p-2 mr-2">Тест</span>
                           {videoLessonGroup.video.name}
                        </>
                     ) : (
                        videoLessonGroup.video.name
                     )
                  ) : (
                     <Skeleton style={{ width: "80%" }} />
                  )}
               </h4>
            </div>
            <div className="widget-inner">
               {videoTest && <VideoTest {...{ predmetId, videoId, videoLessonGroup, videoTest }} />}

               <VideoPlayer {...{ videoTest, videoLessonGroup }} />

               {!videoTest && (
                  <div className="mt-3">
                     <button
                        className="btn"
                        onClick={() =>
                           getVideoTest({ Id: videoLessonGroup?.video.vlId ? videoLessonGroup?.video.vlId : "" })
                        }
                     >
                        Тақырып бойынша тест тапсыру
                     </button>
                     {isLoading && <i className="ml-2 fas fa-spinner fa-pulse"></i>}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
