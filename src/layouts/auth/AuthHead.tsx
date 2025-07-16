import React from "react";
import { Link, useLocation } from "react-router-dom";

export const AuthHead = ({}) => {
   const location = useLocation();
   const isRegister: boolean = location.pathname.includes("/register");

   return (
      <div className="heading-bx left">
         <h2 className="title-head">{isRegister ? "Платформаға тіркелу" : "Платформаға кіру"}</h2>
         {isRegister ? (
            <p>
               Егер тіркелген болсаңыз <Link to="/">Кіріңіз</Link>
            </p>
         ) : (
            <p>
               Егер тіркелмеген болсаңыз <Link to="/register">Тіркеліңіз</Link>
            </p>
         )}
      </div>
   );
};
