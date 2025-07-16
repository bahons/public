import React from "react";
import { AppModal } from "./AppModal";
import { IModalOptions } from "./ModalOptions";

export const ConnectionModal = () => {
   const options: IModalOptions = {
      btnId: "open_connection_modal",
      modalId: "connectionModal",
      modalTitleId: "connectionModalLabel",
      modalTitle: "Ескерту!",
      modalBody: <p>Интернет байланысын тексеріңіз!</p>,
      btnCloseClick: () =>
         !navigator.onLine &&
         setTimeout(() => {
            document.getElementById("open_connection_modal")?.click();
         }, 500),
      btnFooter: (
         <button
            id="close_connection_modal"
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() =>
               !navigator.onLine &&
               setTimeout(() => {
                  document.getElementById("open_connection_modal")?.click();
               }, 500)
            }
         >
            OK
         </button>
      ),
   };

   return <AppModal {...options} />;
};
