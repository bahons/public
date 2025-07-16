import React from "react";
import { Link, useHistory } from "react-router-dom";
import { sidebarLinks } from "../../utils/constants/sidebar";

export const SideBar = () => {
   const history = useHistory();

   const path = history.location.pathname;

   return (
      <div className="ttr-sidebar">
         <div
            id="sbCloseBlock"
            className="ttr-toggle-sidebar ttr-material-button"
            style={{
               width: "100vw",
               height: "100vh",
               background: "transparent",
               display: "none",
            }}
         ></div>
         <div className="ttr-sidebar-wrapper content-scroll" style={{ backgroundColor: "#fefefe" }}>
            <div className="ttr-sidebar-logo">
               <img src="/assets/images/geoid-logo.png" width={122} height={27} alt="logo" />
            </div>

            <nav className="ttr-sidebar-navi" style={{ fontWeight: "bold" }}>
               <ul>
                  {sidebarLinks.map((link, i) => (
                     <span key={"link_" + i}>
                        {link.isNuska && <li className="ttr-seperate"></li>}
                        <li
                           // key={'link_' + i}
                           className={link.href === path ? "show" : ""}
                           style={{ backgroundColor: link.isNuska ? "#eef" : "inherit" }}
                        >
                           <Link to={link.href} className="ttr-material-button">
                              <span className="ttr-icon">
                                 <i className={link.icon}></i>
                              </span>
                              <span className="ttr-label">{link.text}</span>
                           </Link>
                        </li>
                     </span>
                  ))}
                  <li className="ttr-seperate"></li>
               </ul>
               {path.includes("TestWork") && <AnswerColors location={path} />}
            </nav>
         </div>
      </div>
   );
};

const AnswerColors = ({ location }: { location: string }) => {
   const colArr = [
      {
         text: "Дұрыс жауап",
         color: "#4cbd79",
      },
      {
         text: "Белгіленген дұрыс жауап",
         color: "#cdbb18",
      },
      {
         text: "Белгіленген қате жауап",
         color: "#ff2b35",
      },
   ];

   return (
      <ul style={{ marginTop: "10px" }}>
         {colArr.map((item) => {
            if (location.includes("OfficeTestWork") && item.color == "#4cbd79") return;
            return (
               <li key={item.text}>
                  <a className="ttr-material-button">
                     <span className="ttr-icon" style={{ color: item.color }}>
                        <i className="ti-layout-column2-alt"></i>
                     </span>
                     <span className="ttr-label" style={{ color: item.color }}>
                        {item.text}
                     </span>
                  </a>
               </li>
            );
         })}
      </ul>
   );
};
