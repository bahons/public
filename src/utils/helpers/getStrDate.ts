// get date with format {DD.MM hh:mm}
export const getStrDate = (createDate: Date): string => {
   const date = new Date(createDate);

   if (isNaN(date.getTime())) return ""; // Дұрыс емес дата болса, бос жолды қайтарамыз

   const month = String(date.getMonth() + 1).padStart(2, "0"); // Айды форматтау
   const day = String(date.getDate()).padStart(2, "0"); // Күнді форматтау
   const hour = String(date.getHours()).padStart(2, "0"); // Сағатты форматтау
   const minutes = String(date.getMinutes()).padStart(2, "0"); // Минутты форматтау

   return `${day}.${month} ${hour}:${minutes}`;
};

// get date with format {DD.MM.YYYY}
export const getStrDate2 = (createDate: Date): string => {
   const date = new Date(createDate);

   if (isNaN(date.getTime())) return ""; // Дұрыс емес дата болса, бос жолды қайтарамыз

   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Айды форматтау
   const day = String(date.getDate()).padStart(2, "0"); // Күнді форматтау

   return `${day}.${month}.${year} ж`; // "ж" таңбасын қосамыз
};
