import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/slices/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux";

export const Header = () => {
   const auth = useAppSelector((state) => state.auth.data);
   const timer = useAppSelector((state) => state.timer);

   const dispatch = useAppDispatch();

   useEffect(() => {
      let startTouchX = 0;
      let startTouchY = 0;
      let endTouchX = 0;
      let endTouchY = 0;

      document.addEventListener("touchstart", (e) => {
         startTouchX = e.changedTouches[0].pageX;
         startTouchY = e.changedTouches[0].pageY;
      });
      document.addEventListener("touchend", (e) => {
         endTouchX = e.changedTouches[0].pageX;
         endTouchY = e.changedTouches[0].pageY;

         const deltaX = endTouchX - startTouchX;
         const deltaY = Math.abs(endTouchY - startTouchY);

         // Тек егер горизонталды свайп болса және вертикалды қозғалыс минималды болса
         if (startTouchX < 100 && deltaX > 50 && deltaY < 30) {
            document.getElementById("ttr-material-button")?.click();
         }
      });
   }, []);

   return (
      <header className="ttr-header" style={{ zIndex: 1000 }}>
         <div className="ttr-header-wrapper">
            <div id="ttr-material-button" className="ttr-toggle-sidebar ttr-material-button">
               <i className="ti-close ttr-open-icon"></i>
               <i className="ti-menu ttr-close-icon"></i>
            </div>

            <div className="ttr-header-right ttr-with-seperator">
               <ul className="ttr-header-navigation">
                  <li>
                     {timer.isOn && (
                        <a
                           id="time-path"
                           className="ttr-material-button ttr-submenu-toggle"
                           style={{ color: "white", fontWeight: "200 !important" }}
                        >
                           <span className="time_pretext">Қалған уақыт: </span>
                           {timer.time}
                        </a>
                     )}
                  </li>
                  <li>
                     <a href="#" className="ttr-material-button ttr-submenu-toggle">
                        {auth?.userName}
                     </a>
                     <div className="ttr-header-submenu">
                        <ul>
                           <li>
                              <Link to="/Account">Жеке кабинет</Link>
                           </li>
                           <li>
                              <Link to="/Profil">Сабақтар</Link>
                           </li>
                           <li>
                              <a href="" onClick={() => dispatch(signOut())}>
                                 Шығу
                              </a>
                           </li>
                        </ul>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </header>
   );
};
