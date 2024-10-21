// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';


// 
export const isLogin = () => {
  const id = sessionStorage.getItem('id');  // sessionStorage에서 id를 가져옴
  return id !== null && id !== undefined && id !== '';  // id가 null, undefined, 빈 문자열이 아니면 true
};

export const PrivateRoute = ({element}) => {
if (!isLogin()) {
// 로그인 인증이 안되어있는 경우, 로그인페이지로 리디렉션.
alert('로그인이 필요한 서비스입니다.');
return <Navigate to="/Login" replace />;

}
return element;
};






//!! 이중부정연산자 - 어떤값이든 불리언으로 변환.(존재:true 부재:false)
