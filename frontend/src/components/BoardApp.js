import React, { useState, useEffect } from 'react';

const BoardApp = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [error, setError] = useState('');

  // 게시판 목록을 불러오는 함수
  const fetchBoards = async () => {
    try {
      const response = await fetch('https://pflow.ddns.net/api/boards');
      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }
      const data = await response.json();
      setBoards(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // 개별 게시물을 조회하는 함수
  const fetchBoardById = async (boardId) => {
    try {
      const response = await fetch(`https://pflow.ddns.net/api/boards/${boardId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch board');
      }
      const data = await response.json();
      setSelectedBoard(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // 게시물을 삭제하는 함수
  const deleteBoard = async (boardId) => {
    try {
      const response = await fetch(`https://pflow.ddns.net/api/boards/${boardId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete board');
      }
      alert('게시물이 삭제되었습니다.');
      fetchBoards(); // 삭제 후 게시판 목록을 다시 불러옵니다.
    } catch (err) {
      setError(err.message);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 게시판 목록을 불러옴
  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div>
      <h1>게시판 목록</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {boards.map((board) => (
          <li key={board.board_id}>
            <h2>{board.board_title}</h2>
            <button onClick={() => fetchBoardById(board.board_id)}>게시물 보기</button>
            <button onClick={() => deleteBoard(board.board_id)}>게시물 삭제</button>
          </li>
        ))}
      </ul>

      {selectedBoard && (
        <div>
          <h2>게시물 내용</h2>
          <p>{selectedBoard[0].board_content}</p>
          <p>작성자: {selectedBoard[0].user_email}</p>
        </div>
      )}
    </div>
  );
};

export default BoardApp;