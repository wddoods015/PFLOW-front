import React, { useState, useEffect } from 'react';

const Mypage = () => {
    const [user, setUser] = useState(null); // 유저 정보를 null로 초기화
    const [isLogin, setIsLogin] = useState(false); // 로그인 여부를 false로 초기화

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch("http://192.168.0.144:4000/accesstoken", {
                    method: "GET",
                    credentials: 'include', // 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    const data = await response.json(); // JSON 형식으로 응답 변환
                    setUser(data);
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setIsLogin(false);
            }
        };

        getUserInfo(); // useEffect 내에서 호출
    }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div className='Mypage'>
            <h1>{isLogin ? `${user?.user}님 환영합니다!` : '로그인 해주세요!'}</h1>
        </div>
    );
};

export default Mypage;
