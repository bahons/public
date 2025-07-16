import React, { CSSProperties, useState } from "react";

let total: number = 0;
let currCalc = "",
   currNumber: string | number = "";
// prevOperator : "+" | "-" | "/" | "*" | "\u221A" | "%" | undefined,

export const Calculator = () => {
   // const [total, setTotal] = useState<number>(0);
   // const [prevDecimal, setPrevDecimal] = useState<boolean>(false);
   const [prevOperator, setPrevOperator] = useState<
      "+" | "-" | "/" | "*" | "\u221A" | "%" | "1/x" | "x^2" | undefined
   >();
   // const [currNumber, setCurrNumber] = useState<string| number>("");

   // Store screens
   let numberScreen = document.getElementById("numberscreen");
   let calcScreen = document.getElementById("calcscreen");

   // Store buttons by ID
   let equals = document.getElementById("equals");
   let perc = document.getElementById("perc");
   let oneDivide = document.getElementById("onedivide");
   let square = document.getElementById("square");
   let squareRoot = document.getElementById("squareroot");
   let c = document.getElementById("c");
   let ce = document.getElementById("ce");
   let plusMinus = document.getElementById("±");

   // Bind event to equals, c, square root, plus minus,
   // ce buttons
   if (equals) equals.onclick = sum;
   // if(equals) equals.addEventListener('click', sum);
   if (c) c.onclick = clearAll;
   if (ce) ce.onclick = clearCurrNumber;

   if (perc) perc.onclick = percent;
   if (oneDivide) oneDivide.onclick = calcOneDivide;
   if (square) square.onclick = calcSquare;
   if (squareRoot) squareRoot.onclick = calcSquareRoot;
   if (plusMinus) plusMinus.onclick = togglePlusMinus;

   function numberPressed(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      let currVal = e.currentTarget.getAttribute("data-func")?.valueOf();
      let stringNum = currNumber.toString();

      let numScr = (numberScreen as HTMLInputElement).value;

      // console.log();

      if (numScr === "0") {
         if (currVal === ".") {
            if (!numScr.includes(".")) {
               stringNum += currVal;
            }
         } else {
            stringNum = currVal as string;
         }
      } else {
         if (currVal === ".") {
            if (numScr.length > 0 && !numScr.includes(".")) {
               stringNum += currVal;
            }
         } else {
            stringNum += currVal;
         }
      }

      currNumber = stringNum;
      if (numberScreen) (numberScreen as HTMLInputElement).value = stringNum;
   }

   // Does calculation when operator pressed
   function operatorPressed(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      let operator: "+" | "-" | "/" | "*" | "\u221A" | "%" | "1/x" | "x^2" = e.currentTarget.getAttribute(
         "data-func"
      ) as "+" | "-" | "/" | "*" | "\u221A" | "%" | "1/x" | "x^2";

      total = prevOperator ? findSum[prevOperator](total, currNumber as number) : (currNumber as number);
      setPrevOperator(operator);

      if ((currNumber as string).length === 0) {
         currCalc = currCalc.replace(currCalc[currCalc.length - 2], operator);
      } else {
         if (currCalc.length === 0) {
            currCalc += parseFloat(currNumber as string) + " " + operator + " ";
         } else {
            currCalc = total + " " + operator + " ";
         }
      }
      (calcScreen as HTMLInputElement).value = currCalc;

      // Reset number screen and curr number
      (numberScreen as HTMLInputElement).value = "";
      currNumber = "";
   }

   // Show total in screen when equals is pressed
   function sum() {
      if (prevOperator) {
         total = findSum[prevOperator](
            parseFloat(total.toString()),
            parseFloat(currNumber as string) as number
         ) as number;
      }
      resetValues();
   }
   function percent() {
      if (prevOperator === "*") {
         total = findSum["%"](parseFloat(total.toString()), parseFloat(currNumber as string) as number) as number;
         resetValues();
      } else {
         sum();
      }
   }
   // Calculate square root
   function calcSquareRoot() {
      // if (typeof currNumber == "number" ) {
      // Convert number to array to check if it's negative
      var stringNum = currNumber.toString();
      var arrNum = stringNum.split("");

      // If number is negative, do not calculate
      if (arrNum[0] === "-") {
         console.log("Square root of negative number does not exists");
      } else {
         const val = (numberScreen as HTMLInputElement)?.value;
         total = findSum["√"](val.includes(".") ? parseFloat(val) : parseInt(val));

         // Display total and reset values
         resetValues();
      }
      // }
   }
   function calcSquare() {
      // if (typeof currNumber == "number" ) {
      const val = (numberScreen as HTMLInputElement)?.value;
      total = findSum["x^2"](val.includes(".") ? parseFloat(val) : parseInt(val));

      // Display total and reset values
      resetValues();
      // }
   }
   function calcOneDivide() {
      if (currNumber !== "0") {
         // if (typeof currNumber == "number" && currNumber !== 0) {
         const val = (numberScreen as HTMLInputElement)?.value;
         total = findSum["1/x"](val.includes(".") ? parseFloat(val) : parseInt(val));

         // Display total and reset values
         resetValues();
      }
   }

   // Toggle a plus or minus in front of number
   function togglePlusMinus() {
      if (currNumber !== "0") {
         var stringNum = currNumber.toString();
         var arrNum = stringNum.split("");

         // Toggle between - and no -
         if (arrNum[0] === "-") {
            arrNum.shift();
         } else {
            arrNum.unshift("-");
         }
         stringNum = arrNum.join("");
         currNumber = parseFloat(stringNum);

         // Show current number on number screen
         (numberScreen as HTMLInputElement).value = stringNum;
      }
   }

   // Object that includes all operators on calclator
   let findSum = {
      "+": function (a: number, b: number) {
         return a + b;
      },
      "-": function (a: number, b: number) {
         return a - b;
      },
      "/": function (a: number, b: number) {
         return a / b;
      },
      "*": function (a: number, b: number) {
         return a * b;
      },
      "%": function (a: number, b: number) {
         return a * (b / 100);
      },
      "√": function (a: number) {
         return Math.sqrt(a);
      },
      "1/x": function (a: number) {
         return 1 / a;
      },
      "x^2": function (a: number) {
         return a * a;
      },
   };

   function deleterPressed() {
      let strCurrNum: string = currNumber.toString();
      currNumber = strCurrNum.replace(strCurrNum[strCurrNum.length - 1], "");

      (numberScreen as HTMLInputElement).value = currNumber as string;
   }

   function clearAll() {
      total = 0;
      // Reset screen values
      resetValues();
   }

   // Clear current number from numberScreen
   function clearCurrNumber() {
      currNumber = "";
      (numberScreen as HTMLInputElement).value = currNumber;
   }

   function resetValues() {
      // Reset current calc and current number
      currCalc = "";
      // currNumber = "";
      currNumber = total;

      // Reset calc screen
      (calcScreen as HTMLInputElement).value = currCalc;

      (numberScreen as HTMLInputElement).value = total.toString();
      setPrevOperator(undefined);
   }

   return (
      <div id="geo-calculator" style={{ display: "none" }}>
         <div className="calc-container bg-light" style={containerStyle}>
            <div className="modal-header p-0 mb-2" style={{ borderBottom: "none" }}>
               {/* <h4 className="modal-title" id="mendeleevModalLabel">Калькулятор</h4> */}
               <h6 className="modal-title">Калькулятор</h6>
               <button
                  type="button"
                  className="close"
                  onClick={() => {
                     const el = document.getElementById("geo-calculator");
                     if (el?.style.display !== "none") el?.setAttribute("style", "display:none;");
                     else el?.setAttribute("style", "display:block;");
                  }}
               >
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div className="bg-inverse" style={calcWrapStyle}>
               <div className="input-group input-group-sm col-xs-12 p-a-0">
                  <input
                     className="col-xs-12 form-control text-right"
                     id="calcscreen"
                     type="text"
                     disabled
                     style={{ ...inputStyle, ...{ height: 28, marginBottom: "4px" } }}
                  />
               </div>
               <div className="input-group input-group-lg col-xs-12 p-a-0 mb-2">
                  <input
                     className="form-control text-right"
                     id="numberscreen"
                     type="text"
                     disabled
                     style={inputStyle}
                  />
               </div>

               <div className="col-xs-7 m-t-2  button-wrap">
                  <button className="btn brown gradient" id="perc">
                     %
                  </button>
                  {/* <button className="btn brown gradient operator" onClick={(e) => operatorPressed(e)} data-func="%">%</button> */}
                  <button className="btn brown gradient" id="ce">
                     CE
                  </button>
                  <button className="btn brown gradient" id="c">
                     C
                  </button>
                  <button className="btn brown gradient" onClick={() => deleterPressed()}>
                     &lt;
                  </button>
               </div>

               <div className="col-xs-5 button-wrap">
                  <button className="btn gradient brown" id="onedivide" data-func="1/x">
                     1/x
                  </button>
                  <button className="btn gradient brown" id="square" data-func="x^2">
                     x²
                  </button>
                  <button className="btn gradient brown" id="squareroot" data-func="√">
                     √x
                  </button>
                  <button className="btn gradient brown operator" onClick={(e) => operatorPressed(e)} data-func="/">
                     /{" "}
                  </button>
               </div>

               <div className="col-xs-7">
                  <div className="button-wrap">
                     {[7, 8, 9].map((item) => (
                        <button key={item} className="btn black" data-func={item} onClick={(e) => numberPressed(e)}>
                           {item}
                        </button>
                     ))}
                     <button className="btn gradient brown operator" onClick={(e) => operatorPressed(e)} data-func="*">
                        X
                     </button>
                  </div>

                  <div className="button-wrap">
                     {[4, 5, 6].map((item) => (
                        <button key={item} className="btn black" data-func={item} onClick={(e) => numberPressed(e)}>
                           {item}
                        </button>
                     ))}
                     <button className="btn gradient brown operator" onClick={(e) => operatorPressed(e)} data-func="-">
                        -
                     </button>
                  </div>

                  <div className="button-wrap">
                     {[1, 2, 3].map((item) => (
                        <button key={item} className="btn black" data-func={item} onClick={(e) => numberPressed(e)}>
                           {item}
                        </button>
                     ))}
                     <button className="btn gradient brown operator" onClick={(e) => operatorPressed(e)} data-func="+">
                        +
                     </button>
                  </div>

                  <div className="button-wrap">
                     <button className="btn black" id="±">
                        {" "}
                        ±
                     </button>
                     <button className="btn black" data-func="0" onClick={(e) => numberPressed(e)}>
                        0
                     </button>
                     <button className="btn black" data-func="." onClick={(e) => numberPressed(e)}>
                        .
                     </button>
                     <button className="btn gradient purple" id="equals" data-func="=">
                        =
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

const containerStyle: CSSProperties = {
   padding: 10,
   // backgroundColor: '#eee',
   boxShadow: "0 0 10px #aaa",
   borderRadius: "4px",
   position: "absolute",
   right: 15,
   bottom: 15,
   zIndex: 99999,
};

const calcWrapStyle: CSSProperties = {
   width: 250,
   // backgroundColor: 'gray',
};
const inputStyle: CSSProperties = {
   // border: '2px solid gray',
   backgroundColor: "white",
   borderRadius: "3px",
   border: "none",
   outline: "none",
   boxShadow: "0 0 5px #ccc",
};
