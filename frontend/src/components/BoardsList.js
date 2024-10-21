import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BoardsList() {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetch('http://backend/api/boards',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                return response.json();
            })
            .then(data => {
                console.log('받은 데이터:', data); // 데이터가 올바르게 받아졌는지 확인
                if (Array.isArray(data)) {
                    setBoards(data);
                } else {
                    console.error('API가 배열을 반환하지 않았습니다:', data);
                }
            })
            .catch(error => {
                console.error('게시판 목록을 가져오는 중 오류 발생:', error);
            });
    }, []);

    return (
        <div>
            <h1>게시판 목록</h1>
            <ul>
                {boards.length > 0 ? (
                    boards.map(board => (
                        <li key={board.board_id}>
                            <Link to={`/board/${board.board_id}`}>
                                {board.board_title} - {board.user_email} - {board.category}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>게시판이 없습니다.</li>
                )}
            </ul>
        </div>
    );
}

export default BoardsList;
