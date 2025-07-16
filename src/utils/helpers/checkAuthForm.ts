export const checkLoginForm = (email: string, password: string): string | null => {
   // if (email.length < 4 || !email.includes("@")) {
   //    return "Email дұрыстап жазыңыз!";
   // }

   // Логин ретінде санды да қолданатын болған соң "@" проверканы алып тастау керек болды
   if (email.length < 4) {
      return "Логин дұрыстап жазыңыз!";
   }
   if (password.length < 4) {
      return "Құпиясөзді дұрыстап жазыңыз!";
   }
   return null;
};

export const checkRegisterForm = (
   fio: string,
   email: string,
   phone: string,
   password: string,
   passwordConfirm: string
): string | null => {
   if (fio.length < 7) {
      return "Аты-жөніңізді толық жазыңыз!";
   }
   if (email.length < 4 || !email.includes("@")) {
      return "Email дұрыстап жазыңыз!";
   }
   if (phone.split("").reduce((prev, x: string) => (x === "_" ? prev + 1 : prev), 0) > 0) {
      return "Телефон номер дұрыс емес!";
   }
   if (password.length < 6) {
      return "Құпиясөзді дұрыстап жазыңыз!";
   }
   if (password !== passwordConfirm) {
      return "Парольдер сәйкес келмейді!";
   }
   return null;
};
