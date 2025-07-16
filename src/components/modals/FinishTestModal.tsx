import React from "react";
import { AppModal } from "./AppModal";
import { IModalOptions } from "./ModalOptions";

interface Props {
   testFinish: () => void;
}

export const FinishTestModal = ({ testFinish }: Props) => {
   const options: IModalOptions = {
      btnId: "",
      modalId: "finishTestModal",
      modalTitleId: "finishTestModalLabel",
      modalTitle: "Тестті аяқтау",
      modalBody: <p>Сіз тестті аяқтағыңыз келеді ме?</p>,
      btnCloseClick: () => {},
      btnFooter: (
         <>
            <button type="button" className="btn gray" data-dismiss="modal">
               Жоқ
            </button>{" "}
            <button
               type="button"
               className="btn btn-secondary"
               data-dismiss="modal"
               onClick={() =>
                  navigator.onLine ? testFinish() : document.getElementById("open_connection_modal")?.click()
               }
            >
               Иә, тестті аяқтаймын
            </button>
         </>
      ),
   };

   return <AppModal {...options} />;
};
