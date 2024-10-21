import React, { useState, useEffect } from 'react';

function Test2({ boardId }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://pflow.ddns.net/api/boards/${boardId}`);
        
        // 응답이 성공적인지 확인
        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPost(data[0]);  // 첫 번째 게시글을 설정 (단일 게시글 반환 예상)
        setLoading(false);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [boardId]);  // boardId가 변경될 때마다 새로 데이터를 가져옴

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="Post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>카테고리: {post.np.category}</small><br />
      <small>작성자 ID: {post.user_id}</small><br />
      <small>작성일: {post.written_datetime}</small>
    </div>
  );
}

export default Test2;
