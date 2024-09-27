import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './Community.css';
import { useParams } from 'react-router-dom';

const Post = () => {
    
  const [boardData, setBoardData] = useState([]);
  const [boardCheck, setboardCheck] = useState('');
  const {board_id} = useParams();
  const [comment_id, setcommentId] = useState('')
  const [update, setupdate] = useState('');
  const [text, setText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [commentText, setComment] = useState('');


    // console.log('boardID : ',board_id)
    const GetPost = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/boards/${board_id}`,
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
  
  //--------- 댓글쓰기-------------------------------------------------------------------------------
  const commentPost = async (e) => {
      e.preventDefault(); // 폼 제출 방지
      try {
        const resPost = await axios.post(`http://localhost:5000/api/boards/${board_id}/comments`, {
          text,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(`서버에서 받은 응답 : ${resPost}`);
        alert(resPost.data.message)
        setText('');
        GetPost();
        
        // 응답 상태를 확인
        if (resPost.status !== 201) {
          console.log('Response not ok:', resPost);
        }
        // 성공적으로 포스트를 등록한 후, 전체 포스트를 다시 가져올 수 있습니다.
        // dispatch(fetchAllPosts());
      } catch (error) {
        console.error('Error posting:', error);
        alert('댓글 등록 오류입니다.');
      }
    };

    //---------------- 게시글 수정 요청------------------------------------------------------------
    const updatePut = async (e) => {
      e.preventDefault(); // 폼 제출 방지
      try {
        const resPost = await axios.put(`http://localhost:5000/api/boards/${board_id}`, {
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
    
        // 응답 상태를 확인
        if (resPost.status !== 201) {
          console.log('Response not ok:', resPost);
        }
        // 성공적으로 포스트를 등록한 후, 전체 포스트를 다시 가져올 수 있습니다.
      //   dispatch(fetchAllPosts());
      } catch (error) {
        console.error('Error posting:', error);
        alert('게시글 수정 오류입니다.');
        GetPost();
      }
    };

    const handleWrite = (commentId) => {
      setOpenModal(!openModal);
      setcommentId(commentId);
    };
  
    const closeModal = () => {
      setOpenModal(false);
    };

    // 댓글 수정 요청
    const updateComment = async (e) => {
      e.preventDefault(); // 폼 제출 방지
      try {
        const resPost = await axios.put(`http://localhost:5000/api/boards/${board_id}/comments/${comment_id}`, {
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

    // 게시글 & 댓글 삭제 요청

   

     // 댓글 삭제 함수
     const deleteComment = async (board_id,comment_id) => {
      console.log('comment아이디모르니',comment_id);
      const selectDelete = window.confirm('해당 댓글을 삭제하시겠습니까?');

      if(selectDelete) {
          try{
              const response = await fetch(`http://localhost:5000/api/boards/${board_id}/comments/${comment_id}`, {
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
              // 로그인 유저 === 게시글 작성 유저 일때
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
                    <div className="detail-header-2">
                 
                    <button className='movetolist-btn' onClick={moveToList}>↪</button>
                    </div>
                  </div>
                  <form className='comment' onSubmit={updatePut}>
                  <button type='submit' className='post-modify-btn'>게시물 수정</button>
                  <textarea className='detail-content' onChange={Textupdate} placeholder={boardData[0].board_content}/>
                  </form>
                  {/* <div className="detail-content">{boardData[0].board_content}</div> */}
                  </>
              ) : (
                  <p>Loading...</p> // 데이터가 없을 때 보여줄 부분
              )
          ) : 
          ( // 로그인 유저 !== 게시글 작성 유저 일때
              boardData && boardData.length > 0 ? (
                  <>
                  <h2>{boardData[0].board_title}</h2>
                  <div className="detail-header">
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
                  <div className="detail-content">{boardData[0].board_content}</div>
                  </>
              ) : (
                  <p>Loading...</p> // 데이터가 없을 때 보여줄 부분
              )
          ) }

          {/* {boardData && boardData.length > 0 ? (
              <>
              <h2>{boardData[0].board_title}</h2>
              <div className="detail-header">
                  <span>작성자id: {boardData[0].board_user}</span>
                  <span>
                  작성일:{" "}
                  {new Date(boardData[0].board_date).toLocaleDateString("ko-KR", {
                      timeZone: "Asia/Seoul",
                  })}
                  </span>
                  <label>
                  조회 수: {boardData[0].board_view} <input type="checkbox" />
                  </label>
              </div>
              <div className="detail-content">{boardData[0].board_content}</div>
              </>
          ) : (
              <p>Loading...</p> // 데이터가 없을 때 보여줄 부분
          )} */}

          <form className='comment' onSubmit={commentPost}>
          <textarea className='comment-area' onChange={TextOnChange} placeholder='댓글을 남겨보세요.'/> 
          <button type='submit' className='comment-post-btn'>댓글 등록</button>
          </form>
         
          <div className='comment-section'>
          {boardData.map((comment, index) => (
              <table key={index} className='comment-table'>
                  
                  {comment.commentCheck === true ? ( // 로그인 유저 === 댓글 작성 유저
                      <tbody>
                      <td className='comment-index'>{index+1}</td>
                      <td className='comment-content-td'>{comment.comment_content}</td>
                      <td className='comment-date-td'>{new Date(comment.comment_date).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                      <td className='comment-user-td'>{comment.comment_user}</td>
                      <td className='comment-btn-td'>
                      <button className='comment-del-btn' onClick={ ()=>{handleWrite(comment.comment_id)} }>수정</button>
                      <button className='comment-del-btn' onClick={()=>deleteComment(board_id,comment.comment_id)}>삭제</button>
                      </td>
                      {openModal && (
                          <div className='modal-post'>
                              <form className='comment-modify-form' onSubmit={updateComment}>
                              <button type="button" onClick={closeModal} className='close-btn'>X</button>
                              <div className=''>
                                  <textarea
                                      className='comment-modify-area'
                                      placeholder={comment.comment_content}
                                      value={commentText}
                                      onChange={commentTextupdate}
                                  ></textarea>
                              </div>
                              <button type="submit" className='post-submit'>수정하기</button>
                              </form>
                          </div>
                      )}
                      
                      </tbody>

                  ) : ( // 로그인 유저 !== 댓글 작성 유저
                      <tbody>
                      <td className='comment-index'>{index+1}</td>
                      <td className='comment-content-td'>{comment.comment_content}</td>
                      <td className='comment-date-td'>{new Date(comment.comment_date).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                      <td className='comment-user-td'>{comment.comment_user}</td>
                      <td className='comment-btn-td'></td>
                      </tbody>
                  )}
              </table>
          ))}
          </div>
          </div>
      </div>
  );
};

export default Post;