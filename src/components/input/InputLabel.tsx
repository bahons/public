import React, { ReactNode } from "react";

export const InputLabel = ({ children }: { children: ReactNode }) => {
   return (
      <label>
         {(children as string).split("").map((x, i) => (
            <span key={(children as string) + i} style={{ transitionDelay: `${(i + 1) * 30}ms` }}>
               {x}
            </span>
         ))}
      </label>
   );
};
