import React, { ChangeEvent, CSSProperties, useEffect } from "react";
import { Prompt, useHistory, useParams } from "react-router-dom";

import { setTestAnswerItems5 } from "../../../redux/slices/test_answer/testAnswer.slice";
import { startTimer } from "../../../redux/slices/timer.slice";
import { changePanHandler, checkTest5, getReplacedQuesStr, getTd5 } from "../../../utils/helpers/testScript";
import { BASE_URL_IMG } from "../../../utils/constants/base_url";

import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import { FinishTestModal } from "../../../components/modals/FinishTestModal";
import { ErigishModal, MendeleevModal } from "../../../components/modals/MendeleevModal";
import { HelperDropdown } from "../../../components/buttons/HelperDropdown";
import { Calculator } from "../../../components/Calculator";
import { FinishTestTimeoutModal } from "../../../components/modals/FinishTestTimeoutModal";
import { useAppDispatch, useAppSelector } from "../../../redux/redux";
import { finishTest5 } from "../../../redux/slices/test/actions/test.finish_actions";
import { FinishTestButton } from "../../../components/buttons/FinishTestButton";
import { FinishTestLoader } from "../../../components/loaders/FinishTestLoader";

import "../../../customStyles/dashstyle.css";
import { TestInput } from "../../../components/input_test/TestInput";
import { importContentScripts } from "../../../utils/helpers/importScript";

interface Params {
   fiveId: string;
}

export const TestingOffice = () => {
   const { fiveId } = useParams<Params>(); // fiveId

   const { data5: testData, confirm, isLoading: loading } = useAppSelector((state) => state.test);
   const test5 = useAppSelector((state) => state.testAnswer.data5);
   const dispatch = useAppDispatch();

   const history = useHistory();

   const checkFun = (e: ChangeEvent<HTMLInputElement>, testId: number, quesNumber: number, checkedValue: string) => {
      const answerItem = checkTest5(e, test5, testId, quesNumber, checkedValue);
      answerItem && dispatch(setTestAnswerItems5(answerItem));
   };

   const testFinishHandler = () => dispatch(finishTest5({ type: "office" }));

   useEffect(() => {
      confirm ? dispatch(startTimer({ panId: 555 })) : history.push(`/OfficeTestWork/${fiveId}`);
   }, [confirm]); // eslint-disable-next-line react-hooks/exhaustive-deps

   return (
      <>
         <Prompt
            when={confirm}
            message={(_, action): string => {
               action === "POP" && history.go(1);
               return "nonono";
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
                     <h4 className="breadcrumb-title breadcrumb-title-5">Пән: </h4>

                     <select className="form-control mr-1" onChange={(e) => changePanHandler(parseInt(e.target.value))}>
                        {testData &&
                           testData.items.map((item, index) => (
                              <option key={item.panName} value={item.panId}>
                                 {item.panName}
                              </option>
                           ))}
                     </select>
                     {/* <div id="timer">{timer ? timer.time : 'Қалған уақыт...'}</div> */}
                  </div>

                  <div className="tools-wrap dropdown" style={{ paddingRight: "10px" }}>
                     <HelperDropdown />
                  </div>

                  <div style={{ padding: "5px 20px" }}>
                     <FinishTestButton />
                  </div>
               </div>

               <div className="tools-wrap-2 dropdown" style={{ marginBottom: "15px" }}>
                  <HelperDropdown />
               </div>

               <div style={{ overflowX: "auto" }}>
                  {testData?.items.map((data, i) => (
                     <table
                        key={"dataTable_" + data.panId}
                        id={"dataTable_" + data.panId}
                        className="test-table"
                        style={{ display: i !== 0 ? "none" : "flex" }}
                     >
                        <tbody>
                           <tr>
                              {data.testItems.map((item, index) => (
                                 <td
                                    key={item.id + (index + 1).toString()}
                                    onClick={(e) => getTd5(data.panId, e.currentTarget.innerText)}
                                    className="test-td-hover"
                                 >
                                    {item.forId}
                                 </td>
                              ))}
                           </tr>
                           <tr>
                              {data.testItems.map((item) => (
                                 <td key={"otv" + item.id} id={"otv" + item.id}>
                                    {test5.find((x) => x.TestId === data.id)?.Items.find((x) => x.ForId === item.forId)
                                       ?.Otvet ?? ""}
                                 </td>
                              ))}
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
                        {data.testItems.map((item, index) => {
                           const type = index + 1 > 25 ? "checkbox" : "radio";

                           const defaultCheckedValue: string =
                              test5.find((x) => x.TestId === data.id)?.Items.find((x) => x.ForId === item.forId)
                                 ?.Otvet ?? "";

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
                                 className="quesWrap"
                                 key={"quesWrap_" + data.panId + (index + 1)}
                                 id={"select_" + data.panId + (index + 1)}
                                 style={{ display: index === 0 ? "block" : "none" }}
                              >
                                 <p className="test-number">{index + 1} - сұрақ</p>
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
                                    <TestInput
                                       id={"radid_" + data.panId + (index + 1) + (i + 1)}
                                       key={"radid_" + data.panId + (index + 1) + (i + 1)}
                                       value={item.forId}
                                       name={data.panId + "_" + item.forId}
                                       onChange={(e) => checkFun(e, data.id, item.forId, x.key)}
                                       defaultChecked={defaultCheckedValue.includes(x.key)}
                                       type={type}
                                       {...{
                                          panId: data.panId,
                                          labelKey: x.key,
                                          labelValue: x.value,
                                       }}
                                    />
                                 ))}
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
