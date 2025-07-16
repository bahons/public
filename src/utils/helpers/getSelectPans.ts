export interface PanList {
   id: number;
   panName: string;
}

interface ISelectedPanItem {
   key: number;
   pans: Array<PanList>;
}

const selectedPanItems: Array<ISelectedPanItem> = [
   {
      key: 1,
      pans: [
         { id: 8, panName: "Математика" },
         { id: 2, panName: "Биология" },
         { id: 15, panName: "Ағылшын" },
         { id: 10, panName: "Дүниежүзі тарихы" },
      ],
   },
   {
      key: 2,
      pans: [
         { id: 1, panName: "География" },
         { id: 3, panName: "Химия" },
      ],
   },
   {
      key: 3,
      pans: [
         { id: 2, panName: "Биология" },
         { id: 9, panName: "Физика" },
      ],
   },
   {
      key: 8,
      pans: [
         { id: 1, panName: "География" },
         { id: 9, panName: "Физика" },
         { id: 17, panName: "Информатика" },
      ],
   },
   {
      key: 9,
      pans: [
         { id: 3, panName: "Химия" },
         { id: 8, panName: "Математика" },
      ],
   },
   {
      key: 10,
      pans: [
         { id: 1, panName: "География" },
         { id: 15, panName: "Ағылшын" },
         { id: 11, panName: "Құқық негіздері" },
      ],
   },
   { key: 11, pans: [{ id: 10, panName: "Дүниежүзі тарихы" }] },
   { key: 12, pans: [{ id: 13, panName: "Қазақ әдебиеті" }] },
   { key: 13, pans: [{ id: 12, panName: "Қазақ тілі" }] },
   {
      key: 15,
      pans: [
         { id: 1, panName: "География" },
         { id: 10, panName: "Дүниежүзі тарихы" },
      ],
   },
   { key: 17, pans: [{ id: 8, panName: "Математика" }] },
   { key: 18, pans: [{ id: 19, panName: "Орыс әдебиеті" }] },
   { key: 19, pans: [{ id: 18, panName: "Орыс тілі" }] },
];

export const getPanList2 = (pan1: number): PanList[] | null => {
   const panList2 = selectedPanItems.find((x) => x.key === pan1)?.pans;

   return panList2 ? panList2 : null;
};
