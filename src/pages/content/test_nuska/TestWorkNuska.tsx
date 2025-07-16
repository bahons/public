import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BASE_URL_NUSKA_IMG } from "../../../utils/constants/base_url";
import { RootState } from "../../../redux/store";
import { changePanHandler, getInputColor, getReplacedQuesStr, getTd5 } from "../../../utils/helpers/testScript";
import { TestInput } from "../../../components/input_test/TestInput";

export const TestWorkNuska = () => {
   const [activePan, setActivePan] = useState<number | null>(null);

   const { dataType } = useSelector((state: RootState) => state.test);
   const testData = useSelector((state: RootState) => state.testWork.dataWorkNuska);

   const history = useHistory();

   useEffect(() => {
      testData ? setActivePan(testData.items[0].panId) : history.push("/");
   }, []);

   return (
      <div className="container-fluid">
         <div className="db-breadcrumb err-breadcrumb">
            <div style={{ display: "flex", alignItems: "center" }}>
               <h4 className="breadcrumb-title">
                  {/* Пән: */}
                  {dataType === "week" ? testData?.items[0].panName : "Пән: "}
               </h4>

               {dataType === "nuska" && (
                  <select
                     className="form-control"
                     onChange={(e) => {
                        setActivePan(parseInt(e.target.value));
                        changePanHandler(parseInt(e.target.value));
                     }}
                  >
                     {testData &&
                        testData.items.map((item) => (
                           <option key={item.panName} value={item.panId}>
                              {item.panName}
                           </option>
                        ))}
                  </select>
               )}
            </div>
            <h5 style={{ margin: 0 }}>Қатемен жұмыс</h5>
         </div>
         {testData && (
            <div className="total_analiz_wrap" style={{ display: dataType === "nuska" ? "flex" : "block" }}>
               <div>
                  <h4 className="ball-h4">
                     <span>Жинаған балыңыз: </span>
                     <span style={{ color: "mediumseagreen" }}>{testData.ball} - балл</span>
                  </h4>

                  {dataType === "nuska" &&
                     testData.items.map((item) => (
                        <h6 key={item.panId + "ball" + item.ball}>
                           <span>{item.panName}: </span>
                           <span style={{ color: item.ball !== 0 ? "mediumseagreen" : "#111" }}>{item.ball}</span>
                        </h6>
                     ))}
               </div>
               <div className="analiz_wrap" style={{ marginLeft: dataType === "nuska" ? "auto" : "0" }}>
                  <h4>Анализ нәтижесі</h4>
                  <div className="analiz">
                     {testData.items
                        .find((x) => x.panId === activePan)
                        ?.items.map(
                           (item) =>
                              item.questionTopik &&
                              item.otvet !== item.succes && (
                                 <span key={"questopik_" + item.forId}>
                                    {item.forId + ". " + item.questionTopik}
                                    <br />
                                 </span>
                              )
                        )}
                  </div>
               </div>
            </div>
         )}
         <div style={{ overflowX: "auto" }}>
            {testData &&
               testData.items.map((data, i) => (
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
                                 {item.forId}
                              </td>
                           ))}
                        </tr>
                        <tr>
                           {data.items.map((item) => {
                              const arr = item.otvet?.split("") ?? [];

                              return (
                                 <td key={"otv" + item.id} id={"otv" + item.id}>
                                    {arr.length > 0 &&
                                       arr.map((x, i) => {
                                          return item.forId > 35 ? (
                                             <span
                                                key={data.panId + "arr" + item.other_35_40[i].id}
                                                style={{
                                                   color:
                                                      item.other_35_40[i].otvet === item.other_35_40[i].succes
                                                         ? "#cdbb18"
                                                         : "#ff2b35",
                                                }}
                                             >
                                                {x}
                                             </span>
                                          ) : (
                                             <span
                                                key={data.panId + "arr" + x + item.forId}
                                                style={{ color: getInputColor(item.succes, item.otvet, x, true) }}
                                             >
                                                {x}
                                             </span>
                                          );
                                       })}
                                    <span>({item.itemBall})</span>
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
                           key={"select_" + data.panId + (index + 1)}
                           id={"select_" + data.panId + (index + 1)}
                           style={{ display: index === 0 ? "block" : "none" }}
                        >
                           <a className="test-number" id="test-number">
                              {index + 1} - сұрақ
                           </a>
                           {item.questionTopik && (
                              <a className="test-number analiz_title" style={{ background: "#eef" }}>
                                 {item.questionTopik}
                              </a>
                           )}
                           {item.topUrl && (
                              <>
                                 <br />
                                 <img
                                    src={BASE_URL_NUSKA_IMG + item.topUrl}
                                    style={{
                                       minHeight: "25vh",
                                       maxHeight: "50vh",
                                       width: "auto",
                                       maxWidth: "100%",
                                       objectFit: "contain",
                                    }}
                                    alt=""
                                 />
                              </>
                           )}
                           {item.name && (
                              <p
                                 className="test-text"
                                 dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name) }}
                              ></p>
                           )}
                           {item.buttomUrl && (
                              <img
                                 src={BASE_URL_NUSKA_IMG + item.buttomUrl}
                                 style={{ minHeight: "25vh", maxHeight: "50vh", width: "auto", maxWidth: "100%" }}
                                 alt=""
                              />
                           )}
                           {item.name2 && (
                              <p
                                 className="test-text"
                                 dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name2) }}
                              ></p>
                           )}

                           {index + 1 < 36 &&
                              inputArr.map((x, i) => {
                                 const color = getInputColor(item.succes, item.otvet, x.key, true);
                                 return (
                                    <TestInput
                                       id={"radid_" + data.panId + (index + 1) + (i + 1)}
                                       key={"radid_" + data.panId + (index + 1) + (i + 1)}
                                       value={i + 1}
                                       name={data.panId + "_" + item.forId}
                                       {...{ panId: data.panId, labelKey: x.key, labelValue: x.value, color }}
                                       disabled
                                    />
                                 );
                              })}

                           {item.other_35_40 &&
                              item.other_35_40.length > 0 &&
                              item.other_35_40.map((x, i) => {
                                 let optionArr = [
                                    { key: "A", value: x.a },
                                    { key: "B", value: x.b },
                                    { key: "C", value: x.c },
                                    { key: "D", value: x.d },
                                 ];
                                 const ov = optionArr.find((a) => a.key === x.otvet);
                                 const ovv: string = ov && ov.value != null ? ov.value : "Таңдау";

                                 return (
                                    <div className="form-group d-flex" key={"other_" + i}>
                                       <label
                                          style={{ display: "block", maxWidth: "30%" }}
                                          dangerouslySetInnerHTML={{ __html: x.name ? x.name : "" }}
                                       ></label>

                                       <ul
                                          className={
                                             i === 0
                                                ? "list-unstyled list-unstyled-0 " + "list-unstyled-" + x.id
                                                : "list-unstyled " + "list-unstyled-" + x.id
                                          }
                                       >
                                          <li
                                             className="init d-flex justify-content-between align-items-center"
                                             style={{
                                                borderColor: x.otvet
                                                   ? x.otvet === x.succes
                                                      ? "#cdbb18"
                                                      : "#ff2b35"
                                                   : "#ccc",
                                             }}
                                          >
                                             <span dangerouslySetInnerHTML={{ __html: ovv }}></span>
                                             <i className="fa fa-chevron-down"></i>
                                          </li>

                                          {optionArr.map((a) => (
                                             <li
                                                className={x.otvet === a.key ? "selected" : ""}
                                                key={a.key + i}
                                                data-value={a.key}
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
   );
};
