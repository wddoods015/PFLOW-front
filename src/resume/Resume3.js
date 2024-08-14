import React, { useState } from "react";
import "./Resume.css";
import SideBar from "../components/SideBar";

const Resume3 = () => {
  const [techInfo, setTechInfo] = useState({
    univ: "",
    major: "",
    graduate: "",
    year: "",
    careers: [], // 경력 정보 배열을 techInfo에 포함
  });

  // 경력추가버튼 핸들이벤트 
  const addCareer = () => {
    const newCareer = {
      id: techInfo.careers.length + 1,
      career: '',
      atitle: '',
      sdate: '',
      edate: '',
    };
    setTechInfo((prevTechInfo) => ({
      ...prevTechInfo,
      careers: [...prevTechInfo.careers, newCareer],
    }));
    alert("경력이 추가되었습니다.");
  };

  const handleCareerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCareers = techInfo.careers.map((career, i) => 
      i === index ? { ...career, [name]: value } : career
    );
    setTechInfo({
      ...techInfo,
      careers: updatedCareers,
    });
  };

  const techInfoChange = (e) => {
    const { name, value } = e.target;
    setTechInfo({
      ...techInfo,
      [name]: value,
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('techInfo', JSON.stringify(techInfo));
    console.log(JSON.stringify(techInfo));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('techInfo');
  };

  return (
    <div className="container">
      <SideBar />
      <form className="Form" onSubmit={handleSubmit}>
        <h1 className="h1">사용자님의 경력 정보를 입력해주세요!</h1>
        <h3 className="h3-1">학력사항</h3>
        <table className="tableForm">
          <tr>
            <th>학교명</th>
            <td>
              <input
                type="text"
                name="univ"
                value={techInfo.univ}
                onChange={techInfoChange}
              />
            </td>
            <th>전공</th>
            <td>
              <input
                type="text"
                name="major"
                value={techInfo.major}
                onChange={techInfoChange}
              />
            </td>
          </tr>
          <tr>
            <th>수료여부</th>
            <td>
              <select
                name="graduate"
                value={techInfo.graduate}
                onChange={techInfoChange}
              >
                <option value="졸업">수료</option>
                <option value="미수료">미수료</option>
              </select>
            </td>
            <th>졸업연도</th>
            <td>
              <input
                type="date"
                name="year"
                value={techInfo.year}
                onChange={techInfoChange}
              />
            </td>
          </tr>
        </table>
        <h3 className="h3-2">경력 사항</h3>
        <button type="button" onClick={addCareer}>
          Add Career
        </button>
        {techInfo.careers.map((careers, index) => (
          <table key={index} className="tableForm2">
            <tr>
              <th>회사명</th>
              <td>
                <input
                  type="text"
                  name="career"
                  value={careers.career}
                  onChange={(e) => handleCareerChange(index, e)}
                />
              </td>
              <th>직함</th>
              <td>
                <input
                  type="text"
                  name="atitle"
                  value={careers.atitle}
                  onChange={(e) => handleCareerChange(index, e)}
                />
              </td>
            </tr>
            <tr>
              <th>입사일</th>
              <td>
                <input
                  type="date"
                  name="sdate"
                  value={careers.sdate}
                  onChange={(e) => handleCareerChange(index, e)}
                />
              </td>
              <th>퇴사일</th>
              <td>
                <input
                  type="date"
                  name="edate"
                  value={careers.edate}
                  onChange={(e) => handleCareerChange(index, e)}
                />
              </td>
            </tr>
          </table>
        ))}
        <button className="submit" type="submit">
          저장하기
        </button>
        <button className="delete" type="button" onClick={handleDelete}>
          초기화
        </button>
      </form>
    </div>
  );
};

export default Resume3;
