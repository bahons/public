import React, { Dispatch, SetStateAction } from "react";
import { IVideoTestItem } from "../../../../../utils/models/predmet.models";

interface VideoTestNotSuccessProps {
   ball: number;
   setIsTestEnd: Dispatch<SetStateAction<boolean>>;
   setTestItems: Dispatch<SetStateAction<IVideoTestItem[]>>;
}
export const VideoTestNotSuccess = ({ ball, setIsTestEnd, setTestItems }: VideoTestNotSuccessProps) => {
   const restartTest = () => {
      const elist = document.getElementsByTagName("input");
      for (const el of elist) {
         el.checked = false;
      }
      setIsTestEnd(false);
      setTestItems([]);
   };

   return (
      <div className="text-center">
         <span>
            <i className="fa fa-circle-xmark mb-2" style={{ color: "red", fontSize: "100px" }}></i>
         </span>
         <h3>Сен сынақтан өтпедің!</h3>
         <div>
            <p>
               <strong>{ball}-ақ балл </strong>
               <span>жинадың.</span>
            </p>
            <p>
               <span>
                  Келесі видео-сабаққа доступ алу үшін тестті сәтті тапсыру керек. Ол үшін кемінде{" "}
                  <strong>10 балл</strong> жинау міндетті!
               </span>
            </p>
         </div>
         <button className="btn btn-primary brown" onClick={() => restartTest()}>
            Тестті қайтадан тапсыру
         </button>
      </div>
   );
};
