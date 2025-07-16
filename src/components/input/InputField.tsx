import React, { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import ReactInputMask from "react-input-mask";
import { InputLabel } from "./InputLabel";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   label: string;
   value: string;
   setValue: Dispatch<SetStateAction<string>>;
}

export const InputField = (props: Props) => {
   return (
      <div className="col-lg-12">
         <div className="form-group">
            <div className="input-group">
               <InputLabel>{props.label}</InputLabel>
               {props.type !== "tel" && (
                  <input
                     value={props.value}
                     onChange={(e) => props.setValue(e.target.value.trim())}
                     className="form-control"
                     type={props.type}
                     required
                  />
               )}
               {props.type === "tel" && (
                  <ReactInputMask
                     value={props.value}
                     onChange={(e) => props.setValue(e.target.value)}
                     mask="+7 (799) 999-99-99"
                     type="tel"
                     className="form-control"
                     required
                  />
               )}
            </div>
         </div>
      </div>
   );
};
