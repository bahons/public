import React, { useEffect } from "react";
import { Route, Link, useLocation, useHistory, Switch } from "react-router-dom";
import { Login } from "../../pages/auth/Login";
import { Register } from "../../pages/auth/Register";
import { importAuthScripts } from "../../utils/helpers/importScript";
import { AuthHead } from "./AuthHead";
import { useAppSelector } from "../../redux/redux";

export const Auth = () => {
   const location = useLocation();
   const history = useHistory();

   const authUserId = useAppSelector((state) => state.auth.data?.userId);

   useEffect(() => {
      !authUserId && history.replace("/");

      setTimeout(function () {
         document.getElementById("loading-icon-bx")?.remove();
      }, 200);
   }, [authUserId]);

   useEffect(() => {
      importAuthScripts();
   }, [location]);

   return (
      <div className="page-wraper">
         <div id="loading-icon-bx"></div>
         <div className="account-form">
            <div
               className="account-head"
               style={{
                  backgroundImage: 'url("../assets/images/background/bg22.jpeg")',
               }}
            >
               <Link to={location.pathname}>
                  <img src="../assets/images/geoid-logo-white.png" alt="Логотип" />
               </Link>
            </div>

            <div className="account-form-inner">
               <div className="account-container">
                  <AuthHead />

                  <Switch>
                     <Route path="/" exact component={Login} />
                     <Route path="/register" exact component={Register} />
                  </Switch>
               </div>
            </div>
         </div>
      </div>
   );
};
