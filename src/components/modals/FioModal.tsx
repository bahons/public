import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setFioSchool } from "../../redux/slices/auth/auth.slice";
import { AppModal } from "./AppModal";
import { IModalOptions } from "./ModalOptions";
import { ISchool } from "../../utils/models/school.models";

interface Props {
   startHandler: () => void;
}

export const FioModal = ({ startHandler }: Props) => {
   const [fio, setFio] = useState<string>("");
   const [school, setSchool] = useState<ISchool | null>(null);
   const [error, setError] = useState<string | null>(null);

   const schoolArr = useSelector((state: RootState) => state.school.data);

   const dispatch = useDispatch<AppDispatch>();

   const checkForm = () => {
      setError(null);

      if (fio.trim().length < 6) {
         return setError("Аты-жөніңізді толық жазыңыз!");
      }
      if (!school) {
         return setError("Мектебіңізді таңдаңыз!");
      }

      dispatch(
         setFioSchool({
            fio: fio.trim(),
            school,
         })
      );
      startHandler();
   };

   const options: IModalOptions = {
      btnId: "open_fio_modal",
      modalId: "fioModal",
      modalTitleId: "fioModalLabel",
      modalTitle: "Форманы толтырыңыз:",
      modalBody: (
         <>
            <div className="form-group row">
               <label className="col-sm-3 col-form-label">Аты-жөні</label>
               <div className="col-sm-9">
                  <input className="form-control" type="text" value={fio} onChange={(e) => setFio(e.target.value)} />
               </div>
            </div>
            <div className="form-group row">
               <label className="col-sm-3 col-form-label">Мектеп</label>
               <div className="col-sm-9">
                  <select
                     className="form-control"
                     onChange={(e) => {
                        const schoolId = parseInt(e.target.value);
                        setSchool({ id: schoolId, name: schoolArr?.find((x) => x.id === schoolId)?.name ?? "" });
                     }}
                  >
                     <option value={0}>Таңдаңыз</option>
                     {schoolArr?.map((item) => (
                        <option key={item.id.toString()} value={item.id}>
                           {item.name}
                        </option>
                     ))}
                  </select>
                  {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}
               </div>
            </div>
         </>
      ),
      btnCloseClick: () => {},
      btnFooter: (
         <>
            <button
               type="button"
               className="btn btn-secondary"
               onClick={() => checkForm()}
               disabled={fio.trim().length === 0}
            >
               Бастау
            </button>
            <button
               style={{ display: "none" }}
               id="close_fio"
               type="button"
               className="btn btn-secondary"
               data-dismiss="modal"
            >
               Close
            </button>
         </>
      ),
   };

   return <AppModal {...options} />;
};
