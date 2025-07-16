import React, { useState } from "react";
import { login } from "../../redux/slices/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux";
import { InputField } from "../../components/input/InputField";
import { AuthButton } from "../../components/buttons/AuthButton";

export const Login = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");

   const { isLoading, errorMessage } = useAppSelector((state) => state.auth);

   const dispatch = useAppDispatch();

   const signInHandler = () => {
      dispatch(login({ email, password }));
   };

   return (
      <form className="contact-bx">
         <div className="row placeani">
            <InputField label="Логин немесе email" value={email} setValue={setEmail} type="text" />
            <InputField label="Құпиясөз" value={password} setValue={setPassword} type="password" />

            <div className="col-lg-12">
               <div className="form-group form-forget">
                  <div className="custom-control custom-checkbox">
                     <input
                        name="RememberMe"
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                     />
                     <label className="custom-control-label" htmlFor="customControlAutosizing">
                        Сақтау
                     </label>
                  </div>
                  <a href="" className="ml-auto">
                     Пароль ұмытсаңыз?
                  </a>
               </div>
            </div>

            <AuthButton {...{ isLoading, errorMessage, clickHandler: signInHandler, type: "login" }}>
               {isLoading ? <span>Күтіңіз</span> : "Кіру"}
            </AuthButton>
         </div>
      </form>
   );
};
