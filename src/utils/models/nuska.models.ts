import { NuskaItems } from "./test.models";

export interface INuska {
   id: number;
   number: number;
   pans: Array<[]>;
}

export interface INuskaData {
   dostup: boolean;
   nuskas: Array<INuska>;
}

export interface ITestNuska {
   testId: number;
   nuskaId: number;
   startDate: Date;
   errorMassage: string | null;
   items: Array<NuskaItems>;
   ball: number | null;
}
