import React from "react";
import { AppModal } from "./AppModal";
import { IModalOptions } from "./ModalOptions";

export const ConfirmModal = () => {
   const options: IModalOptions = {
      btnId: "open_confirm",
      modalId: "exampleModal",
      modalTitleId: "exampleModalLabel",
      modalTitle: "Ескерту!",
      modalBody: (
         <>
            <p>Сіз әлі тестті аяқтамадыңыз!</p>
            <p>Басқа бетке өту үшін тестті аяқтаңыз!</p>
         </>
      ),
      btnCloseClick: () => {},
      btnFooter: (
         <button id="close_confirm" type="button" className="btn btn-secondary" data-dismiss="modal">
            OK
         </button>
      ),
   };

   return <AppModal {...options} />;
};
