import React from "react";

export const FinishTestButton = () => {
   return (
      <>
         <button
            id="myBtn"
            style={{
               width: "140px",
               padding: "7px 0",
               backgroundColor: "aquamarine",
               border: "2px solid #4b1867",
            }}
            data-toggle="modal"
            data-target="#finishTestModal"
         >
            Тестті аяқтау
         </button>
         <button
            id="finishTestBtn"
            style={{ display: "none" }}
            data-toggle="modal"
            data-target="#finishTestTimeoutModal"
         ></button>
      </>
   );
};
