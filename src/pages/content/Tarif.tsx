import React from "react";

const tarifs = [
   {
      title: "«1 ай»",
      price: "5,000",
      features: ["Күніне 1 рет толық ҰБТ", "Күніне 3 рет жеке пәндік тест"],
      link: "https://wa.me/77473987068?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5!%0A%D0%9C%D0%B5%D0%BD%20Geoid%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%81%D1%8B%D0%BD%D0%B4%D0%B0%20%D1%82%D0%B5%D1%81%D1%82%20%D1%82%D0%B0%D0%BF%D1%81%D1%8B%D1%80%D1%83%D2%93%D0%B0%20%D0%B0%D1%80%D0%BD%D0%B0%D0%BB%D2%93%D0%B0%D0%BD%20%221%20%D0%B0%D0%B9%22%20%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D1%82%D1%96%20%D1%81%D0%B0%D1%82%D1%8B%D0%BF%20%D0%B0%D0%BB%D2%93%D1%8B%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96",
   },
   {
      title: "«3 ай»",
      price: "10,000",
      features: ["Күніне 3 рет толық ҰБТ", "Күніне 3 рет жеке пәндік тест"],
      link: "https://wa.me/77473987068?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5!%0A%D0%9C%D0%B5%D0%BD%20Geoid%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%81%D1%8B%D0%BD%D0%B4%D0%B0%20%D1%82%D0%B5%D1%81%D1%82%20%D1%82%D0%B0%D0%BF%D1%81%D1%8B%D1%80%D1%83%D2%93%D0%B0%20%D0%B0%D1%80%D0%BD%D0%B0%D0%BB%D2%93%D0%B0%D0%BD%20%223%20%D0%B0%D0%B9%22%20%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D1%82%D1%96%20%D1%81%D0%B0%D1%82%D1%8B%D0%BF%20%D0%B0%D0%BB%D2%93%D1%8B%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96",
   },
   {
      title: "«6 ай»",
      price: "15,000",
      features: ["Күніне 1 рет толық ҰБТ", "Күніне 3 рет жеке пәндік тест"],
      link: "https://wa.me/77473987068?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5!%0A%D0%9C%D0%B5%D0%BD%20Geoid%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%81%D1%8B%D0%BD%D0%B4%D0%B0%20%D1%82%D0%B5%D1%81%D1%82%20%D1%82%D0%B0%D0%BF%D1%81%D1%8B%D1%80%D1%83%D2%93%D0%B0%20%D0%B0%D1%80%D0%BD%D0%B0%D0%BB%D2%93%D0%B0%D0%BD%20%226%20%D0%B0%D0%B9%22%20%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D1%82%D1%96%20%D1%81%D0%B0%D1%82%D1%8B%D0%BF%20%D0%B0%D0%BB%D2%93%D1%8B%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96",
   },
];

export const Tarif = () => {
   return (
      <div className="content-block">
         <div className="section-area ">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-md-12 heading-bx text-center">
                     <h2 className="title-head text-uppercase m-b0 member-ewe">
                        Geoid_Edu Платформасының оқу материалдарына арналған пакеттер бөлімі!
                        <br />
                     </h2>
                  </div>
               </div>
               <div className="pricingtable-row">
                  <div className="row">
                     {tarifs.map((t, i) => (
                        <div key={t.title} className="col-sm-12 col-md-4 col-lg-4 m-b40">
                           <div className="pricingtable-wrapper">
                              <div
                                 className={i == 1 ? "pricingtable-inner pricingtable-highlight" : "pricingtable-inner"}
                              >
                                 <div className="pricingtable-main">
                                    <div className="pricingtable-price">
                                       <span className="pricingtable-bx">{t.price}</span>
                                       <span className="priceing-doller">тг</span>
                                       {/* <span className="pricingtable-type">1 ай</span> */}
                                    </div>
                                    <div className="pricingtable-title">
                                       <h2>{t.title}</h2>
                                       <p>Пакет</p>
                                    </div>
                                 </div>
                                 <ul className="pricingtable-features">
                                    {t.features.map((item) => (
                                       <li key={i + item}>{item}</li>
                                    ))}
                                 </ul>
                                 <div className="pricingtable-footer">
                                    <a href={t.link} target="_blank" className="btn radius-xl">
                                       Пакетті алу
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
