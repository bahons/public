import { ChangeEvent } from "react";
import {
   TestAnswerItem,
   TestAnswerItems5,
   TestAnswerItemsNuska,
} from "../../redux/slices/test_answer/testAnswer.interface";

// сұрақ ауыстыру
export const changeQues = (value: number) => {
   // console.log(value);
   document.querySelectorAll(".quesWrap").forEach((el) => {
      el.setAttribute("style", "display: none");
   });
   document.getElementById("select" + value)?.setAttribute("style", "display: block");
};

// сұрақ номерлерінің кестесіне арналған
export const getTd = (value: number) => {
   // console.log(value);
   for (let i = 0; i < document.getElementsByClassName("quesWrap").length; i++) {
      document.getElementsByClassName("quesWrap")[i].setAttribute("style", "display: none");
      document.getElementsByClassName("test-td-hover")[i].setAttribute("style", "background-color: none");
   }
   document.getElementsByClassName("test-td-hover")[value - 1].setAttribute("style", "background-color: aquamarine");
   document.getElementById("select" + value)?.setAttribute("style", "display: block");
};

// сұрақ номерлерінің кестесіне арналған / 5 пәндік тесттердің
export const getTd5 = (panId: number, value: string) => {
   document.querySelectorAll(".quesWrap").forEach((el) => {
      el.setAttribute("style", "display: none");
   });
   document.querySelectorAll(".test-td-hover").forEach((el) => {
      el.setAttribute("style", "background-color: none");
   });

   document.getElementById("select_" + panId + value)?.setAttribute("style", "display: block");
   document
      .getElementsByClassName("test-td-hover")
      [parseInt(value) - 1]?.setAttribute("style", "background-color: aquamarine");
};

// пән ауыстыру
export const changePanHandler = (panId: number) => {
   document.querySelectorAll(".test-table, .test-pole").forEach((el) => {
      el.setAttribute("style", "display: none");
   });

   document.getElementById("data_" + panId)?.setAttribute("style", "display: block");
   document.getElementById("select_" + panId + 1)?.setAttribute("style", "display: block");
   document.getElementById("dataTable_" + panId)?.setAttribute("style", "display: flex");
};

// 3 жауаптық сұрақтардың жауабын белгілеуге лимит қою
export const limitHandler = (e: ChangeEvent<HTMLInputElement>) => {
   const limit = 3;
   const currentInput = e.target as HTMLInputElement; // Кастингті осында тікелей қолдану
   const allInputs = document.getElementsByName(e.target.name); // Барлық input элементтерін алу

   let checkedCount = 0;

   allInputs.forEach((item) => {
      if ((item as HTMLInputElement).checked) {
         checkedCount++;
      }
   });

   if (checkedCount > limit) {
      currentInput.checked = false;
      return false;
   }
   return true;
};

export const checkTest = (e: ChangeEvent<HTMLInputElement>, testItems: TestAnswerItem[], checkedValue: string) => {
   if (!limitHandler(e)) return null;

   const isChecked = e.target.checked;
   const quesNumber = parseInt(e.target.name);

   let str = testItems.find((x) => x.ForId === quesNumber)?.Otvet ?? "";

   // Егер quesNumber 25-тен аз немесе тең болса, жауап тек бір checkedValue болады
   str = quesNumber <= 25 ? checkedValue : isChecked ? str + checkedValue : str.replace(checkedValue, "");

   return {
      Otvet: str,
      ForId: quesNumber,
   };
};

export const checkTest5 = (
   e: ChangeEvent<HTMLInputElement>,
   test5: TestAnswerItems5[],
   testId: number,
   quesNumber: number,
   checkedValue: string
) => {
   if (!limitHandler(e)) return null;

   const isChecked = e.target.checked;
   const fiveItem = test5.find((x) => x.TestId === testId);

   if (!fiveItem) return null;

   let str = fiveItem?.Items.find((x) => x.ForId === quesNumber)?.Otvet ?? "";

   // Егер quesNumber 25-тен аз немесе тең болса, жауап тек бір checkedValue болады
   str = quesNumber <= 25 ? checkedValue : isChecked ? str + checkedValue : str.replace(checkedValue, "");

   return {
      testId: testId,
      panId: fiveItem.PanId,
      otvet: str,
      forId: quesNumber,
   };
};

export const checkTestNuska = (
   e: ChangeEvent<HTMLInputElement>,
   testNuska: TestAnswerItemsNuska[],
   panId: number,
   quesNumber: number,
   checkedValue: string
) => {
   if (!limitHandler(e)) return null;

   const isChecked = e.target.checked; // isInputChecked | bool

   let str = testNuska.find((x) => x.PanId === panId)?.Items.find((x) => x.ForId === quesNumber)?.Otvet ?? "";

   str = quesNumber <= 30 ? checkedValue : isChecked ? str + checkedValue : str.replace(checkedValue, "");

   return {
      panId: panId,
      otvet: str,
      forId: quesNumber,
   };
};

// тест сұрақтарындағы абзац үшін
export const getReplacedQuesStr = (str: string): string => {
   if (!str.includes("**")) return str;
   return getReplacedQuesStr(str.replace("**", "<br/>"));
};

export const lfunc = (e: React.MouseEvent<HTMLLIElement>, otherId: number) => {
   let allOptions = document.querySelectorAll("ul.list-unstyled-" + otherId + " li:not(.init)");

   const currentLi = e.currentTarget;
   const currentInit: any = document.querySelector("ul.list-unstyled-" + otherId + " > .init > span");

   if (!currentLi.classList.contains("selected")) {
      for (let i = 0; i < allOptions.length; i++) {
         allOptions[i].classList.remove("selected");
      }
      currentLi?.classList.add("selected"); // $(this).addClass('selected');
      currentInit.innerText = currentLi.innerHTML;

      for (let i = 0; i < allOptions.length; i++) {
         allOptions[i].setAttribute("style", "display: none;");
      }
   }
};

export const getInputColor = (succes: string | null, otvet: string | null, value: string, hasAnaliz?: boolean) => {
   const colors = {
      correct: "#4cbd79", // дұрыс жауап
      wrongSelected: "#ff2b35", // Белгіленген қате жауап
      correctSelected: "#cdbb18", // Белгіленген дұрыс жауап
      default: "#333",
   };

   if (otvet?.includes(value)) {
      return succes?.includes(value) ? colors.correctSelected : colors.wrongSelected;
   }
   if (!hasAnaliz && succes?.includes(value)) {
      return colors.correct;
   }
   if (hasAnaliz || !succes) {
      return colors.default;
   }
   return succes.includes(value) ? colors.correct : colors.default;
};
