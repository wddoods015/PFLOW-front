import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resume4.css";
import ProgressBar from "../components/ProgressBar";

const Resume4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  // 희망취업분야 입력값을 받을 상태
  const [preJob, setPreJob] = useState('');
  // 추천받은 데이터 받을 상태
  const [recommendations, setRecommendations] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');

  console.log(JSON.stringify(data, null, 2));

  // onChange 이미지 핸들러
  const imgOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // 파일 미리보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // 미리보기 URL을 상태에 저장
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
  };

  // onChange 제목 핸들러
  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  // onChange 자기소개 핸들러
  const introOnChange = (e) => {
    setIntro(e.target.value);
  };

  // onChange 희망직무 핸들러
  const preferOnChange = (e) => {
    setPreJob(e.target.value);
  };

  // 문구 추천을 위한 post 요청
  const fetchRecommendations = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/get-recommendations', {
        skills: data.skill, 
        // preferJob: preJob,
      });
      console.log('post 성공받은데이터',response);
      if (response.data) {
        setRecommendations(response.data.recommendations); // 추천 결과를 상태에 저장
      }
    } catch (error) {
      console.error("자기소개 추천 오류:", error);
    }
  };

  // 서버로 데이터 전송을 위한 post 요청
  const handlePost = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('skills', JSON.stringify(data.skill));
    formData.append('education', JSON.stringify(data.eudInfo.univ));
    formData.append('tranning', JSON.stringify(data.eudInfo.tranning));
    formData.append('career', JSON.stringify(data.careerInfo));
    formData.append('title', title);
    formData.append('intro', intro);

    try {
      const response = await axios.post('http://localhost:5000/api/resumes',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log('response ok:', response);
      navigate('/resume/Resume5', { state: { ...data, image, preview, title, intro, preJob } });
    } catch (error) {
      console.error('자기소개 전송 오류:', error);
    }
  };

  return (
    <div className="container">
      <div className="progress-div">
        <ProgressBar />
      </div>
      <div className="resume-4">
        <div className="recommend-div">
          <p className="recommend-p"> 💡 자기소개 작성이 어렵다면? 희망분야 입력하고 내 정보로 문구추천 받기!</p>
          <div className="recommend-post-div">
            <input
              className="recommend-input"
              placeholder="ex) ai 개발자"
              onChange={preferOnChange}
            />
            <button className="recommend-btn" onClick={fetchRecommendations}>문구추천받기</button>
          </div>
          <ul className="recommend-ul">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="recommend-li">
                <p>{recommendation}</p>
              </li>
            ))}
          </ul>
        </div>

        <form className="form-4">
          <div className="intro-section">
            <div className="img-section">
              <label htmlFor="file-upload" className={`img-label ${preview ? 'hidden' : ''}`}>
                사진 +
              </label>
              <input
                className="input-image"
                id="file-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={imgOnChange}
              />
              {preview && (
                <img className="preview-img" src={preview} alt="미리보기" style={{ width: '60px', height: 'auto' }} />
              )}
            </div>

            <div className="title-section">
              <input
                className="input-title"
                placeholder="사용자님을 한줄로 소개할 제목을 작성해주세요."
                value={title}
                onChange={titleOnChange}
              />
            </div>

            <div className="textarea-section">
              <textarea
                maxLength="400"
                className="input-intro"
                placeholder="본인 업무경험을 기반으로 3~5줄로 요약하여 자기소개를 작성해주세요."
                value={intro}
                onChange={introOnChange}
              />
            </div>
          </div>
        </form>
      </div>

      <button className="next-btn" onClick={() => handlePost(image)}>save</button>
    </div>
  );
};

export default Resume4;
