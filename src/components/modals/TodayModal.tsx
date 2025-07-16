import React from "react";

export const TodayModal = () => {
   return (
      <>
         <button
            style={{ display: "none" }}
            id="open_today_modal"
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#todayModal"
         >
            Launch demo modal
         </button>

         <div
            className="modal fade"
            id="todayModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="todayModalLabel"
            aria-hidden="true"
         >
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="todayModalLabel">
                        Ескерту!
                     </h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <p>Бүгін сізде тест жоқ!</p>
                  </div>
                  <div className="modal-footer">
                     <button id="today_modal_btn" type="button" className="btn btn-secondary" data-dismiss="modal">
                        OK
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
