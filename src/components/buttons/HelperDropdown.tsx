import React from "react";

export const HelperDropdown = () => {
   return (
      <>
         <button
            onClick={(e) => {
               const el = e.currentTarget.nextElementSibling as HTMLElement;
               if(el?.style.display !== 'none')
                  el?.setAttribute('style', 'display:none;');
               else
                  el?.setAttribute('style', 'display:block;');
            }}
            style={{ width: '185px', padding: '7px 0', backgroundColor: 'gold', border: '2px solid #4b1867', fontSize: '15px'}}
         >
            <span>Көмекші құралдар</span>
            <i className="fa fa-chevron-down" style={{marginLeft: '9px', fontSize: '14px'}}></i>
         </button>
         <div onMouseLeave={(e) => e.currentTarget.setAttribute('style', 'display: none;')} onClick={(e) => e.currentTarget.setAttribute('style', 'display: none;')} className="dropdown-menu" style={{display: 'none'}}>
            <button className="btn-link dropdown-item" data-toggle="modal" data-target="#mendeleevModal">
               Менделеев кестесі
            </button>
            <button className="btn-link dropdown-item" data-toggle="modal" data-target="#erigishModal">
               Ерігіштік кестесі
            </button>
            <button style={{display: window.innerWidth <= 768 ? 'none' : 'block'}} className="dropdown-item" onClick={() => {
               const el = document.getElementById('geo-calculator');
               if(el?.style.display !== 'none')
                  el?.setAttribute('style', 'display:none;');
               else
                  el?.setAttribute('style', 'display:block;');
            }}>Калькулятор</button>
         </div>
      </>
   )
}