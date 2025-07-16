import React, { useEffect, useState } from "react";

import { getSearchData } from "../../redux/slices/search.slice";
import { Highlighted } from "../../components/Highlighted";
import { useAppDispatch, useAppSelector } from "../../redux/redux";
import { ISearch } from "../../utils/models/search.models";
import { PageTitle } from "../../components/PageTitle";

export const Search = () => {
   const [searchState, setSearchState] = useState<ISearch[]>([]);
   const [searchStr, setSearchStr] = useState<string>("");
   const searchData = useAppSelector((state) => state.search.data);

   const dispatch = useAppDispatch();

   const searchHandler = (str: string) => {
      setSearchStr(str);
      if (str.trim() === "" || str.trim().length < 3) {
         return setSearchState([]);
      }
      const searchFilter = searchData?.filter((x) => x.name.toLowerCase().includes(str.trim().toLowerCase()));
      setSearchState(searchFilter!);
   };

   useEffect(() => {
      !searchData && dispatch(getSearchData()).catch((error) => console.log(error));
   }, [searchData]);

   return (
      <div className="container-fluid">
         <PageTitle>Сұрақ-Жауап</PageTitle>

         <div className="row">
            <div className="col-lg-12 m-b30">
               <div className="widget-box">
                  <div className="email-wrapper">
                     <div className="mail-list-container">
                        <form className="mail-compose">
                           <div className="form-group col-12">
                              <p>
                                 Сұрағыңызды жазыңыз (тек <strong>"География"</strong> пәні бойынша!)
                              </p>
                              <input
                                 className="form-control"
                                 type="text"
                                 placeholder="сұрақ"
                                 id="myInput"
                                 onChange={(e) => searchHandler(e.target.value)}
                              />
                           </div>
                        </form>

                        <hr />

                        {searchState.map((x) => (
                           <div key={x.id.toString()} className="mail-list-info" data-id="myTable">
                              <div className="mail-list-title-info">
                                 <p>
                                    <Highlighted text={x.name} highlight={searchStr} />
                                 </p>
                                 <span style={{ fontWeight: "bold", color: "green" }}>{x.otvet}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
