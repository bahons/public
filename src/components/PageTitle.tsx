import React, { FC, ReactNode } from "react";

export const PageTitle: FC<{ children: ReactNode }> = ({ children }) => {
   return (
      <div className="db-breadcrumb">
         <h4 className="breadcrumb-title">{children}</h4>
      </div>
   );
};
