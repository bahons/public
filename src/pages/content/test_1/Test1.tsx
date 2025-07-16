import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { TarifModal } from "../../../components/modals/TarifModal";
import { checkTarif } from "../../../redux/slices/auth/auth.slice";
import { getUserTarifDate } from "../../../utils/helpers/getUserTarifDate";
import { useHasTarif } from "../../../utils/hooks/useHasTarif";
import { select_pans } from "../../../utils/constants/select_pans";
import { PageTitle } from "../../../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { loadTest } from "../../../redux/slices/test/actions/test.load_actions";
import { StartTestButton } from "../../../components/buttons/StartTestButton";

export const Test1 = () => {
   const [selectedPanId, setSelectedPanId] = useState<number>(0);

   const dispatch = useAppDispatch();
   const history = useHistory();

   const authData = useAppSelector((state) => state.auth.data);
   const { error, confirm, data } = useAppSelector((state) => state.test);

   const hasTarif = useHasTarif();

   useEffect(() => {
      if (authData) {
         dispatch(checkTarif(authData.userId!));
      }
   }, [hasTarif]);

   useEffect(() => {
      if (confirm && data?.id) {
         history.push(`/Test1/${data?.id}`);
         window.location.reload(); // для корректной работы MathJax
      }
   }, [confirm]);

   const startHandler = async () => {
      if (hasTarif) {
         dispatch(loadTest({ PanId: selectedPanId, UserId: authData?.userId! }));
      } else {
         document.getElementById("open_tarif_modal")?.click();
      }
   };

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
            <PageTitle>Пәндік тест</PageTitle>
            {authData && authData.tarif >= 2 && <p>Тариф бітетін уақыт: {getUserTarifDate(authData)}</p>}

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

               <StartTestButton {...{ startHandler }} />
               {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
         </div>
      </>
   );
};
