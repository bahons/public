import React, { useState } from "react";

import { register } from "../../redux/slices/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux";
import { InputField } from "../../components/input/InputField";
import { AuthButton } from "../../components/buttons/AuthButton";

export const Register = () => {
   const [fio, setFio] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [phone, setPhone] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [passwordConfirm, setPasswordConfirm] = useState<string>("");

   const { isLoading, errorMessage } = useAppSelector((state) => state.auth);

   const dispatch = useAppDispatch();

   const signUpHandler = () => dispatch(register({ fio, email, phone, password, passwordConfirm }));

   return (
      <form className="contact-bx" asp-action="Register">
         <div className="row placeani">
            <InputField label="Аты-жөніңіз" value={fio} setValue={setFio} type="text" />
            <InputField label="Email (эл. почта)" value={email} setValue={setEmail} type="email" />
            <InputField label="Телефон номер" value={phone} setValue={setPhone} type="tel" />
            <InputField label="Жаңа пароль" value={password} setValue={setPassword} type="password" />
            <InputField
               label="Парольді қайталау"
               value={passwordConfirm}
               setValue={setPasswordConfirm}
               type="password"
            />

            <AuthButton {...{ isLoading, errorMessage, clickHandler: signUpHandler, type: "login" }}>
               {isLoading ? <span>Күтіңіз</span> : "Тіркелу"}
            </AuthButton>
         </div>
      </form>
   );
};
