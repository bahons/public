import React from "react";
import { useHistory } from "react-router-dom";

export const TarifModal = () => {
   const history = useHistory();

   return (
      <>
         <button
            style={{ display: "none" }}
            id="open_tarif_modal"
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#tarifModal"
         >
            Launch demo modal
         </button>

         <div
            className="modal fade"
            id="tarifModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="tarifModalLabel"
            aria-hidden="true"
         >
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="tarifModalLabel">
                        Ескерту!
                     </h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     {/* <p>Сіз тест тапсыруға арналған тариф сатып алмадыңыз!</p> */}
                     <p>Сізге тест функциясы жабық. Доступ ашу үшін тариф сатып алыңыз!</p>
                     <button className="btn blue" data-dismiss="modal" onClick={() => history.push("/Tarif")}>
                        Тарифтерді көру
                     </button>
                     {/* <p>Басқа бетке өтер болсаңыз, белгіленген жауаптар сақталмайды және тест автоматты түрде аяқталады!</p> */}
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-dismiss="modal">
                        OK
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
