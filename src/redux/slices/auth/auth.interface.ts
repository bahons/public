import { ISchool } from "../../../utils/models/school.models";

export interface IAuthData {
   userId: string | null;
   userName: string | null;
   fio: string | null;
   phone: string | null;
   tarif: number;
   lastTestData: Date | null;
   testMonth: Date | null;
   videofl: boolean;
   requestStatus: string; // 100 - success
   school: ISchool;
}
