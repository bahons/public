import React from "react";

interface Props {
   testFinish: () => void;
}

export const FinishTestTimeoutModal = ({ testFinish }: Props) => {
   return (
      <>
         <div
            onMouseOver={() => {
               setTimeout(() => {
                  document.getElementById("finishTestBtnClick")?.click();
               }, 7000);
            }}
            className="modal fade"
            id="finishTestTimeoutModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="finishTestTimeoutModalLabel"
            aria-hidden="true"
            data-backdrop="static"
         >
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h4 className="modal-title" id="finishTestTimeoutModalLabel">
                        Тестті аяқтау
                     </h4>
                  </div>
                  <div className="modal-body">
                     <p>Сізге тест тапсыруға берілген уақыт бітті, тестті аяқтаңыз</p>
                  </div>
                  <div className="modal-footer">
                     {/* <button type="button" className="btn gray" data-dismiss="modal">Жоқ</button> */}
                     <button
                        id="finishTestBtnClick"
                        type="button"
                        className="btn"
                        data-dismiss="modal"
                        onClick={() => testFinish()}
                     >
                        Тестті аяқтау
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
