import React, { useState } from 'react';

function PostForm() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 에러 상태 초기화
    setResponse(null); // 응답 상태 초기화

    try {
      const res = await fetch('https://pflow.ddns.net/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TITLE: title,
          CONTENTS: contents,
          CATEGORY: category,
          USER_ID: userId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data); // 성공 시 응답 설정
      } else {
        setError(data.message); // 에러 시 에러 메시지 설정
      }
    } catch (err) {
      setError('요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>게시물 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
        </div>
        <div>
          <label>카테고리:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>사용자 ID:</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">게시물 등록</button>
      </form>

      {response && (
        <div>
          <p>{response.message}</p>
        </div>
      )}

      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}
    </div>
  );
}

export default PostForm;
