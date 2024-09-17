import React, { useEffect} from 'react';
import axios from 'axios';
import './Community.css';

//import { useParams } from 'react-router-dom';

const Post = () => {
    
    useEffect(() => {
        const GetPost = async () => {
            try {
                const response = await axios.get('http://192.168.0.114:5000/api/boards/board_id',
                    {},
                    {
                        withCredentials: true,
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      }
                ); // 여기에 요청할 URL을 입력
                const data = await response.json();
                console.log(data);
                
        } catch (error) {
            console.error('error:', error);
        }
      };
      GetPost();
    }, []);
    

    return (
        <div className='detail'>
            <div className='detail-form'>
            <h2>커뮤니티 상세페이지 제목영역</h2>
            <div className='detail-header'>
            <span>작성자id: pflow1021</span>
            <span>작성일: 2024.08.26</span>
            <label>추천 수: 7 <input type='checkbox'/></label>
            </div>
            <div className='detail-content'>
                취업 언제 되나요...
            </div>
            <div className='comment'>
            <textarea className='comment-area' placeholder='댓글을 남겨보세요.'/>
            <button className='comment-submit'>등록</button>
            </div>
            <div className='comment-section'>
                <table className='comment-table'>
                    <tr>
                    <td>
                         1
                        </td>
                        <td>
                            코드랩
                        </td>
                        <td>
                            취업 꼭 하셨으면 좋겠네요!
                        </td>
                        <td>
                            24-08-27
                        </td>
                        <td>
                            <button>삭제</button>
                        </td>
                    </tr>
                </table>
            </div>
            </div>
        </div>
    );
};

export default Post;