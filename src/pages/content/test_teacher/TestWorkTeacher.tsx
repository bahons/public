import React, { useEffect } from "react";
import { BASE_URL_IMG } from "../../../utils/constants/base_url";
import { getInputColor, getReplacedQuesStr, getTd } from "../../../utils/helpers/testScript";

import "../../../customStyles/dashstyle.css";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../redux/redux";

export const TestWorkTeacher = () => {
   const testData = useAppSelector((state) => state.testWork.dataWorkTeacher);

   const history = useHistory();

   useEffect(() => {
      !testData && history.push("/");
   }, []);

   return (
      <div className="container-fluid">
         <div
            className="db-breadcrumb"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
         >
            <div style={{ display: "flex", alignItems: "center" }}>
               <h4 className="breadcrumb-title" style={{ display: "block" }}>
                  “Педагогика, оқыту әдістемесі”
               </h4>
               <h5 style={{ margin: 0 }}>Қатемен жұмыс</h5>
            </div>
         </div>
         {testData && (
            <h4>
               <span>Жинаған балыңыз: </span>
               <span style={{ color: "mediumseagreen" }}>{testData.ball} - балл</span>
            </h4>
         )}
         <div style={{ overflowX: "auto" }}>
            <table>
               <tbody>
                  <tr>
                     {testData &&
                        testData.items.map((item, index) => (
                           <td
                              key={item.forId.toString()}
                              onClick={(e) => getTd(parseInt(e.currentTarget.innerText))}
                              className="test-td-hover"
                           >
                              {item.forId}
                           </td>
                        ))}
                  </tr>
                  <tr>
                     {testData &&
                        testData.items.map((item) => {
                           const arr = item.otvet ? item.otvet.split("") : [];
                           return (
                              <td key={"otv" + item.forId} id={"otv" + item.forId}>
                                 {arr.length !== 0
                                    ? arr.map((x, i) => (
                                         <span
                                            key={"arr" + x + item.forId}
                                            style={{ color: getInputColor(item.succes, item.otvet, x) }}
                                         >
                                            {x}
                                         </span>
                                      ))
                                    : ""}
                                 {/* <span>({item.itemBall})</span> */}
                              </td>
                           );
                        })}
                  </tr>
               </tbody>
            </table>
         </div>

         <br />

         <div className="test-pole">
            {testData &&
               testData.items.map((item, index) => {
                  const type = "radio";

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
                              <img
                                 src={BASE_URL_IMG + item.topUrl}
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
                              src={BASE_URL_IMG + item.buttomUrl}
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

                        {inputArr.map((x, i) => {
                           const color = getInputColor(item.succes, item.otvet, x.key);
                           return (
                              <div className="form_radion_btn" key={"radid" + (index + 1) + (i + 1)}>
                                 <input
                                    type={type}
                                    id={"radid" + (index + 1) + (i + 1)}
                                    value={i + 1}
                                    name={item.forId.toString()}
                                    disabled
                                 />
                                 <label htmlFor={"radid" + (index + 1) + (i + 1)} style={{ color, borderColor: color }}>
                                    <span style={{ paddingRight: "10px" }}>{x.key} |</span>
                                    {item.panId === 17 ? (
                                       <span>{x.value}</span>
                                    ) : (
                                       <span dangerouslySetInnerHTML={{ __html: x.value }}></span>
                                    )}
                                 </label>
                                 <br />
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
         </div>
      </div>
   );
};
