import React from "react";
import { Link } from "react-router-dom";

interface VideoTestSuccessProps {
   ball: number;
   predmetId: number;
}

export const VideoTestSuccess = ({ ball, predmetId }: VideoTestSuccessProps) => (
   <div className="text-center">
      <span>
         <i className="fa fa-circle-check mb-2" style={{ color: "green", fontSize: "100px" }}></i>
      </span>
      <h3>Тест сәтті аяқталды!</h3>
      <div>
         <p>
            <strong>{ball} балл </strong>
            <span>жинадыңыз.</span>
         </p>
         <p>
            <span>Келесі видео-сабаққа доступ ашылды. Көру үшін келесі батырманы басыңыз!</span>
         </p>
         <Link to={`/VideoGroup/${predmetId}`} className="btn">
            Келесі видео-сабақ
         </Link>
      </div>
   </div>
);
