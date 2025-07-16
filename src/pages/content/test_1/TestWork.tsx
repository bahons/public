import React, { useEffect } from "react";
import { BASE_URL_IMG } from "../../../utils/constants/base_url";
import { getInputColor, getReplacedQuesStr, getTd } from "../../../utils/helpers/testScript";

import "../../../customStyles/dashstyle.css";

import { select_pans } from "../../../utils/constants/select_pans";
import { useAppSelector } from "../../../redux/redux";
import { useHistory } from "react-router-dom";
import { MathJax } from "better-react-mathjax";

export const TestWork = () => {
   const testData = useAppSelector((state) => state.testWork.dataWork);
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
                  {testData && select_pans.find((x) => x.id === testData.items[0].panId)?.panName}
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
                                 <span>({item.itemBall})</span>
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
                  const type = index + 1 > 25 ? "checkbox" : "radio";

                  let inputArr = [
                     { key: "A", value: item.a },
                     { key: "B", value: item.b },
                     { key: "C", value: item.c },
                     { key: "D", value: item.d },
                  ];
                  type === "checkbox" && inputArr.push({ key: "E", value: item.e }, { key: "F", value: item.f ?? "" });

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
                           <MathJax>
                              <p
                                 className="test-text"
                                 dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name) }}
                              ></p>
                           </MathJax>
                        )}
                        {item.buttomUrl && (
                           <img
                              src={BASE_URL_IMG + item.buttomUrl}
                              style={{ minHeight: "25vh", maxHeight: "50vh", width: "auto", maxWidth: "100%" }}
                              alt=""
                           />
                        )}
                        {item.name2 && (
                           <MathJax>
                              <p
                                 className="test-text"
                                 dangerouslySetInnerHTML={{ __html: getReplacedQuesStr(item.name2) }}
                              ></p>
                           </MathJax>
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
                                       <MathJax style={{ display: "inline" }}>
                                          <span dangerouslySetInnerHTML={{ __html: x.value }}></span>
                                       </MathJax>
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

{
   /* <div className="form_radion_btn">
   <input type={type} id={('radid' + (index + 1)) + 1} value="1" name={item.forId} disabled/>
   <label htmlFor={('radid' + (index + 1)) + 1} id="A" style={{color: getInputBgColor(item.forId, 'A'), borderColor: getInputBgColor(item.forId, 'A')}}>
      <span style={{paddingRight: '10px'}}>A |</span>
      <span dangerouslySetInnerHTML={{__html: item.a}}></span>
   </label>
   <br/>
</div>

<div className="form_radion_btn">
   <input type={type} id={('radid' + (index + 1)) + 2} value="2" name={item.forId} disabled/>
   <label htmlFor={('radid' + (index + 1)) + 2} id="B" style={{color: getInputBgColor(item.forId, 'B'), borderColor: getInputBgColor(item.forId, 'B')}}>
      <span style={{paddingRight: '10px'}}>B |</span>
      <span dangerouslySetInnerHTML={{__html: item.b}}></span>
   </label>
   <br/>
</div>

<div className="form_radion_btn">
   <input type={type} id={('radid' + (index + 1)) + 3} value="3" name={item.forId} disabled/>
   <label htmlFor={('radid' + (index + 1)) + 3} id="C" style={{color: getInputBgColor(item.forId, 'C'), borderColor: getInputBgColor(item.forId, 'C')}}>
      <span style={{paddingRight: '10px'}}>C |</span>
      <span dangerouslySetInnerHTML={{__html: item.c}}></span>
   </label>
   <br/>
</div>

<div className="form_radion_btn">
   <input type={type} id={('radid' + (index + 1)) + 4} value="4" name={item.forId} disabled/>
   <label htmlFor={('radid' + (index + 1)) + 4} id="D" style={{color: getInputBgColor(item.forId, 'D'), borderColor: getInputBgColor(item.forId, 'D')}}>
      <span style={{paddingRight: '10px'}}>D |</span>
      <span dangerouslySetInnerHTML={{__html: item.d}}></span>
   </label>
   <br/>
</div>

<div className="form_radion_btn">
   <input type={type} id={('radid' + (index + 1)) + 5} value="5" name={item.forId} disabled/>
   <label htmlFor={('radid' + (index + 1)) + 5} id="E" style={{color: getInputBgColor(item.forId, 'E'), borderColor: getInputBgColor(item.forId, 'E')}}>
      <span style={{paddingRight: '10px'}}>E |</span>
      <span dangerouslySetInnerHTML={{__html: item.e}}></span>
   </label>
   <br/>
</div>
{type === 'checkbox' && (
   <>
      <div className="form_radion_btn">
         <input type={type} id={('radid' + (index + 1)) + 6} value="6" name={item.forId} disabled/>
         <label htmlFor={('radid' + (index + 1)) + 6} id="F" style={{color: getInputBgColor(item.forId, 'F'), borderColor: getInputBgColor(item.forId, 'F')}}>
            <span style={{paddingRight: '10px'}}>F |</span>
            <span dangerouslySetInnerHTML={{__html: item.f}}></span>
         </label>
         <br/>
      </div>

      <div className="form_radion_btn">
         <input type={type} id={('radid' + (index + 1)) + 7} value="7" name={item.forId} disabled/>
         <label htmlFor={('radid' + (index + 1)) + 7} id="G" style={{color: getInputBgColor(item.forId, 'G'), borderColor: getInputBgColor(item.forId, 'G')}}>
            <span style={{paddingRight: '10px'}}>G |</span>
            <span dangerouslySetInnerHTML={{__html: item.g}}></span>
         </label>
         <br/>
      </div>

      <div className="form_radion_btn">
         <input type={type} id={('radid' + (index + 1)) + 8} value="8" name={item.forId} disabled/>
         <label htmlFor={('radid' + (index + 1)) + 8} id="H" style={{color: getInputBgColor(item.forId, 'H'), borderColor: getInputBgColor(item.forId, 'H')}}>
            <span style={{paddingRight: '10px'}}>H |</span>
            <span dangerouslySetInnerHTML={{__html: item.h}}></span>
         </label>
         <br/>
      </div>
   </>
)} */
}
