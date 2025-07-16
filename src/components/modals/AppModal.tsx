import React from "react";
import { IModalOptions } from "./ModalOptions";

export const AppModal = (props: IModalOptions) => {
   return (
      <>
         <button
            style={{ display: "none" }}
            id={props.btnId}
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target={"#" + props.modalId}
         >
            Launch demo modal
         </button>
         <div
            className="modal fade"
            id={props.modalId}
            tabIndex={-1}
            role="dialog"
            aria-labelledby={props.modalTitleId}
            aria-hidden="true"
         >
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id={props.modalTitleId}>
                        {props.modalTitle}
                     </h5>
                     <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={props.btnCloseClick}
                     >
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">{props.modalBody}</div>
                  <div className="modal-footer">{props.btnFooter}</div>
               </div>
            </div>
         </div>
      </>
   );
};
