interface OneItems {
   panName: string;
   createDate: Date;
   ball: number;
   id: number;
}
interface FiveItemsHistory {
   panName: string | null;
   createDate: Date;
   ball: number;
   id: number;
}

export interface OfficialItems extends FiveItemsHistory {
   status: boolean;
}
export interface ITestHistory {
   oneItems: Array<OneItems>;
   fiveItems: Array<FiveItemsHistory>;
   officalItems: Array<OfficialItems>;
}
