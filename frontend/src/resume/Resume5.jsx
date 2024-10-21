import React, { useState, useRef, useEffect } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ProgressBar from "../components/ProgressBar";
import "./Resume5.css";




const Resume5 = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
  
    // 저장된 데이터들 확인하기
    console.log('data',data);
 
    const getUserInfo = async () => {
        try {
            const response = await fetch('https://pflow.ddns.net/api/mypage', {
                method: "GET",
                credentials: 'include', // 쿠키를 포함하여 요청
            });
            if (response.ok) {
                const userdata = await response.json(); // JSON 형식으로 응답 변환
               console.log( '1:',userdata);
                
                setUser(userdata[0]);
               

            } else {
                console.log('유저정보 못가져옴');
            }
        } catch (error) {
            console.error('유저정보 못가져옴:', error);
            //setIsLogin(false);
        }
    };

    useEffect(() => {
        getUserInfo();
       
    }, []);

    console.log('3', user);
  // export 로직 - 출력할 부분
  const componentRef = useRef(); 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "파일 다운로드 시 저장되는 이름 작성" ,
    onAfterPrint: () => alert("파일이 다운로드 되었습니다.")// 취소했는데도 왜 뜨지..? 
  });

  const moveHome = () => {
    window.location.replace('/');
    alert('마이페이지 - 나의 이력서에서 작성한 이력서를 확인해보세요 : )');
  };
  

  return (

    <div className="container">
      
      <div className='progress-div'>
      <ProgressBar/>
      <div className='btn-section'>        
                <button className="download-btn" onClick={handlePrint}>DOWNLOAD</button>
                <button className='gotohome-btn' onClick={moveHome}>Home으로</button>  
                </div>
                
      </div>
      <div className="final-step" >
            <div className="result-section" >
          {data && Object.keys(data).length ? (<div className='resume' ref={componentRef}>
                <h3 className='resume-title'>{data.title}</h3>
            <div className="user-info-section">
                    <img src={data.preview} alt="증명사진 아이콘" className="img" style={{ width: '110px', height: 'auto' }}/>     
                    <table className="user-info-tb">
                    <tr>
                        <th>
                            이름
                        </th>
                        <td>
                           {user.info_name}
                        </td>
                        <th>
                            생년월일
                        </th>
                        <td>
                        {user?.info_birth?.slice(0, 10) || "정보 없음"}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            휴대폰
                        </th>
                        <td>
                        {user?.info_phone_number ? 
                            `${user.info_phone_number.slice(0, 3)}-${user.info_phone_number.slice(3, 7)}-${user.info_phone_number.slice(7, 11)}` : 
                            "정보 없음"}
                        </td>
                        <th>
                            포트폴리오
                        </th>
                        <td>
                        {user?.info_portfolio || "정보 없음"}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            주소
                        </th>
                        <td colSpan={3}>
                        {user?.info_address ? `${user.info_address} / ${user.info_detail || "상세 정보 없음"}` : "정보 없음"}
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
           
            </div>) 
            : 
            (<div className='loading-page'>
                <div className='animation-letters'>
                <span className='loading-P'>P</span>
                <span className='loading-F'>F</span>
                <span className='loading-L'>L</span>
                <span className='loading-O'>O</span>
                <span className='loading-W'>W</span>
                </div> 
              </div> // 데이터가 없을 때 보여줄 부분
            )}      
            
           </div>
           </div>
         </div>
            
  );
};

export default Resume5;



