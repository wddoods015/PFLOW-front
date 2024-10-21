import React, { useState, useEffect } from 'react';

const BoardDetails = ({ boardId }) => {
    const [boardData, setBoardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await fetch(`https://pflow.ddns.net/api/boards/${boardId}`);

                if (!response.ok) {
                    throw new Error('게시글을 불러오는 중 오류가 발생했습니다.');
                }

                const data = await response.json();
                setBoardData(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBoardData();
    }, [boardId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {boardData ? (
                <div>
                    <h1>{boardData[0].board_title}</h1>
                    <p>작성자: {boardData[0].board_user}</p>
                    <p>작성일: {new Date(boardData[0].board_date).toLocaleDateString()}</p>
                    <p>조회수: {boardData[0].board_view}</p>
                    <p>내용: {boardData[0].board_content}</p>
                    <h3>댓글:</h3>
                    {boardData.map((comment, index) => (
                        comment.comment_id ? (
                            <div key={index}>
                                <p><strong>{comment.comment_user}</strong>: {comment.comment_content}</p>
                                <p>작성일: {new Date(comment.comment_date).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <p key={index}>댓글이 없습니다.</p>
                        )
                    ))}
                </div>
            ) : (
                <p>게시글을 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default BoardDetails;
