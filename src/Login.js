import React, { useState } from "react";
import axios from 'axios';
import './App.css';



const Login = () => {
   
    const [users, setUsers] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // 페이지 새로 고침 방지
        try {
            const response = await axios.get("http://192.168.0.144:4000/user");
            setUsers(response.data);
            console.log(response.data[0]);
            
        } catch (error) {
            console.error('로그인 오류', error.message);
            alert("일치한 유저 정보가 없습니다.");
        }
    };

    return (
        <div className="container">
            <h1 className="headline">Login Page</h1>
            <form className="Form" onSubmit={handleSubmit}>
            <label >아이디</label>
                <input type="text" placeholder="아이디 입력" name="id" value={id} onChange={idChange}/>
                <label>비밀번호</label>
                <input type="password" placeholder="비밀번호 입력" name="password" value={password} onChange={pwChange}/> 
                <button type="submit">
            로그인
            </button>
            </form>
        </div>
    ); 
}; 

export default Login;