import React, { FC } from "react";

const touchMoveHandler = (e: React.TouchEvent<HTMLElement>, type: string) => {
   if (window.innerWidth <= 768) {
      let el = document.getElementById("zoom-img-" + type);
      if (el?.style.opacity === "0") {
         var zoomer = e.currentTarget;
         var rect = e.currentTarget.getBoundingClientRect();

         let offsetX = e.touches[0].pageX - rect.left;
         let offsetY = e.touches[0].pageY - rect.top;

         let x = (offsetX / zoomer.offsetWidth) * 100;
         let y = (offsetY / zoomer.offsetHeight) * 100;
         zoomer.style.backgroundPosition = x + "% " + y + "%";
      }
   }
};

const mouseMoveHanlder = (e: React.MouseEvent<HTMLElement, MouseEvent>, type: string) => {
   if (window.innerWidth > 768) {
      let el = document.getElementById("zoom-img-" + type);
      if (el?.style.opacity === "0") {
         var zoomer = e.currentTarget;
         let x = (e.nativeEvent.offsetX / zoomer.offsetWidth) * 100;
         let y = (e.nativeEvent.offsetY / zoomer.offsetHeight) * 100;
         zoomer.style.backgroundPosition = x + "% " + y + "%";
      }
   }
};

const zoomHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
   let el = e.currentTarget;
   if (el.style.cursor == "zoom-out") {
      el.style.opacity = "1";
      el.style.cursor = "zoom-in";
   } else {
      el.style.opacity = "0";
      el.style.cursor = "zoom-out";
   }
};

const Figure: FC<{ type: string }> = ({ type }) => {
   return (
      <figure
         className="zoom"
         style={{
            ...{
               backgroundImage:
                  type === "erigish" ? "url(/assets/images/erigish.png)" : "url(/assets/images/mendeleev.png)",
            },
            ...figureStyle,
         }}
         onMouseMove={(e) => mouseMoveHanlder(e, type)}
         onTouchMove={(e) => touchMoveHandler(e, type)}
      >
         <img
            id={`zoom-img-${type}`}
            src={type === "erigish" ? "/assets/images/erigish.png" : "/assets/images/mendeleev.png"}
            onClick={(e) => zoomHandler(e)}
            onMouseLeave={(e) => {
               e.currentTarget.style.opacity = "1";
               e.currentTarget.style.cursor = "zoom-in";
            }}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
         />
      </figure>
   );
};

export const MendeleevModal = () => {
   return (
      <div
         className="modal fade"
         id="mendeleevModal"
         tabIndex={-1}
         role="dialog"
         aria-labelledby="mendeleevModalLabel"
         aria-hidden="true"
      >
         <div className="modal-dialog mendeleevModal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
               <div className="modal-header">
                  {/* <h4 className="modal-title" id="mendeleevModalLabel">Менделеев кестесі</h4> */}
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div className="modal-body" style={{ padding: 0 }}>
                  <Figure type="mendeleev" />
               </div>
            </div>
         </div>
      </div>
   );
};

export const ErigishModal = () => {
   return (
      <div
         className="modal fade"
         id="erigishModal"
         tabIndex={-1}
         role="dialog"
         aria-labelledby="erigishModalLabel"
         aria-hidden="true"
      >
         <div className="modal-dialog erigishModal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
               <div className="modal-header">
                  {/* <h4 className="modal-title" id="erigishModalLabel">Менделеев кестесі</h4> */}
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div className="modal-body" style={{ padding: 0 }}>
                  <Figure type="erigish" />
               </div>
            </div>
         </div>
      </div>
   );
};

const figureStyle: React.CSSProperties = {
   // backgroundImage: 'url(/assets/images/mendeleev.png)',
   backgroundPosition: "50% 50%",
   backgroundSize: "200%",
   backgroundRepeat: "no-repeat",
   position: "relative",
   width: "100%",
   // height: '400px',
   cursor: "",
};
