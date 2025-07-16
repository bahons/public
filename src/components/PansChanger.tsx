import React, { Dispatch, SetStateAction, useState } from "react";
import { PanList, getPanList2 } from "../utils/helpers/getSelectPans";
import { select_pans } from "../utils/constants/select_pans";
import { StartTestButton } from "./buttons/StartTestButton";

type Props = {
   setPan1: Dispatch<SetStateAction<number>>;
   setPan2: Dispatch<SetStateAction<number>>;
   startHandler: () => void;
};

export const PansChanger = ({ setPan1, setPan2, startHandler }: Props) => {
   const [panList2, setPanList2] = useState<PanList[] | null>(null);
   const [goBtnVisible, setGoBtnVisible] = useState<boolean>(false);

   const changePanHandler1 = (pan1_id: number) => {
      setPan1(pan1_id);
      setPanList2(getPanList2(pan1_id));

      setGoBtnVisible(false);
   };
   const changePanHandler2 = (pan2_value: number) => {
      setPan2(pan2_value);
      setGoBtnVisible(pan2_value !== 0);
   };

   return (
      <>
         <div className="form-group">
            <select className="form-control sele" onChange={(e) => changePanHandler1(parseInt(e.target.value))}>
               <option value={0}>Пән 1</option>
               {select_pans
                  .filter((item) => ![4, 6, 7].includes(item.id)) // Пәндерді сүзу
                  .map((item) => (
                     <option key={item.id} value={item.id}>
                        {item.panName}
                     </option>
                  ))}
            </select>
         </div>
         <div className="form-group">
            <select className="form-control sele" onChange={(e) => changePanHandler2(parseInt(e.target.value))}>
               <option value={0}>Пән 2</option>
               {panList2 &&
                  panList2.map((item) => (
                     <option key={item.panName} value={item.id}>
                        {item.panName}
                     </option>
                  ))}
            </select>
         </div>
         <br />
         <StartTestButton {...{ startHandler, goBtnVisible }} />
      </>
   );
};
