export const getTimer = (finishTime: Date) => {
   let now = new Date();
   let diff = new Date(finishTime).valueOf() - now.valueOf();

   if (diff <= 0) return null;

   let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
   let seconds = Math.floor((diff % (1000 * 60)) / 1000);

   // if (hours <= 0 && minutes <= 0 && seconds <= 0) return null;

   const minutesText = minutes < 10 ? `0${minutes}` : minutes;
   const secondsText = seconds < 10 ? `0${seconds}` : seconds;
   const timerText = hours !== 0 ? `${hours}:${minutesText}:${secondsText}` : `${minutesText}:${secondsText}`;

   return timerText;
};
