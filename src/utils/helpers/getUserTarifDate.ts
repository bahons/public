import { IAuthData } from "../../redux/slices/auth/auth.interface";

export const getUserTarifDate = (authData: IAuthData): string => {
   if (authData?.testMonth) {
      const date = new Date(authData.testMonth);

      if (isNaN(date.getTime())) return ""; // Дұрыс емес дата болса, бос жолды қайтарамыз

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Айды форматтау
      const day = String(date.getDate()).padStart(2, "0"); // Күнді форматтау

      return `${day}.${month}.${year}`;
   }
   return "";
};
