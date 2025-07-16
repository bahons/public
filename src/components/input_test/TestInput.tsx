import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   panId: number;
   labelKey: string;
   labelValue: string;
   color?: string;
}

export const TestInput = ({ panId, labelKey, labelValue, color, ...props }: Props) => {
   return (
      <div className="form_radion_btn">
         <label style={{ color, borderColor: color }}>
            <input {...props} />

            <span style={{ paddingRight: "10px" }}>{labelKey} |</span>
            {panId === 17 ? <span>{labelValue}</span> : <span dangerouslySetInnerHTML={{ __html: labelValue }}></span>}
         </label>

         <br />
      </div>
   );
};
