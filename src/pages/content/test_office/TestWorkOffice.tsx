import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BASE_URL_IMG } from "../../../utils/constants/base_url";
import { RootState } from "../../../redux/store";
import { changePanHandler, getInputColor, getReplacedQuesStr, getTd5 } from "../../../utils/helpers/testScript";
import { select_pans } from "../../../utils/constants/select_pans";

export const TestWorkOffice = () => {
   const testData = useSelector((state: RootState) => state.testWork.dataWork5);
   const history = useHistory();

   useEffect(() => {
      !testData && history.push("/");
   }, []);

   return (
      <div className="container-fluid">
         <div className="db-breadcrumb err-breadcrumb">
            <div style={{ display: "flex", alignItems: "center" }}>
               <h4 className="breadcrumb-title">Пән:</h4>

               <select className="form-control" onChange={(e) => changePanHandler(parseInt(e.target.value))}>
                  {testData &&
                     testData.items.map((item, index) => {
                        const panName = select_pans.find((x) => x.id === item.panId)?.panName;
                        return (
                           <option key={panName} value={item.panId}>
                              {panName}
                           </option>
                        );
                     })}
               </select>
            </div>
            <h5 style={{ margin: 0 }}>Қатемен жұмыс</h5>
         </div>
         {testData && (
            <>
               <h4 className="ball-h4">
                  <span>Жинаған балыңыз: </span>
                  <span style={{ color: "mediumseagreen" }}>{testData.ball} - балл</span>
               </h4>

               {testData.items.map((item) => {
                  const panName = select_pans.find((x) => x.id === item.panId)?.panName;
                  return (
                     <h6 key={item.panId + "ball" + item.ball}>
                        <span>{panName}: </span>
                        <span style={{ color: "mediumseagreen" }}>{item.ball}</span>
                     </h6>
                  );
               })}
            </>
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
                              const arr = item.otvet ? item.otvet.split("") : [];

                              return (
                                 <td key={"otv" + item.id} id={"otv" + item.id}>
                                    {arr.length !== 0
                                       ? arr.map((x) => (
                                            <span
                                               key={data.testId + "arr" + x + item.forId}
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
                     const type = index + 1 > 25 ? "checkbox" : "radio";
                     // console.log(item);

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
                                 <div className="form_radion_btn" key={"radid_" + data.panId + (index + 1) + (i + 1)}>
                                    <input
                                       type={type}
                                       id={"radid_" + data.panId + (index + 1) + (i + 1)}
                                       value={i + 1}
                                       name={data.panId + "_" + item.forId}
                                       disabled
                                    />
                                    <label
                                       htmlFor={"radid_" + data.panId + (index + 1) + (i + 1)}
                                       style={{ color, borderColor: color }}
                                    >
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
            ))}
      </div>
   );
};
