import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Siderbar';
import './Mypage.css'
import { Link } from 'react-router-dom';

const MyResume = () => {
    const [resumeInfo, setresumeInfo] = useState([]);

    const getResumeInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/mypage/myresumes', {
                method: "GET",
                credentials: 'include', // 쿠키를 포함하여 요청
            });
            if (response.ok) {
                const data = await response.json(); // JSON 형식으로 응답 변환
               // console.log( '유저가 작성한 이력서:',data)
                setresumeInfo(data);
                //setIsLogin(true);
            } else {
                alert('작성한 이력서가 없습니다.');
            }
        } catch (error) {
            console.error('경로 오류:', error);
        }
    };
    // text가 limit를 넘으면 이후 text는 ... 으로 출력
    const TruncateText = ({ text, limit }) => {
        return (
          <p>
            {text.length > limit ? text.substring(0, limit) + "..." : text}
          </p>
        );
    };

    const deleteResume = async (resume_id) =>{
        
        console.log('삭제버튼');
        console.log(resume_id);

        const selectDelete = window.confirm('해당 이력서를 삭제하시겠습니까?');

        if(selectDelete) {
            console.log('이력서 삭제 진행')

            try{
                const response = await fetch(`http://localhost:5000/api/resumes/${resume_id}`, {
                    method: "DELETE",
                    credentials: 'include', // 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    const data = await response.json(); // JSON 형식으로 응답 변환
                    console.log( 'respons :',data)
                    alert(data.message);
                    getResumeInfo();
                } else {
                    console.log('errer message : ',Error)
                    alert('이력서 삭제 실패')
                }
            }catch{
                console.error('삭제 중 에러 : ', Error)
            }
        } else {
            console.log('삭제 취소')
        }

    }

    useEffect(() => {
        getResumeInfo();
      }, []);

    return (
        <div className="MyReusme">
            <Sidebar/>
            <div className="myresume-section">
                {/* resumeInfo 데이터를 받아오면 .map함수로 출력, 아니면 "Loading ...." 출력 */}
               {resumeInfo && resumeInfo.length > 0 ? (
                <>
                {resumeInfo.map((resume) => (
                    <ul key={resume.resume_id} className='ul-resume'>
                        
                        {/* /${resume.resume_id} */}
                        <Link to = {`/MyPage/MyResume/${resume.resume_id}`}>
                        <li className='li-resume'>
                            <button onClick={(e)=>{
                                e.preventDefault();
                                deleteResume(resume.resume_id)} }>x</button>
                            <h3>{resume.letter_title}</h3>
                            <p>작성일자</p>
                            <TruncateText text = {resume.letter_content} limit={20}></TruncateText>
                        </li>
                        </Link>
                    </ul>
                ))}
                </>
               ) : (
                <div className='alert-div'><h2>작성한 이력서가 없습니다.</h2></div>
               )}
            </div>
        </div>
    );
};
export default MyResume;