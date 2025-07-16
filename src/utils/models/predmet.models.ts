interface IVideoLesson {
   dostupStatus: boolean;
   name: string;
   number: number;
   title: string | null;
   url: string;
   videoLessonGroup: null;
   videoLessonGroupId: number;
   vlId: string;
}
export interface IVideoGroup {
   id: number;
   name: string;
   openStatus: boolean;
   predmet: null;
   predmetId: number;
   stats: boolean;
   title: null;
   videoCount: number;
   videoLessons: IVideoLesson[];
}
export interface IPredmet {
   id: number;
   predmetName: string;
}
export interface IPredmetState {
   data: IPredmet[] | null;
   videoGroup: IVideoGroup[] | null;
   isLoading?: boolean;
}

export interface IVideo {
   vlId: string;
   name: string;
   number: number;
   title: null;
   dostupStatus: boolean;
   url: string;
   videoLessonGroup: null;
   videoLessonGroupId: number;
}
export interface IVideoLessonGroup {
   video: IVideo;
   items: Array<IVideo>;
}

export interface IVideoTest {
   number: number;
   name1: string | null;
   name3: string | null;
   url2: string | null;
   url4: string | null;
   a: string;
   b: string;
   c: string;
   d: string;
   e: string;
   f: string | null;
   g: string | null;
   h: string | null;
   succus: string | null;
   videoId: string;
}

export interface IVideoTestItem {
   Number: number;
   Otvet: string;
   Score?: number;
}
