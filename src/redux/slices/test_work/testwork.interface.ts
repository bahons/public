import { ITestNuska } from "../../../utils/models/nuska.models";
import { TestItems } from "../../../utils/models/test.models";

interface FiveWorkItems {
   testId: number;
   ball: number;
   panId: number;
   items: Array<TestItems>;
}
export interface ITestWork {
   id: number;
   ball: number;
   items: Array<TestItems>;
}
export interface ITestWork5 {
   fiveId: number;
   ball: number;
   items: Array<FiveWorkItems>;
}

// ---------------------------------

export interface ITestWorkState {
   dataWork: ITestWork | null;
   dataWork5: ITestWork5 | null;
   dataWorkNuska: ITestNuska | null;
   dataWorkTeacher: ITestWork | null;
   isLoading?: number | null;
}
