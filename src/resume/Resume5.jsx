import React, { useState, useRef } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ProgressBar from "../components/ProgressBar";
import "./Resume5.css";




const Resume5 = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
  
    // 저장된 데이터들 확인하기
    console.log('data',data);
 



  // export 로직 - 출력할 부분
  const componentRef = useRef(); 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "파일 다운로드 시 저장되는 이름 작성" ,
    onAfterPrint: () => alert("파일이 다운로드 되었습니다.")// 취소했는데도 왜 뜨지..? 
  });

  const moveHome = () => {
    window.location.replace('/');
  };
  

  return (
    <div className="container">
      <h2>이력서 테마를 선택하고 출력해보세요 : )</h2>
      <div className='progress-div'>
      <ProgressBar/>
      <div className='btn-section'>        
                <button className="download-btn" onClick={handlePrint}>Down Load</button>
                <button className='gotohome-btn' onClick={moveHome}>Home으로</button>  
                </div>
      </div>
      <div className="final-step" >
            <div className="result-section" >
            <div className='resume' ref={componentRef}>
                <h3 className='resume-title'>{data.title}</h3>
            <div className="user-info-section">
                    <img src={data.preview} alt="증명사진 아이콘" className="img"/>     
                    <table className="user-info-tb">
                    <tr>
                        <th>
                            이름
                        </th>
                        <td>
                            홍길동
                        </td>
                        <th>
                            나이
                        </th>
                        <td>
                            25세
                        </td>
                    </tr>
                    <tr>
                        <th>
                            휴대폰
                        </th>
                        <td>
                            010-1234-5678
                        </td>
                        <th>
                            이메일
                        </th>
                        <td>
                           user1@example.com
                        </td>
                    </tr>
                    <tr>
                        <th>
                            주소
                        </th>
                        <td colSpan={3}>
                            서울특별시 금천구 가산디지털1로 / 현대 테라타워 20층
                        </td>
                        
                    </tr>
                    </table>
            </div>
            <h4>소개글</h4>
            <div className='intro-div'>
                     <p>{data.intro}</p>
                    </div>
            <h4 className="edu-sub-title">학력</h4> 
            <table className="edu-info-tb">
                <tr>
                    <th className="th-rowspan" rowSpan={2}>
                        학력
                    </th>
                   <th>
                    학교명
                   </th>
                   <th>
                    전공
                   </th>
                   <th>
                    졸업일
                   </th>
                   <th>
                    구분
                   </th>
                </tr>
                <tr>
                    <td>{data.eudInfo.univ.name}</td>
                    <td>{data.eudInfo.univ.major}</td>
                    <td>{data.eudInfo.univ.gdate}</td>
                    <td>{data.eudInfo.univ.graduate}</td>
                </tr>
            </table>
            <table className="academy-info-tb">
                <tr>
                    <th className="th-rowspan" rowSpan={2}>
                        교육과정
                    </th>
                   <th className='edu-academy'>
                    연수기관
                   </th>
                   <th>
                    연수과정 및 내용
                   </th>
                   <th>
                    기간
                   </th>
                </tr>
                <tr>
                    <td className='edu-academy'>{data.eudInfo.tranning.academy}</td>
                    <td>{data.eudInfo.tranning.description}</td>
                    <td>{data.eudInfo.tranning.sdate} ~ {data.eudInfo.tranning.edate}</td>
                </tr>
            </table>
            <h4 className="edu-sub-title">보유 기술</h4> 
            <ul className="skills-ul">
            {data.skill.map((skill, index) => (
            <li key={index}>{skill}</li>
                ))}
            </ul>
            <h4 className="edu-sub-title">경력</h4>
            
               {data.careerInfo.map((careerInfo, index) => (
                <table className="career-info-tb" key={index}>
                <tr>
                    <th rowSpan={3}>{careerInfo.sdate} ~ {careerInfo.edate}</th>
                    <td>{careerInfo.company}</td>
                </tr>
                <tr>
                <td>{careerInfo.part}</td>
                </tr>
                <tr>
                <td>{careerInfo.role}</td>
                </tr>
                </table>
               ))} 
           
            </div>
           </div>
           </div>
         </div>
            
  );
};

export default Resume5;



