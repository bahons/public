import React from "react";

import Plyr from "plyr-react";
import { IVideoLessonGroup, IVideoTest } from "../../../../utils/models/predmet.models";
// import "plyr-react/plyr.css";

type Props = {
   videoTest: IVideoTest[] | null | undefined;
   videoLessonGroup: IVideoLessonGroup | null | undefined;
};

export const VideoPlayer = (props: Props) => {
   return (
      <div className="video" style={{ display: props.videoTest ? "none" : "block" }}>
         <div className="plyr__video-embed" id="player">
            {props.videoLessonGroup && (
               <Plyr
                  source={{
                     type: "video",
                     sources: [
                        {
                           src: "https://www.youtube.com/embed/" + props.videoLessonGroup?.video.url + "?vq=hd1080",
                           provider: "youtube",
                        },
                     ],
                  }}
                  options={{
                     quality: {
                        default: 720,
                        options: [1440, 1080, 720],
                        forced: true,
                     },
                  }}
               />
            )}
         </div>
      </div>
   );
};

// OLD
/* <div className="plyr__video-embed" id="player">
   {props.videoLessonGroup && (
      <iframe
         id="plpl"
         // src="https://player.vimeo.com/video/739518738?h=eec891201a"
         src={"https://www.youtube.com/embed/" + props.videoLessonGroup.video.url + "&vq=hd720"}
         width="640"
         height="564"
         frameBorder={0}
         allow="fullscreen"
      ></iframe>
   )}
</div> */

// Quality in youtube url
// Code for 1440: vq=hd1440
// Code for 1080: vq=hd1080
// Code for 720: vq=hd720
// Code for 480p: vq=large
// Code for 360p: vq=medium
// Code for 240p: vq=small
