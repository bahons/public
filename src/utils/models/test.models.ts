// TEST Models
interface OtherItem {
   id: number;
   questionId: number;
   question: string | null;
   name: string | null;
   succes: string | null;
   otvet: string | null;
   a: string | null;
   b: string | null;
   c: string | null;
   d: string | null;
}

export interface TestItems {
   id: number;
   forId: number;
   name: string | null;
   name2: string | null;
   topUrl: string | null;
   buttomUrl: string | null;
   a: string;
   b: string;
   c: string;
   d: string;
   e: string;
   f: string | null;
   g: string | null;
   h: string | null;
   succes: string | null;
   otvet: string | null;
   itemBall: number;
   twentyGroupId: null | number;
   panId: number;
   nuskaId: null | number;
   questionTopik: string | null;
   other_35_40: Array<OtherItem>;
}

export interface FiveItems {
   id: number;
   panName: string;
   panId: number;
   testItems: Array<TestItems>;
}
export interface NuskaItems {
   panId: number;
   panName: string;
   items: Array<TestItems>;
   ball: number | null;
}

// EXPORTS
export interface ITest {
   id: number;
   panName: string;
   createDate: Date;
   endDate: Date;
   testItems: Array<TestItems>;
   // requestStatus?: number | null
}

export interface ITestList {
   id: number;
   name: string;
   panNumber: number;
   count: number;
   nuskaId: number;
   // nuska: null
   isOneTest: boolean;
   oneTestNumber: number;
   // questions: []
}

export interface ITest5 {
   id: number;
   createDate: Date;
   endDate: Date;
   items: Array<FiveItems>;
   // requestStatus?: number | null
}

export interface ITestTeacher {
   userTestId: number;
   state: boolean;
   comment: string | null;
   items: Array<TestItems>;
   // requestStatus?: number | null
}
