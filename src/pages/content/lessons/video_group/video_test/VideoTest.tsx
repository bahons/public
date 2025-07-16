import React, { ChangeEvent, useState } from "react";

import { changeQues, limitHandler } from "../../../../../utils/helpers/testScript";
import { BASE_URL, BASE_URL_IMG } from "../../../../../utils/constants/base_url";
import { VideoTestSuccess } from "./VideoTestSuccess";
import { VideoTestNotSuccess } from "./VideoTestNotSuccess";
import { useAppSelector } from "../../../../../redux/redux";
import { IVideoLessonGroup, IVideoTest, IVideoTestItem } from "../../../../../utils/models/predmet.models";

type Props = {
   predmetId: string;
   videoId: string;
   videoLessonGroup: IVideoLessonGroup | null | undefined;
   videoTest: IVideoTest[];
};

export const VideoTest = (props: Props) => {
   const [isTestEnd, setIsTestEnd] = useState<boolean>(false);
   const [isTestSuccess, setIsTestSuccess] = useState<boolean>(false);
   const [totalBall, setTotalBall] = useState<number>(0);

   const [testItems, setTestItems] = useState<IVideoTestItem[]>([]);

   const authUserId = useAppSelector((state) => state.auth.data?.userId);

   const checkTest = (number: number, otvet: string) => {
      const success = props.videoTest.find((x) => x.number === number)?.succus ?? "";

      if (number <= 8) return success === otvet ? 1 : 0;

      let count = 0;
      if (success?.length === 1) {
         if (otvet.length === 1) {
            return success.includes(otvet) ? 2 : 0;
         }
         if (otvet.length === 2) {
            otvet.split("").map((x) => {
               count += success.includes(x) ? 1 : 0;
            });
            return count === 1 ? 1 : 0;
         }
         return count;
      }
      if (success?.length === 2) {
         if (otvet.length === 1) {
            return success.includes(otvet) ? 1 : 0;
         }
         if (otvet.length === 2) {
            otvet.split("").map((x) => {
               count += success.includes(x) ? 1 : 0;
            });
            return count;
         }
         if (otvet.length === 3) {
            otvet.split("").map((x) => {
               count += success.includes(x) ? 1 : 0;
            });
            return count === 2 ? 1 : 0;
         }
      }
      if (success?.length === 3) {
         if (otvet.length === 2) {
            otvet.split("").map((x) => {
               count += success.includes(x) ? 1 : 0;
            });
            return count === 2 ? 1 : 0;
         }
         if (otvet.length === 3) {
            otvet.split("").map((x) => {
               count += success.includes(x) ? 1 : 0;
            });
            // console.log('count = ' + count);

            if (count === 3) return 2;
            if (count === 2) return 1;
            return 0;
         }
         return count;
      }
      return count;
   };

   const checkTestHandler = async () => {
      testItems.length !== 0 &&
         testItems.map((x) => {
            x.Score = checkTest(x.Number, x.Otvet);
         });
      const userTotalBall = testItems.reduce((prev, { Score }) => (Score ? prev + Score : prev), 0);
      setTotalBall(userTotalBall);

      console.log("totalBall = " + userTotalBall);

      if (userTotalBall > 9) {
         try {
            await fetch(`${BASE_URL}/api/kurs/vtresult`, {
               method: "POST",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  UserId: authUserId,
                  PredmetId: props.predmetId,
                  VideoId: props.videoId ? props.videoId : props.videoLessonGroup?.video.vlId,
                  // "VideoId": nextVideoId
               }),
            })
               .then((response) => {
                  if (response.ok) {
                     return response.json();
                  }
                  throw new Error("*** Error checkTestHandler() Response not ok ***");
               })
               .then((result) => {
                  console.log(result);
                  if (result) {
                     setIsTestEnd(true);
                     setIsTestSuccess(true);
                  }
               });
         } catch (e) {
            console.log(e);
         }
      } else {
         setIsTestSuccess(false);
         setIsTestEnd(true);
      }
   };

   const checkFun = (e: ChangeEvent<HTMLInputElement>, checkedValue: string, quesNumber: number) => {
      if (limitHandler(e)) {
         let str = testItems.find((x) => x.Number === quesNumber)?.Otvet ?? "";

         if (quesNumber <= 8) {
            str = checkedValue;
         } else {
            if (e.target.checked) {
               str += checkedValue;
            } else {
               for (let i = 0; i < str.length; i++) {
                  if (str[i] === checkedValue) str = str.replace(str[i], "");
               }
            }
         }

         return setTestItems((state) => {
            if (state.find((x) => x.Number === quesNumber)) {
               state.map((x) => {
                  x.Otvet = x.Number === quesNumber ? str : x.Otvet;
               });
               return state;
            } else {
               return [
                  ...state,
                  {
                     Number: quesNumber,
                     Otvet: str,
                  },
               ];
            }
         });
      }
   };

   return !isTestEnd ? (
      <div>
         {props.videoTest.map((item) => {
            let valueArr = [
               { key: "A", value: item.a },
               { key: "B", value: item.b },
               { key: "C", value: item.c },
               { key: "D", value: item.d },
            ];
            const type = item.number > 8 ? "checkbox" : "radio";
            type === "checkbox" && valueArr.push({ key: "E", value: item.e ?? "" }, { key: "F", value: item.f ?? "" });
            return (
               <div
                  className="quesWrap"
                  key={"quesWrap_" + item.number}
                  id={"select" + item.number}
                  style={{ display: item.number === 1 ? "block" : "none" }}
               >
                  <p className="d-flex justify-content-between">
                     <a className="test-number">{item.number} - сұрақ</a>
                     {item.number === 10 && (
                        <button className="btn" onClick={() => checkTestHandler()}>
                           Тестті аяқтау
                        </button>
                     )}
                  </p>
                  {item.url2 && (
                     <p>
                        <br />
                        <img
                           src={BASE_URL_IMG + item.url2}
                           style={{
                              minHeight: "25vh",
                              maxHeight: "50vh",
                              width: "auto",
                              maxWidth: "100%",
                              objectFit: "contain",
                           }}
                           alt=""
                        />
                     </p>
                  )}
                  {item.name1 && <p className="test-text" dangerouslySetInnerHTML={{ __html: item.name1 }}></p>}
                  {item.url4 && (
                     <img
                        src={BASE_URL_IMG + item.url4}
                        style={{
                           minHeight: "25vh",
                           maxHeight: "50vh",
                           width: "auto",
                           maxWidth: "100%",
                        }}
                        alt=""
                     />
                  )}
                  {item.name3 && <p className="test-text">{item.name3}</p>}

                  {valueArr.map((x, i) => (
                     <div key={"form_radion_btn" + x.key} className="form_radion_btn">
                        <input
                           type={type}
                           id={"radidd" + item.number + (i + 1)}
                           value={i + 1}
                           name={"ques_" + item.number}
                           onChange={(e) => checkFun(e, x.key, item.number)}
                        />
                        <label htmlFor={"radidd" + item.number + (i + 1)}>
                           <span style={{ paddingRight: "10px" }}>{x.key} |</span>
                           <span dangerouslySetInnerHTML={{ __html: x.value }}></span>
                        </label>
                        <br />
                     </div>
                  ))}

                  <div className="d-flex w-100 justify-content-between">
                     {item.number > 1 && (
                        <button className="btn brown mr-2" onClick={() => changeQues(item.number - 1)}>
                           <i className="fa fa-arrow-left mr-2"></i>
                           Артқа
                        </button>
                     )}
                     {item.number < 10 && (
                        <button className="btn" onClick={() => changeQues(item.number + 1)}>
                           Келесі
                           <i className="fa fa-arrow-right ml-2"></i>
                        </button>
                     )}
                  </div>
               </div>
            );
         })}
      </div>
   ) : isTestSuccess ? (
      <VideoTestSuccess ball={totalBall} predmetId={parseInt(props.predmetId)} />
   ) : (
      <VideoTestNotSuccess ball={totalBall} {...{ setIsTestEnd, setTestItems }} />
   );
};
