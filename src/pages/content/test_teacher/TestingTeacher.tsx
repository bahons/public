import React, { ChangeEvent, CSSProperties, useEffect } from "react";
import { Prompt, useHistory, useParams } from "react-router-dom";

import { BASE_URL_IMG } from "../../../utils/constants/base_url";
import { setTestAnswerItemsTeacher } from "../../../redux/slices/test_answer/testAnswer.slice";
import { startTimer } from "../../../redux/slices/timer.slice";

import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import { getReplacedQuesStr, getTd, limitHandler } from "../../../utils/helpers/testScript";
import "../../../customStyles/dashstyle.css";
import { FinishTestModal } from "../../../components/modals/FinishTestModal";
import { FinishTestTimeoutModal } from "../../../components/modals/FinishTestTimeoutModal";
import { finishTestTeacher } from "../../../redux/slices/test/actions/test.finish_actions";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { FinishTestButton } from "../../../components/buttons/FinishTestButton";
import { FinishTestLoader } from "../../../components/loaders/FinishTestLoader";
import { importContentScripts } from "../../../utils/helpers/importScript";

interface ParamTypes {
   testId: string;
}

export const TestingTeacher = () => {
   const { testId } = useParams<ParamTypes>();
   const { dataTeacher: testData, isLoading: loading, confirm } = useAppSelector((state) => state.test);
   const items = useAppSelector((state) => state.testAnswer.dataTeacher);

   const history = useHistory();

   const dispatch = useAppDispatch();

   useEffect(() => {
      confirm ? dispatch(startTimer({ panId: testData?.items[0].panId })) : history.push(`/TestWorkTeacher/${testId}`);
   }, [confirm]); // eslint-disable-next-line react-hooks/exhaustive-deps

   const checkFun = (e: ChangeEvent<HTMLInputElement>, checkedValue: string) => {
      if (limitHandler(e)) {
         const quesNumber = parseInt(e.target.name);
         let str = items.find((x) => x.ForId === quesNumber) ? items.find((x) => x.ForId === quesNumber)?.Otvet : "";

         str = checkedValue;

         dispatch(
            setTestAnswerItemsTeacher({
               Otvet: str,
               ForId: quesNumber,
            })
         );
      }
   };

   const testFinishHandler = () => dispatch(finishTestTeacher());

   return (
      <>
         <Prompt
            when={confirm}
            message={(_, action): string => {
               action === "POP" && history.go(1);
               return "точно баска бетке кеттің ба? Тест бітпеді ғой әлі?";
            }}
         />
         <>
            <ConfirmModal />
            <FinishTestModal testFinish={testFinishHandler} />
            <FinishTestTimeoutModal testFinish={testFinishHandler} />
            <div className="container-fluid">
               <div
                  className="db-breadcrumb"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
               >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                     <h4 className="breadcrumb-title">“Педагогика, оқыту әдістемесі”</h4>
                  </div>
                  <div>
                     <FinishTestButton />
                  </div>
               </div>

               <div style={{ overflowX: "auto" }}>
                  <table>
                     <tbody>
                        <tr>
                           {testData &&
                              testData.items.map((_, index) => (
                                 <td
                                    key={(index + 1).toString()}
                                    onClick={(e) => getTd(index + 1)}
                                    className="test-td-hover"
                                 >
                                    {index + 1}
                                 </td>
                              ))}
                        </tr>
                        <tr>
                           {testData &&
                              testData.items.map((item) => (
                                 <td key={"otv" + item.forId} id={"otv" + item.forId}>
                                    {items
                                       ? items.find((x) => x.ForId === item.forId)
                                          ? items.find((x) => x.ForId === item.forId)?.Otvet
                                          : ""
                                       : ""}
                                 </td>
                              ))}
                        </tr>
                     </tbody>
                  </table>
               </div>

               <br />

               <div className="test-pole">
                  {testData &&
                     testData.items.map((item, index) => {
                        // const type = (index + 1) > 25 ? "checkbox" : "radio";
                        const type = "radio";
                        let defaultCheckedValue: string | undefined = "";
                        if (items) {
                           defaultCheckedValue = items.find((x) => x.ForId === item.forId)
                              ? items.find((x) => x.ForId === item.forId)?.Otvet
                              : "";
                        }

                        let inputArr = [
                           { key: "A", value: item.a },
                           { key: "B", value: item.b },
                           { key: "C", value: item.c },
                           { key: "D", value: item.d },
                           { key: "E", value: item.e },
                        ];

                        return (
                           <div
                              className="quesWrap"
                              key={"quesWrap_" + (index + 1)}
                              id={"select" + (index + 1)}
                              style={{ display: index === 0 ? "block" : "none" }}
                           >
                              <a className="test-number" id="test-number">
                                 {index + 1} - сұрақ
                              </a>
                              {item.topUrl && (
                                 <>
                                    <br />
                                    <img src={BASE_URL_IMG + item.topUrl} style={imgStyle} alt="" />
                                 </>
                              )}
                              {item.name && (
                                 <p
                                    className="test-text"
                                    dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name) }}
                                 ></p>
                              )}
                              {item.buttomUrl && <img src={BASE_URL_IMG + item.buttomUrl} style={imgStyle} alt="" />}
                              {item.name2 && (
                                 <p
                                    className="test-text"
                                    dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name2) }}
                                 ></p>
                              )}

                              {inputArr.map((x, i) => (
                                 <div className="form_radion_btn" key={"radid" + (index + 1) + (i + 1)}>
                                    <input
                                       type={type}
                                       id={"radid" + (index + 1) + (i + 1)}
                                       value={i + 1}
                                       name={item.forId.toString()}
                                       onChange={(e) => checkFun(e, x.key)}
                                       defaultChecked={defaultCheckedValue?.includes(x.key)}
                                    />
                                    <label htmlFor={"radid" + (index + 1) + (i + 1)}>
                                       <span style={{ paddingRight: "10px" }}>{x.key} |</span>
                                       {item.panId === 17 ? (
                                          <span>{x.value}</span>
                                       ) : (
                                          <span dangerouslySetInnerHTML={{ __html: x.value }}></span>
                                       )}
                                    </label>
                                    <br />
                                 </div>
                              ))}
                           </div>
                        );
                     })}
               </div>
            </div>
            <FinishTestLoader loading={loading} />
         </>
      </>
   );
};

// imgStyle TEST
// const imgStyle : CSSProperties = {
//    width: 'auto',
//    maxWidth: '100%',

//    height: 'auto',
//    // minHeight: '100px',
//    // maxHeight: '35vh',
//    objectFit: 'contain'
// }

// imgStyle
const imgStyle: CSSProperties = {
   width: "auto",
   maxWidth: "350px",

   height: "auto",
   minHeight: "100px",
   maxHeight: "35vh",
   objectFit: "contain",
};
