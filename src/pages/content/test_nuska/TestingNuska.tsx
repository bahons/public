import React, { CSSProperties, ChangeEvent, useEffect } from "react";
import { Prompt, useHistory, useParams } from "react-router-dom";

import { startTimer } from "../../../redux/slices/timer.slice";
import {
   changePanHandler,
   checkTestNuska,
   getReplacedQuesStr,
   getTd5,
   lfunc,
   limitHandler,
} from "../../../utils/helpers/testScript";
import { BASE_URL_NUSKA_IMG } from "../../../utils/constants/base_url";
import "../../../customStyles/dashstyle.css";
import { RootState } from "../../../redux/store";

import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import { FinishTestModal } from "../../../components/modals/FinishTestModal";
import { ErigishModal, MendeleevModal } from "../../../components/modals/MendeleevModal";
import { HelperDropdown } from "../../../components/buttons/HelperDropdown";
import { Calculator } from "../../../components/Calculator";
import { FinishTestTimeoutModal } from "../../../components/modals/FinishTestTimeoutModal";
import {
   setInitialTestAnswerItemsNuska,
   setTestAnswerItemsNuska,
} from "../../../redux/slices/test_answer/testAnswer.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { finishTestNuska } from "../../../redux/slices/test/actions/test.finish_actions";
import { FinishTestButton } from "../../../components/buttons/FinishTestButton";
import { FinishTestLoader } from "../../../components/loaders/FinishTestLoader";
import { TestInput } from "../../../components/input_test/TestInput";
import { importContentScripts } from "../../../utils/helpers/importScript";

interface Params {
   testId: string;
}

export const TestingNuska = () => {
   const { testId } = useParams<Params>();

   const { dataNuska: testData, isLoading: loading, confirm, dataType } = useAppSelector((state) => state.test);

   const testNuska = useAppSelector((state: RootState) => state.testAnswer.dataNuska);
   const dispatch = useAppDispatch();
   const history = useHistory();

   const checkFun = (e: ChangeEvent<HTMLInputElement>, panId: number, quesNumber: number, checkedValue: string) => {
      const answerItem = checkTestNuska(e, testNuska, panId, quesNumber, checkedValue);

      answerItem && dispatch(setTestAnswerItemsNuska(answerItem));
   };

   const checkFunOther = (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      otherIndex: number,
      panId: number,
      quesNumber: number,
      checkedValue: string,
      otherId: number
   ) => {
      lfunc(e, otherId);

      let str = testNuska.find((x) => x.PanId === panId)?.Items.find((x) => x.ForId === quesNumber)?.Otvet ?? "  ";

      str = str.slice(0, otherIndex) + checkedValue + str.slice(otherIndex + checkedValue.length);

      dispatch(
         setTestAnswerItemsNuska({
            panId: panId,
            otvet: str,
            forId: quesNumber,
         })
      );
   };

   const testFinishHandler = () => dispatch(finishTestNuska());

   useEffect(() => {
      const timeId = dataType === "week" ? testData?.items[0].panId : 55555;

      confirm ? dispatch(startTimer({ panId: timeId })) : history.push(`/TestWorkNuska/${testId}`);
   }, [confirm]); // eslint-disable-next-line react-hooks/exhaustive-deps

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
            <MendeleevModal />
            <ErigishModal />
            <Calculator />
            <div className="container-fluid">
               <div
                  className="db-breadcrumb"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
               >
                  <div style={{ display: "flex", alignItems: "center" }}>
                     <h4 className="breadcrumb-title breadcrumb-title-5">
                        {dataType === "week" ? testData?.items[0].panName : "Пән: "}
                     </h4>

                     {dataType === "nuska" && (
                        <select
                           className="form-control mr-1"
                           onChange={(e) => changePanHandler(parseInt(e.target.value))}
                        >
                           {testData &&
                              testData.items.map((item, index) => (
                                 <option key={item.panName} value={item.panId}>
                                    {item.panName}
                                 </option>
                              ))}
                        </select>
                     )}
                     {/* <div id="timer" style={{width: '185px'}}>{timer ? timer.time : 'Қалған уақыт...'}</div> */}
                  </div>
                  <div className="tools-wrap dropdown" style={{ paddingRight: "10px" }}>
                     <HelperDropdown />
                  </div>
                  <div>
                     <FinishTestButton />
                  </div>
               </div>
               <div className="tools-wrap-2 dropdown" style={{ marginBottom: "15px" }}>
                  <HelperDropdown />
               </div>
               <div style={{ overflowX: "auto" }}>
                  {testData?.items?.map((data, i) => (
                     <table
                        key={"dataTable_" + data.panId}
                        id={"dataTable_" + data.panId}
                        className="test-table"
                        style={{ display: i !== 0 ? "none" : "flex" }}
                     >
                        <tbody>
                           <tr>
                              {data.items.map((item, index) => (
                                 <td
                                    key={item.id + (index + 1).toString()}
                                    onClick={(e) => getTd5(data.panId, e.currentTarget.innerText)}
                                    className="test-td-hover"
                                 >
                                    {index + 1}
                                 </td>
                              ))}
                           </tr>
                           <tr>
                              {data.items.map((item) => {
                                 let tdValue =
                                    testNuska
                                       .find((x) => x.PanId === data.panId)
                                       ?.Items.find((x) => x.ForId === item.forId)?.Otvet ?? "";
                                 return (
                                    <td key={"otv" + item.id} id={"otv" + item.id}>
                                       {tdValue}
                                    </td>
                                 );
                              })}
                           </tr>
                        </tbody>
                     </table>
                  ))}
               </div>

               <br />

               {testData &&
                  testData.items.map((data, i) => (
                     <div
                        id={"data_" + data.panId}
                        key={"data_" + data.panId}
                        className="test-pole"
                        style={{ display: i !== 0 ? "none" : "block" }}
                     >
                        {data.items.map((item, index) => {
                           const type = index + 1 > 30 ? "checkbox" : "radio";
                           const quesWrapId = "select_" + data.panId + (index + 1);

                           let defaultCheckedValue: string =
                              testNuska.find((x) => x.PanId === data.panId)?.Items.find((x) => x.ForId === item.forId)
                                 ?.Otvet ?? "";

                           let other: string = index + 1 > 35 ? defaultCheckedValue : "";

                           let inputArr = [
                              { key: "A", value: item.a },
                              { key: "B", value: item.b },
                              { key: "C", value: item.c },
                              { key: "D", value: item.d },
                           ];
                           type === "checkbox" &&
                              inputArr.push({ key: "E", value: item.e }, { key: "F", value: item.f ?? "" });

                           return (
                              <div
                                 id={quesWrapId}
                                 key={quesWrapId}
                                 className="quesWrap"
                                 style={{ display: index === 0 ? "block" : "none" }}
                              >
                                 <p className="test-number">{index + 1} - сұрақ</p>
                                 {item.topUrl && (
                                    <>
                                       <br />
                                       <img src={BASE_URL_NUSKA_IMG + item.topUrl} style={imgStyle} alt="" />
                                    </>
                                 )}
                                 {item.name && (
                                    <p
                                       className="test-text"
                                       dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name) }}
                                    ></p>
                                 )}
                                 {item.buttomUrl && (
                                    <img src={BASE_URL_NUSKA_IMG + item.buttomUrl} style={imgStyle} alt="" />
                                 )}
                                 {item.name2 && (
                                    <p
                                       className="test-text"
                                       dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name2) }}
                                    ></p>
                                 )}

                                 {index + 1 < 36 &&
                                    inputArr.map((x, i) => (
                                       <TestInput
                                          id={"radid_" + data.panId + (index + 1) + (i + 1)}
                                          key={"radid_" + data.panId + (index + 1) + (i + 1)}
                                          value={item.forId}
                                          name={data.panId + "_" + item.forId}
                                          onChange={(e) => checkFun(e, data.panId, item.forId, x.key)}
                                          defaultChecked={defaultCheckedValue.includes(x.key)}
                                          type={type}
                                          {...{
                                             panId: data.panId,
                                             labelKey: x.key,
                                             labelValue: x.value,
                                          }}
                                       />
                                    ))}

                                 {item.other_35_40.length > 0 &&
                                    item.other_35_40.map((x, i) => {
                                       let optionArr = [
                                          { key: "A", value: x.a },
                                          { key: "B", value: x.b },
                                          { key: "C", value: x.c },
                                          { key: "D", value: x.d },
                                       ];

                                       return (
                                          <div className="form-group d-flex" key={"other_" + i}>
                                             <label style={{ display: "block", maxWidth: "30%" }}>
                                                <span dangerouslySetInnerHTML={{ __html: x.name ?? "" }}></span>
                                             </label>

                                             <ul
                                                className={
                                                   i === 0
                                                      ? `list-unstyled list-unstyled-0 list-unstyled-${x.id}`
                                                      : `list-unstyled list-unstyled-${x.id}`
                                                }
                                             >
                                                <li className="init d-flex justify-content-between align-items-center">
                                                   <span
                                                      dangerouslySetInnerHTML={{
                                                         __html:
                                                            optionArr.find((x) => x.key === other[i])?.value ??
                                                            "Таңдау",
                                                      }}
                                                   ></span>
                                                   <i className="fa fa-chevron-down"></i>
                                                </li>

                                                {optionArr.map((a) => (
                                                   <li
                                                      className={other[i] === a.key ? "selected" : ""}
                                                      key={a.key + i}
                                                      data-value={a.key}
                                                      onClick={(e) =>
                                                         checkFunOther(e, i, data.panId, item.forId, a.key, x.id)
                                                      }
                                                      dangerouslySetInnerHTML={{ __html: a.key + ") " + a.value }}
                                                   ></li>
                                                ))}
                                             </ul>
                                          </div>
                                       );
                                    })}
                              </div>
                           );
                        })}
                     </div>
                  ))}
            </div>
            <FinishTestLoader loading={loading} />
         </>
      </>
   );
};

// imgStyle
const imgStyle: CSSProperties = {
   width: "auto",
   maxWidth: "350px",

   height: "auto",
   minHeight: "100px",
   maxHeight: "35vh",
   objectFit: "contain",
};
