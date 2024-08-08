import "./App.css";
import "./components/components.css";
import React from "react";
import SideBar from "./components/SideBar";
import { ProgressProvider } from "./context/ProgressContext.jsx";
import { ThemeProvider } from './context/ThemeContext'; // 수정된 import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Resume1 from "./resume/Resume1";
import Resume2 from "./resume/Resume2";
import Resume3 from "./resume/Resume3";
import Resume4 from "./resume/Resume4";
import Resume5 from "./resume/Resume5";

const App = () => {
  return (
    <ThemeProvider> {/* 수정된 부분: ThemeProvider 사용 */}
      <ProgressProvider>
        <Router>
          <div className="App">
            <div className="Container">
              <SideBar />
              <Routes>
                <Route path="/" element={<Resume1 />} /> 
                <Route path="/resume/Resume1" element={<Resume1 />} /> 
                <Route path="/resume/Resume2" element={<Resume2 />} />
                <Route path="/resume/Resume3" element={<Resume3 />} />
                <Route path="/resume/Resume4" element={<Resume4 />} />
                <Route path="/resume/Resume5" element={<Resume5 />} />
                {/* 404 페이지 */}
                <Route path="*" element={<h1>404 페이지를 찾을 수 없습니다</h1>} />
              </Routes>
            </div>
          </div>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default App;
