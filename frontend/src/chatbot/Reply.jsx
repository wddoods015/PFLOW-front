import React from "react";
import { useTypewriter } from 'react-simple-typewriter';




// 최초 렌더링 되는 메세지
export const InitReply = () => {

    const [msg] = useTypewriter({
        words: ['안녕하세요 취업도우미 PFLOW입니다.원하시는 회사의 조건이 있다면 말씀해주세요.매칭되는 회사를 추천해드릴게요',
     '저는 아래와 같이 짧고 간단한 질문에 답변을 더 잘해요! 🤖'],
        loop: 1, // 무한 루프 여부
        typeSpeed: 20,
    })

    return (
        <div className="reply">
       <p className="chatbot-icon">P</p> {msg}  
     <p className="example-reply">
     "서울 금천구에 있는 개발자 공고 보여줘"<br/>
     "경기도에 있는 신입 디자이너 공고 보여줘"
     </p>
     </div>
    );
};

// 에러, 원하는 공고를 찾지 못할 때
export const ErrorReply = () => {
    return (
        <div className="reply">
        <p>
       <p className="chatbot-icon">P</p>  원하시는 조건의 정보를 찾지 못했어요
     </p>
     </div>
    );
};

// loading 메세지
export const LoadingReply = () => {
    return (
        <div className="reply">
        <p>
       <p className="chatbot-icon">P</p>  원하시는 조건의 회사 공고를 찾는중이에요 : )
     </p>
     </div>
    );
};

// 대화 종료 or 새로운 질문 생성

export const ReplyExit = ({handleNewChat, handleExitChat}) => {
    return (
        <div className="reply">
        <p>
       <p className="chatbot-icon">P</p>  다른 회사를 찾아볼까요?
     </p>
     <div className="reply-btn-div">
     <button className='reply-btn' onClick={handleNewChat}>새로 대화하기</button>
     <button className='reply-btn' onClick={handleExitChat}>대화 끝내기</button>
     </div>
     </div>
    );
};