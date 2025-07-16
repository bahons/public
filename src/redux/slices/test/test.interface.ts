import { ITest, ITest5, ITestList, ITestTeacher } from "../../../utils/models/test.models";
import { ITestNuska } from "../../../utils/models/nuska.models";

export type TestDataType = "one" | "five" | "office" | "teacher" | "analiz" | "nuska" | "week" | null;

export interface ITestState {
   testList: ITestList[] | null;
   data: ITest | null;
   data5: ITest5 | null;
   dataNuska: ITestNuska | null;
   dataTeacher: ITestTeacher | null;
   error?: string;
   confirm: boolean;
   isLoading?: boolean;
   analizFiveId?: number | null;
   dataType: TestDataType;
}
