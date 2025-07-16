import React from "react";
import ReactInputMask from "react-input-mask";
import { useAppSelector } from "../../../redux/redux";

export const PersonalDetails = () => {
   const auth = useAppSelector((state) => state.auth.data);

   return (
      <div className="col-md-5">
         <div className="widget-box">
            <div className="wc-title">
               <h4>Мәліметтер</h4>
            </div>
            <div className="widget-inner">
               <form className="edit-profile m-b30">
                  <div>
                     <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Аты-жөні</label>
                        <div className="col-sm-9">
                           <input className="form-control" type="text" value={!auth?.fio ? "" : auth?.fio} readOnly />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                           <input
                              className="form-control"
                              type="text"
                              value={!auth?.userName ? "" : auth?.userName}
                              readOnly
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Телефон</label>
                        <div className="col-sm-9">
                           <ReactInputMask
                              value={!auth?.phone ? "" : auth?.phone}
                              mask="+7 (799) 999-99-99"
                              type="tel"
                              className="form-control"
                              readOnly
                           />
                        </div>
                     </div>
                     <div className="seperator"></div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};
