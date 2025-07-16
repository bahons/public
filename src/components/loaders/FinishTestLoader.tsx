import React from "react";

export const FinishTestLoader = ({ loading }: { loading: boolean | undefined }) => {
   return (
      <div
         style={{
            display: loading ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2002,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
         }}
      >
         <i className="fas fa-spinner fa-pulse" style={{ color: "white", fontSize: "50px" }}></i>
         <p style={{ color: "white" }}>Күте тұрыңыз...</p>
      </div>
   );
};
