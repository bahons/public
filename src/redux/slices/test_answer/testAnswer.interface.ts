export interface TestAnswerItem {
   ForId: Number;
   Otvet: string;
}
export interface TestAnswerItems5 {
   TestId: number;
   PanId: number;
   Items: TestAnswerItem[];
}
export interface TestAnswerItemsNuska {
   PanId: number;
   Items: TestAnswerItem[];
}

export interface ITestAnswer {
   data: Array<TestAnswerItem>;
   data5: Array<TestAnswerItems5>;
   dataNuska: Array<TestAnswerItemsNuska>;
   dataTeacher: Array<TestAnswerItem>;
}
