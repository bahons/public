import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

export const TestHistorySkeleton = () => {   
   return(
      <SkeletonTheme>
         <li style={{display: 'flex', alignItems: 'center'}}>
            <Skeleton height={40} width={40} className="not-icon-skel"/>
            <span className="notification-text" style={{lineHeight: 1.5, width: '100%'}}>
               <Skeleton width={"80%"}/>
               <Skeleton width={"60%"}/>
            </span>
            <Skeleton height={40} width={55} className="notification-time" style={{top: 0}} />
         </li>
      </SkeletonTheme>
   )
}