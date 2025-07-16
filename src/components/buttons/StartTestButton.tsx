import React from "react";
import { useAppSelector } from "../../redux/redux";

type Props = {
   startHandler: () => void;
   goBtnVisible?: boolean;
};

export const StartTestButton = ({ startHandler, goBtnVisible }: Props) => {
   const { isLoading: loading } = useAppSelector((state) => state.test);

   const handleClick = () => {
      if (navigator.onLine) {
         startHandler();
      } else {
         document.getElementById("open_connection_modal")?.click();
      }
   };

   return (
      <div className="form-group" style={{ display: goBtnVisible ? "block" : "none" }} id="gobuttondiv">
         <button
            onClick={handleClick}
            id="gobutton"
            className="btn widget-bg1"
            style={{ backgroundColor: "#4c1864", color: "white" }}
            disabled={loading}
         >
            {loading ? "Күте тұрыңыз..." : "Бастау"}
         </button>
         {loading && <i className="ml-2 fas fa-spinner fa-pulse"></i>}
      </div>
   );
};
