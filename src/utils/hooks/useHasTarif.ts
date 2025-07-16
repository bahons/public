import { useAppSelector } from "../../redux/redux";

export const useHasTarif = (): boolean => {
   const authData = useAppSelector((state) => state.auth.data);

   if (!authData || authData.tarif < 2 || authData.tarif > 5 || authData.testMonth === null) {
      return false;
   }
   if (new Date(authData.testMonth).valueOf() - new Date().valueOf() < 0) {
      return false;
   }
   return true;
};
