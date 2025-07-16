import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";

import { importContentScripts } from "../../utils/helpers/importScript";

import { Header } from "./Header";
import { SideBar } from "./SideBar";

import { Account } from "../../pages/content/account/Account";

import { Lessons } from "../../pages/content/lessons/Lessons";
import { VideoGroup } from "../../pages/content/lessons/video_group/VideoGroup";
import { VideoShow } from "../../pages/content/lessons/video_group/VideoShow";

import { Test1 } from "../../pages/content/test_1/Test1";
import { Testing1 } from "../../pages/content/test_1/Testing1";
import { TestWork } from "../../pages/content/test_1/TestWork";

import { Test5 } from "../../pages/content/test_5/Test5";
import { Testing5 } from "../../pages/content/test_5/Testing5";
import { TestWork5 } from "../../pages/content/test_5/TestWork5";

import { TestOffice } from "../../pages/content/test_office/TestOffice";
import { TestingOffice } from "../../pages/content/test_office/TestingOffice";
import { TestWorkOffice } from "../../pages/content/test_office/TestWorkOffice";

import { TestTeacher } from "../../pages/content/test_teacher/TestTeacher";
import { TestingTeacher } from "../../pages/content/test_teacher/TestingTeacher";
import { TestWorkTeacher } from "../../pages/content/test_teacher/TestWorkTeacher";

import { TestAnaliz } from "../../pages/content/test_analiz/TestAnaliz";
import { TestingAnaliz } from "../../pages/content/test_analiz/TestingAnaliz";
import { TestWorkAnaliz } from "../../pages/content/test_analiz/TestWorkAnaliz";

import { TestWeek } from "../../pages/content/test_week/TestWeek";
import { TestList } from "../../pages/content/test_week/TestList";

import { NuskaList } from "../../pages/content/test_nuska/NuskaList";
import { TestNuska } from "../../pages/content/test_nuska/TestNuska";
import { TestingNuska } from "../../pages/content/test_nuska/TestingNuska";
import { TestWorkNuska } from "../../pages/content/test_nuska/TestWorkNuska";

import { Search } from "../../pages/content/Search";
import { Tarif } from "../../pages/content/Tarif";

import { ConnectionModal } from "../../components/modals/ConnectionModal";
import { useAppSelector } from "../../redux/redux";

export const Content = () => {
   let pathname = window.location.pathname;
   const authUserId = useAppSelector((state) => state.auth.data?.userId);
   const { data, data5, dataNuska, confirm, dataType } = useAppSelector((state) => state.test);

   const history = useHistory();
   const location = useLocation();

   const getTestDataUrl = () => {
      switch (dataType) {
         case "one":
            return `/Test1/${data?.id}`;
         case "five":
            return `/Test5/${data5?.id}`;
         case "teacher":
            return `/TestTeacher/${data?.id}`;
         case "office":
            return `/OfficeTesting/${data5?.id}`;
         case "analiz":
            return `/TestAnaliz/${data5?.id}`;
         case "nuska":
            return `/TestingNuska/${dataNuska?.testId}`;
         case "week":
            return `/TestingNuska/${dataNuska?.testId}`;
         default:
            return "/Profil";
      }
   };

   useEffect(() => {
      importContentScripts();
      setTimeout(function () {
         document.getElementById("loading-icon-bx")?.remove();
      }, 200);
      // return () => importContentScripts();
   }, []);

   !navigator.onLine
      ? document.getElementById("open_connection_modal")?.click()
      : document.getElementById("close_connection_modal")?.click();

   useEffect(() => {
      history.listen((location, action) => {
         if (location.pathname !== pathname) {
            document.body.className = "ttr-pinned-sidebar ttr-body-fixed ttr-opened-sidebar";
            pathname = location.pathname;
         }
      });
   }, [location.pathname]);

   return (
      <>
         <div id="loading-icon-bx"></div>
         <ConnectionModal />

         <Header />
         <SideBar />

         <main className="ttr-wrapper">
            <Switch>
               <Route path="/Account" exact component={Account} />

               <Route path="/Profil" exact component={Lessons} />
               <Route path="/VideoGroup/:predmetId" exact component={VideoGroup} />
               <Route path="/VideoShow/:predmetId/:videoGroupId" exact component={VideoShow} />
               <Route path="/VideoShow/:predmetId/:videoGroupId/:videoId" exact component={VideoShow} />

               <Route path="/Test1" exact component={Test1} />
               <Route path="/TestList/:panNumber" exact component={TestList} />
               <Route path="/Test1/:testId" exact component={Testing1} />
               <Route path="/TestWork/:testId" exact component={TestWork} />

               <Route path="/Test5" exact component={Test5} />
               <Route path="/Test5/:fiveId" exact component={Testing5} />
               <Route path="/TestWork5/:fiveId" exact component={TestWork5} />

               <Route path="/OfficeTest/:fiveId" exact component={TestOffice} />
               <Route path="/OfficeTesting/:fiveId" exact component={TestingOffice} />
               <Route path="/OfficeTestWork/:fiveId" exact component={TestWorkOffice} />

               <Route path="/TestTeacher" exact component={TestTeacher} />
               <Route path="/TestTeacher/:testId" exact component={TestingTeacher} />
               <Route path="/TestWorkTeacher/:testId" exact component={TestWorkTeacher} />

               <Route path="/TestAnaliz" exact component={TestAnaliz} />
               <Route path="/TestAnaliz/:fiveId" exact component={TestingAnaliz} />
               <Route path="/TestWorkAnaliz/:fiveId" exact component={TestWorkAnaliz} />

               <Route path="/TestWeek" exact component={TestWeek} />
               <Route path="/TestList/:panNumber" exact component={TestList} />

               <Route path="/NuskaList" exact component={NuskaList} />
               <Route path="/TestNuska/:nuskaId" exact component={TestNuska} />
               <Route path="/TestingNuska/:testId" exact component={TestingNuska} />
               <Route path="/TestWorkNuska/:testId" exact component={TestWorkNuska} />

               <Route path="/Tarif" exact component={Tarif} />
               <Route path="/Search" exact component={Search} />

               <Route
                  path="*"
                  component={() => <Redirect to={!authUserId ? "/" : confirm ? getTestDataUrl() : "/Account"} />}
               />
            </Switch>
         </main>
         <div className="ttr-overlay"></div>
      </>
   );
};
