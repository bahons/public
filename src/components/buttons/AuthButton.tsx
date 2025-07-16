import React, { ReactNode } from "react";

interface Props {
   children: ReactNode;
   isLoading: boolean | undefined;
   errorMessage: string | undefined;
   clickHandler: () => void;
   type: "register" | "login";
}

export const AuthButton = ({ children, isLoading, errorMessage, clickHandler, type }: Props) => {
   return (
      <div className="col-lg-12 m-b30">
         <button type="button" onClick={() => clickHandler()} disabled={isLoading} className="btn button-md">
            {children}
         </button>
         {isLoading && <i className="ml-2 fas fa-spinner fa-pulse"></i>}
         {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
   );
};
