import React, { useState, useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './Chatbot.css'; 
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; send 파비콘
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; //faPaperclip





const Chatbot = () => {
  const messagesEndRef = useRef(null); // 마지막 메시지를 가리키는 ref
  const [messages, setMessages] = useState([]);
  const [currentTypingId, setCurrentTypingId] = useState(null);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
      {
        text: `Your message is: "${message}"`,
        isUser: false,
        isTyping: true,
        id: Date.now(),
      },
    ]);
  };

  const handleEndTyping = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isTyping: false } : msg
      )
    );
    setCurrentTypingId(null);
  };

  useEffect(() => {
    if (currentTypingId === null) {
      const nextTypingMessage = messages.find(
        (msg) => !msg.isUser && msg.isTyping
      );
      if (nextTypingMessage) {
        setCurrentTypingId(nextTypingMessage.id);
      }
    }
  }, [messages, currentTypingId]);

  // 마지막 메시지로 스크롤하는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="chat-box">
        <h1 className='chatbot-headline'>Chat FLOW</h1>
        <MessageList
          messages={messages}
          currentTypingId={currentTypingId}
          onEndTyping={handleEndTyping}
          messagesEndRef={messagesEndRef} // 마지막 메시지 ref 전달
        />
        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

const MessageList = React.forwardRef(({ messages, currentTypingId, onEndTyping, messagesEndRef }, ref) => (
  <div className="messages-list">
    {messages.map((message) => (
      <Message
        key={message.id}
        {...message}
        onEndTyping={onEndTyping}
        currentTypingId={currentTypingId}
      />
    ))}
    <div ref={messagesEndRef} /> {/* 마지막 메시지를 위한 빈 div */}
  </div>
));

const Message = ({ text, isUser, isTyping, id, onEndTyping, currentTypingId }) => {
  return (
    <div className={isUser ? 'user-message' : 'ai-message'}>
      {isTyping && currentTypingId === id ? (
        <Typewriter speed={50} onFinishedTyping={() => onEndTyping(id)}>
          <p>
            <b>AI</b>: {text}
          </p>
        </Typewriter>
      ) : (
        <p>
          <b>{isUser ? 'User' : 'AI'}</b>: {text}
        </p>
      )}
    </div>
  );
};

// 메세지 입력창 
const MessageForm = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};


export default Chatbot;


  






{/* <FontAwesomeIcon icon={faPaperclip} /> */}
  // const Chatbot = () => {
  //   const [messages, setMessages] = useState([]);
  //   const [currentTypingId, setCurrentTypingId] = useState(null);
  
  //   const handleInputChange = (e) => {
  //     setMessages(e.target.value);
  //   };
  
  //   const handleSendMessage = (message) => {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: message, isUser: true },
  //       { text: `Your message is: "${message}"`, isUser: false, isTyping: true, id: Date.now() },
  //     ]);
  //   };
  //   return (
  //     <div className='chatbot'>
  //       <div className='message-panel'>
  //         <div className='top-content'>
  //           <div className='divider' />
  //         </div>
  //         <div className='message-box'>
  //           <div className='frame'>
  //             <input 
  //               className='frame-input' 
  //               value={messages} 
  //               onChange={handleInputChange} 
  //               placeholder='Type a message' 
  //             />
  //             <div>
  //             <FontAwesomeIcon icon={faPaperPlane} onClick={handleSendMessage}/>
  //             </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //   );
  // };
  
  // export default Chatbot;
  