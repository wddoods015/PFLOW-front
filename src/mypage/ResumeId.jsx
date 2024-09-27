import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Mypage.css';


const ResumeId = () => {
const [resumeData, setResumeData] = useState([]);
const {resume_id} = useParams();
const [loading, setLoading] = useState(true); // 로딩 상태 관리

    const GetResume = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/resumes/${resume_id}`,
                {
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
            );  

           // console.log('서버에서 받은 이력서 데이터 : ',resumeData);
            setResumeData(response.data);
            console.log('set에담기 : ',response.data);
        } catch (error) {
            console.error('이력서 못가져옴:', error);
        } finally {
            setLoading(false); // 로딩 끝
          }
    };

    useEffect(() => {
        GetResume();
        console.log('set에담기 : ', resumeData);
    }, []);

    if (loading) {
        return <div>Loading...</div>
      } 

      const moveList = () => {
        window.location.replace('/MyPage/MyResume');
      };

    return ( 
        
        <div className='ResumeId'>
            <button onClick={moveList}>목록</button>
          {resumeData && resumeData.length > 0 ? (<div className='saved-resume'>
                <h3 className='resume-title'>{resumeData.resume[0].letter_title}</h3>
            <div className="user-info-section">
                    <img src="/image.png" alt="증명사진 아이콘" className="img"/>     
                    <table className="user-info-tb">
                    <tr>
                        <th>
                            이름
                        </th>
                        <td>
                            {resumeData.resume[0].info_name}
                        </td>
                        <th>
                           생년/월일
                        </th>
                        <td>
                        {resumeData.resume[0].info_birth.slice(0, 10)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            휴대폰
                        </th>
                        <td>
                        {resumeData.resume[0].info_phone_number}
                        </td>
                        <th>
                            이메일
                        </th>
                        <td>
                        {resumeData.resume[0].resume_email}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            주소
                        </th>
                        <td colSpan={3}>
                        {resumeData.resume[0].info_address} /  {resumeData.resume[0].info_detail}
                        </td>
                        
                    </tr>
                    </table>
            </div>
            <h4>소개글</h4>
            <div className='intro-div'>
                     <p> {resumeData.resume[0].letter_content}</p>
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
                    <td>{resumeData.resume[0].school_name}</td>
                    <td>{resumeData.resume[0].major}</td>
                    <td>{resumeData.resume[0].education_date.slice(0, 7)}</td>
                    <td>{resumeData.resume[0].graduation_category}</td>
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
                    <td className='edu-academy'>{resumeData.training[0].training_center}</td>
                    <td>{resumeData.training[0].training_program}</td>
                    <td>{resumeData.training[0].training_start.slice(0,10)} ~ {resumeData.training[0].training_end.slice(0,10)}</td>
                </tr>
            </table>
            <h4 className="edu-sub-title">보유 기술</h4> 
            <ul className='skills-ul'>
            {resumeData.skill.map((skill, index) => (
             <li key={index}>{skill.skill_name}</li>
              ))}
            </ul>
           

            <h4 className="edu-sub-title">경력</h4>
            {resumeData.career.map((career, index) => (
                 <table className="career-info-tb" key={index}>
                    <tbody>
                    <tr>
                     <th rowSpan={3}>{career.career_start.slice(0,7)} ~ {career.career_end.slice(0,7)}</th>
                     <td>{career.career_name}</td>
                 </tr>
                 <tr>
                 <td>{career.career_position}</td>
                 </tr>
                 <tr>
                 <td>{career.career_work}</td>
                 </tr>
                    </tbody>
             </table>
            ))}
            </div>) : (
                <h1>No data available</h1>
            )}
        </div>
    );
};

export default ResumeId;