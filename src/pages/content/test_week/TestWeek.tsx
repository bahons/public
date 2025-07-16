import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { TarifModal } from "../../../components/modals/TarifModal";
import { select_pans } from "../../../utils/constants/select_pans";
import { PageTitle } from "../../../components/PageTitle";
import { useAppSelector } from "../../../redux/redux";

export const TestWeek = () => {
   const [selectedPanId, setSelectedPanId] = useState<number>(0);

   const history = useHistory();

   const { error } = useAppSelector((state) => state.test);

   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const panId = parseInt(e.target.value);
      setSelectedPanId(panId);
      const btn = document.getElementById("gobuttondiv");
      btn?.setAttribute("style", panId === 0 ? "display: none" : "display: block");
   };

   return (
      <>
         <TarifModal />
         <div className="container-fluid">
            <PageTitle>Тест - Апталық</PageTitle>
            <div className="test-div">
               <p>Жеке пән бойынша тестті бастау</p>
               <select className="form-control sele" onChange={handleSelectChange}>
                  <option value={0}>Пән</option>
                  {select_pans.map((pan) => (
                     <option key={pan.id.toString()} value={pan.id}>
                        {pan.panName}
                     </option>
                  ))}
               </select>
               <br />

               {/* <StartTestButton {...{ startHandler }} /> */}

               <div className="form-group" style={{ display: selectedPanId ? "block" : "none" }} id="gobuttondiv">
                  <button
                     onClick={() => history.push(`/TestList/${selectedPanId}`)}
                     id="gobutton"
                     className="btn widget-bg1"
                     style={{ backgroundColor: "#4c1864", color: "white" }}
                  >
                     Бастау
                  </button>
               </div>
               {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
         </div>
      </>
   );
};
