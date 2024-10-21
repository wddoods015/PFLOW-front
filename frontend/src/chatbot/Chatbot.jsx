import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
 import './Chatbot.css';
import {InitReply, ReplyExit, ErrorReply, LoadingReply} from './Reply';

//import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; //faPaperclip




const Chatbot = () => {
  const messagesEndRef = useRef(null); // 마지막 메시지를 가리키는 ref
  const [chatList, setChatList] = useState([]); // 메시지 리스트


  // 컴포넌트가 처음 마운트될 때 기본 챗봇 메시지
useEffect(() => {
  const defaultMessage = { sender: 'bot', text: <InitReply/> };
  setChatList([defaultMessage]);
}, []);

// 유저 메시지 서버로 전송 함수
const handleSendMessage = async (message) => {
  // 유저 메시지 추가
  const userMessage = { sender: 'user', text: message };
  setChatList((prevList) => [...prevList, userMessage]);
  const loadingMessage = { sender: 'bot', text: <LoadingReply/>};
    setChatList((prevList) => [...prevList, loadingMessage]);
  try {
    // 서버로 메시지 전송 및 응답 받기
    const response = await axios.post('https://pflow.ddns.net/api/job_picks', {
      keyword: message // userMessage 대신 실제 메시지 텍스트만 전달
    }, { withCredentials: true });
    
    console.log('post 성공받은 데이터:', response.data);
    const joblistdata = JSON.parse(response.data);

    // 서버에서 받은 응답 데이터가 객체일 경우, 이를 렌더링 가능하게 처리
    const botMessage = {
      sender: 'bot',
      text: (
        <div className='reply'>
          {console.log(joblistdata)}
          {/* {console.log(typeof joblist)} */}
          <p>원하시는 공고가 여기 있어요 :</p>
          {/* <p>{joblist}</p> */}
          {joblistdata.map((job,index)=>(
            <div key={index}>
              <p><strong>{index+1}. Title:</strong> {job.Title}</p>
              <p><strong>Company:</strong> {job.Company}</p>
              <p><strong>URL:</strong> <a href={job.URL}>{job.URL}</a></p>
            </div>

          ))}
        </div>
      )
    };

    setChatList((prevList) => [...prevList, botMessage]);
    
  } catch (error) {
    console.error('에러 : ',error)
    const ErrorMessage = { sender: 'bot', text: <ErrorReply/>};
    setChatList((prevChatList) => [...prevChatList, ErrorMessage]);
  } finally {
    
    const handleNewChat = () => {
      const newChatMessage = {
        sender: 'bot',
        text: <InitReply />,  // InitReply 컴포넌트를 메시지로 추가
      };
      setChatList((prevChatList) => [...prevChatList, newChatMessage]);
    };

    const handleExitChat = () => {
        alert('대화를 종료합니다.');
        window.location.replace('/');
    };

    const finalMessage = {
        sender: 'bot',
        text: (
            <ReplyExit
                handleNewChat={handleNewChat}
                handleExitChat={handleExitChat}
            />
        ),
    };

    setChatList((prevChatList) => [...prevChatList, finalMessage]);
}

};

  // 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {

    scrollToBottom(); // 메시지가 업데이트될 때마다 스크롤 이동
  }, [chatList]);

  return (
    <div className="chatbot">
      <div className="chat-box">
        <h1 className='chatbot-headline'>Chat FLOW</h1>
        <MessageList chatList={chatList} messagesEndRef={messagesEndRef} />
        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

const MessageList = React.forwardRef(({ chatList, messagesEndRef }, ref) => (
  <div className="messages-list">
    {chatList.map((msg, index) => (
      <Message key={index} sender={msg.sender} text={msg.text} />
    ))}
    <div ref={messagesEndRef} /> {/* 마지막 메시지 위치 */}
  </div>
));

// 유저와 챗봇 메시지 구분
const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      {text}
    </div>
  );
};

const MessageForm = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage); // 유저 메시지 전송
      setInputMessage(''); // 입력창 초기화
    }
  };

  

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={inputMessage}
        onChange={(event) => setInputMessage(event.target.value)}
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default Chatbot;