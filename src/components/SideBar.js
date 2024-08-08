import React from "react";
import { useLocation } from 'react-router-dom';
import ProgressBar from "../components/ProgressBar";

const SideBar = () => {
  const location = useLocation();

  

  return (
    <nav className="SideBar">
      <ul className="Step-Section">
        <li className="Step1">
          <span className="Text1" style={{color: location.pathname === '/resume/Resume1' ? 'red' : 'white'}}>탬플릿 정보</span>
        </li>
        <li className="Step">
          <span className="Text2" style={{color: location.pathname === '/resume/Resume2' ? 'red' : 'white'}}>기본정보</span>
        </li>
        <li className="Step">
          <span className="Text3" style={{color: location.pathname === '/resume/Resume3' ? 'red' : 'white'}}>기술정보</span>
        </li>
        <li className="Step">
          <span className="Text4" style={{color: location.pathname === '/resume/Resume4' ? 'red' : 'white'}}>자기소개</span>
        </li>
        <li className="Step">
          <span className="Text5" style={{color: location.pathname === '/resume/Resume5' ? 'red' : 'white'}}>Finalize</span>
        </li>
      </ul>
      <ProgressBar />
    </nav>
  );
};

export default SideBar;
