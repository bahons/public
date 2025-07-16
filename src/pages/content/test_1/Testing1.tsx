import React, { ChangeEvent, CSSProperties, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Prompt, useHistory, useParams } from "react-router-dom";

import { BASE_URL_IMG } from "../../../utils/constants/base_url";
import { setTestAnswerItems } from "../../../redux/slices/test_answer/testAnswer.slice";
import { startTimer } from "../../../redux/slices/timer.slice";

import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import { checkTest, getReplacedQuesStr, getTd } from "../../../utils/helpers/testScript";
import "../../../customStyles/dashstyle.css";
import { AppDispatch } from "../../../redux/store";
import { FinishTestModal } from "../../../components/modals/FinishTestModal";
import { ErigishModal, MendeleevModal } from "../../../components/modals/MendeleevModal";
import { HelperDropdown } from "../../../components/buttons/HelperDropdown";
import { Calculator } from "../../../components/Calculator";
import { FinishTestTimeoutModal } from "../../../components/modals/FinishTestTimeoutModal";
import { useAppSelector } from "../../../redux/redux";
import { finishTest } from "../../../redux/slices/test/actions/test.finish_actions";
import { FinishTestButton } from "../../../components/buttons/FinishTestButton";
import { FinishTestLoader } from "../../../components/loaders/FinishTestLoader";

interface ParamTypes {
   testId: string;
}

export const Testing1 = () => {
   const { testId } = useParams<ParamTypes>();

   const { data: testData, confirm, isLoading: loading } = useAppSelector((state) => state.test);
   const testItems = useAppSelector((state) => state.testAnswer.data);

   const dispatch = useDispatch<AppDispatch>();
   const history = useHistory();

   const checkFun = (e: ChangeEvent<HTMLInputElement>, checkedValue: string) => {
      const answerItem = checkTest(e, testItems, checkedValue);
      answerItem && dispatch(setTestAnswerItems(answerItem));
   };

   const testFinishHandler = () => dispatch(finishTest());

   useEffect(() => {
      confirm
         ? dispatch(startTimer({ panId: testData?.testItems[0].panId, testType: "one" }))
         : history.push(`/TestWork/${testId}`);
   }, [confirm]); // eslint-disable-next-line react-hooks/exhaustive-deps

   return (
      <>
         <Prompt
            when={confirm}
            message={(location, action): string => {
               action === "POP" && history.go(1);
               return "точно баска бетке кеттің ба? Тест бітпеді ғой әлі?";
            }}
         />
         <>
            <ConfirmModal />
            <FinishTestModal testFinish={testFinishHandler} />
            <FinishTestTimeoutModal testFinish={testFinishHandler} />
            <ErigishModal />
            <MendeleevModal />
            <Calculator />
            <div className="container-fluid">
               <div
                  className="db-breadcrumb"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
               >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                     <h4 className="breadcrumb-title">{testData && testData.panName}</h4>
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
                  <table>
                     <tbody>
                        <tr>
                           {testData &&
                              testData.testItems.map((_, index) => (
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
                              testData.testItems.map((item) => (
                                 <td key={"otv" + item.forId} id={"otv" + item.forId}>
                                    {testItems
                                       ? testItems.find((x) => x.ForId === item.forId)
                                          ? testItems.find((x) => x.ForId === item.forId)?.Otvet
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
                     testData.testItems.map((item, index) => {
                        const type = index + 1 > 25 ? "checkbox" : "radio";
                        let defaultCheckedValue: string | undefined = "";
                        if (testItems) {
                           defaultCheckedValue = testItems.find((x) => x.ForId === item.forId)
                              ? testItems.find((x) => x.ForId === item.forId)?.Otvet
                              : "";
                        }

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
                                    dangerouslySetInnerHTML={{
                                       __html: getReplacedQuesStr(item.name),
                                    }}
                                 ></p>
                              )}
                              {item.buttomUrl && <img src={BASE_URL_IMG + item.buttomUrl} style={imgStyle} alt="" />}
                              {item.name2 && (
                                 <p
                                    className="test-text"
                                    dangerouslySetInnerHTML={{
                                       __html: getReplacedQuesStr(item.name2),
                                    }}
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
