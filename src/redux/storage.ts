export const getState = <T>(key: string): T | undefined => {
   try {
      const state = localStorage.getItem(key);
      if (!state) {
         return undefined;
      }
      return JSON.parse(state);
   } catch (e) {
      console.log(e);
      return undefined;
   }
};

export const setState = <T>(key: string, state: T) => {
   const stringState = JSON.stringify(state);

   localStorage.setItem(key, stringState);
};
export const removeState = (key: string) => {
   localStorage.removeItem(key);
};
