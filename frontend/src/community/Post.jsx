import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './Community.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const Post = () => {
    
  const [boardData, setBoardData] = useState([]);
  const [boardCheck, setboardCheck] = useState('');
  const {board_id} = useParams();
  const [comment_id, setcommentId] = useState('')
  const [update, setupdate] = useState('');
  const [text, setText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [commentText, setComment] = useState('');


    // console.log('boardID : ',board_id)
    const GetPost = async () => {
      try {
          const response = await axios.get(`https://pflow.ddns.net/api/boards/${board_id}`,
              {
                  withCredentials: true,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
          ); // 여기에 요청할 URL을 입력
              //console.log('서버에서 받은 데이터 : ',response);
              const data = response.data;
              console.log(data.result[0].commentCheck);
              setBoardData(data.result);
              setboardCheck(data.boardCheck);
      } catch (error) {
              console.error('error:', error);
          }
  };

  useEffect(() => {
    GetPost();
  }, []);

     // 텍스트 
     const TextOnChange = (e) => {
      setText(e.target.value);
  }

  // 게시글 텍스트 수정
  const Textupdate = (e) => {
      setupdate(e.target.value);
  }

  // 댓글 텍스트 수정
  const commentTextupdate = (e) => {
      setComment(e.target.value);
  }
  

    //---------------- 게시글 수정 요청------------------------------------------------------------
    const updatePut = async (e) => {
      e.preventDefault(); // 폼 제출 방지
      try {
        const resPost = await axios.put(`https://pflow.ddns.net/api/boards/${board_id}`, {
          update,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(`서버에서 받은 응답 : ${resPost}`);
        alert(resPost.data.message)

        GetPost();
        setOpenPostModal(false);
        // 응답 상태를 확인
        if (resPost.status !== 201) {
          console.log('Response not ok:', resPost);
        }
        // 성공적으로 포스트를 등록한 후, 전체 포스트를 다시 가져올 수 있습니다.
      //   dispatch(fetchAllPosts());
      } catch (error) {
        console.error('Error posting:', error);
        //alert('게시글 수정 오류입니다.');
        setOpenPostModal(false);
        GetPost();
      }
    };

// 모달창 열기 위한 핸들러
    const handleWrite = (commentId) => {
      setOpenModal(!openModal);
      setcommentId(commentId);
    };

    const handlePostWrite = () => {
      setOpenPostModal(!openPostModal);
    };
  // 모달창 닫기 버튼을 위한 핸들러
    const closePostModal = () => {
      setOpenPostModal(false);
    };

    const closeModal = () => {
      setOpenModal(false);
    };


//---------------- 게시글 삭제 요청------------------------------------------------------------
   
const DeletePost = async () => {
    const selectDelete = window.confirm('해당 게시물을 삭제하시겠습니까?');
    if(selectDelete) {
    try{
      const response = await fetch(`https://pflow.ddns.net/api/boards/${board_id}`, {
          method: "DELETE",
          credentials: 'include', // 쿠키를 포함하여 요청
      });

      if (response.ok) {
          const data = await response.json(); // JSON 형식으로 응답 변환
          console.log( 'respons :',data)
          moveToList();
          alert(data.message);
      } else {
          console.log('errer message : ',Error)
          alert('게시물 삭제 실패')
      }
  }catch{
      alert('삭제중 오류발생',Error)
  }
} else {
  console.log('삭제 취소')
}
   };

 //--------- 댓글쓰기-------------------------------------------------------------------------------
  

  const commentPost = async (e) => {
    e.preventDefault(); // 폼 제출 방지
    if (text ==='') {
      alert('댓글을 1글자 이상 입력해주세요.');
    } else {
      try {
        const resPost = await axios.post(`https://pflow.ddns.net/api/boards/${board_id}/comments`, {
          text,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(`서버에서 받은 응답 : ${resPost}`);
        alert(resPost.data.message)
        GetPost();
        setText('');
        
        // 응답 상태를 확인
        if (resPost.status !== 201) {
          console.log('Response not ok:', resPost);
        }
      } catch (error) {
        console.error('Error posting:', error);
        alert('댓글 등록 오류입니다.');
      }
    }
    
  };

    //----------------------- 댓글 수정 요청------------------------------------------------------
    const updateComment = async (e) => {
      e.preventDefault(); // 폼 제출 방지
      try {
        const resPost = await axios.put(`https://pflow.ddns.net/api/boards/${board_id}/comments/${comment_id}`, {
          commentText,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(`서버에서 받은 응답 : ${resPost}`);
        alert(resPost.data.message)
        GetPost();
        setOpenModal(false);
        GetPost();
    
        // 응답 상태를 확인
        if (resPost.status !== 201) {
          console.log('Response not ok:', resPost);
        }
        // 성공적으로 포스트를 등록한 후, 전체 포스트를 다시 가져올 수 있습니다.
      //   dispatch(fetchAllPosts());
      } catch (error) {
        console.error('Error posting:', error);
        alert('댓글 수정 오류입니다.');

        setOpenModal(false);
        GetPost();
      }
    }
   

  //---------- 댓글 삭제 함수------------------------------------------------------------
     const deleteComment = async (board_id,comment_id) => {
      //console.log('comment아이디모르니',comment_id);
      const selectDelete = window.confirm('해당 댓글을 삭제하시겠습니까?');

      if(selectDelete) {
          try{
              const response = await fetch(`https://pflow.ddns.net/api/boards/${board_id}/comments/${comment_id}`, {
                  method: "DELETE",
                  credentials: 'include', // 쿠키를 포함하여 요청
              });

              if (response.ok) {
                  const data = await response.json(); // JSON 형식으로 응답 변환
                  console.log( 'response :',data)
                  alert(data.message);
                  GetPost();
              } else {
                  console.log('errer message : ',Error)
                  alert('댓글 삭제 실패')
              }
          }catch (error) {
            alert('댓글 삭제 실패')
          }
      } else {
          console.log('삭제 취소')
      }
  }

  // 커뮤니티, 포스트 리스트로 이동

  const moveToList = () => {
    window.location.replace('/Community');
  };

  return (
    <div className='detail'>
      <div className='detail-form'>
        {boardCheck === true ? (
          // 로그인 유저 === 게시글 작성 유저 일 때
          boardData && boardData.length > 0 ? (
            <>
              <h2>{boardData[0].board_title}</h2>
              <div className="detail-header">
                <div className="detail-header-1">
                  <span>작성자id: {boardData[0].board_user}</span>
                  <span>
                    작성일:{" "}
                    {new Date(boardData[0].board_date).toLocaleDateString("ko-KR", {
                      timeZone: "Asia/Seoul",
                    })}
                  </span>
                  <label>
                    조회 수: {boardData[0].board_view}
                  </label>
                </div>
                <FontAwesomeIcon icon={faList} size='2x' onClick={moveToList} />
              </div>
              <div className='comment' >
                <div className='user-post-btn'>
                  <button type='submit' className='post-modify-btn' onClick={handlePostWrite}>게시물 수정</button>
                  <button type='button' onClick={DeletePost} className='post-modify-btn'>게시물 삭제</button>
                </div>
                <div className='detail-content'>
                  {boardData[0].board_content} 
                </div>
              </div>
            </>
          ) : (
            <div className='loading-page'>
            <div className='animation-letters'>
            <span className='loading-P'>P</span>
            <span className='loading-F'>F</span>
            <span className='loading-L'>L</span>
            <span className='loading-O'>O</span>
            <span className='loading-W'>W</span>
            </div> 
          </div> // 데이터가 없을 때 보여줄 부분
          )
        ) : (
          // 로그인 유저 !== 게시글 작성 유저 일 때
          boardData && boardData.length > 0 ? (
            <>
              <h2>{boardData[0].board_title}</h2>
              <div className="detail-header">
                <div className="detail-header-1">
                  <span>작성자id: {boardData[0].board_user}</span>
                  <span>
                    작성일:{" "}
                    {new Date(boardData[0].board_date).toLocaleDateString("ko-KR", {
                      timeZone: "Asia/Seoul",
                    })}
                  </span>
                  <label>
                    조회 수: {boardData[0].board_view}
                  </label>
                </div>
                <FontAwesomeIcon icon={faList} size='2x' onClick={moveToList} />
              </div>
              <div className="detail-content">{boardData[0].board_content}</div>
            </>
          ) : (
            <div className='loading-page'>
            <div className='animation-letters'>
            <span className='loading-P'>P</span>
            <span className='loading-F'>F</span>
            <span className='loading-L'>L</span>
            <span className='loading-O'>O</span>
            <span className='loading-W'>W</span>
            </div> 
          </div> // 데이터가 없을 때 보여줄 부분
          )
        )}
        
 {/* 게시물 수정 모달창 ui*/}
        {openPostModal && (
          <div className='modal-post'>
            <form className='comment-modify-form' onSubmit={updatePut}>
            <button type="button" onClick={closePostModal} className='close-btn'>X</button>
            <textarea className='comment-modify-area'
            onChange={Textupdate}
            placeholder={boardData[0].board_content || "내용을 입력하세요."}
            />
             <button type="submit" className='post-submit'>수정하기</button>
            </form>
        </div>
          )}

        {/* 댓글 수정 모달창 ui*/}
      
{openModal && (
  <div className='modal-post'>
    <form className='comment-modify-form' onSubmit={updateComment}>
      <button type="button" onClick={closeModal} className='close-btn'>X</button>
      <div>
        <textarea
          className='comment-modify-area'
          placeholder={commentText || "내용을 입력하세요."}
          value={commentText || ""}
          onChange={commentTextupdate}
        ></textarea>
      </div>
      <button type="submit" className='post-submit'>수정하기</button>
    </form>
  </div>
)}

        {/* 댓글 작성 폼 */}
        <form className='comment' onSubmit={commentPost}>
          <textarea
            value={text}
            className='comment-area'
            onChange={TextOnChange}
            placeholder='댓글을 남겨보세요.'
          />
          <button type='submit' className='comment-post-btn'>댓글 등록</button>
        </form>

        <div className='comment-section'>
  {boardData.map((comment, index) => (
    <table key={index} className='comment-table'>
      <tbody>
        {comment.comment_id === null ? (
          <tr>
            <td colSpan="5">댓글을 작성해주세요 : )</td>
          </tr>
        ) : (
          <tr>
            <td className='comment-index'>{index + 1}</td>
            <td className='comment-content-td'>{comment.comment_content}</td>
            <td className='comment-date-td'>
              {new Date(comment.comment_date).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </td>
            <td className='comment-user-td'>{comment.comment_user}</td>
            <td className='comment-btn-td'>
              {comment.commentCheck === true ? (
                <>
                  <button className='comment-del-btn' onClick={() => handleWrite(comment.comment_id)}>수정</button>
                  <button className='comment-del-btn' onClick={() => deleteComment(board_id, comment.comment_id)}>삭제</button>
                </>
              ) : null}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  ))}
</div>

      </div>
    </div>
  );
  };
  
  export default Post;
  


