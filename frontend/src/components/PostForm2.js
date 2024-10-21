import React, { useState } from 'react';

function PostForm2() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseMessage(null);

    try {
      const response = await fetch('https://pflow.ddns.net/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TITLE: title,
          CONTENTS: contents,
          CATEGORY: category,
        }),
        credentials: 'include', // 쿠키를 포함하여 요청
      });

      // 응답이 JSON 형식인지 확인
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text(); // 텍스트 형식일 경우 텍스트로 처리
      }

      if (response.ok) {
        setResponseMessage(data.message); // 성공 메시지 설정
      } else {
        throw new Error(data.message || 'Failed to create post');
      }
    } catch (error) {
      setError(error.message);
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
        <button type="submit">게시물 등록</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default PostForm2;
