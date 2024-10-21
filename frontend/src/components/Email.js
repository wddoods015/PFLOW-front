import React, { useState } from 'react';

const Email = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 여부
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 여부

  // 이메일 중복 확인 요청
  const handleEmailCheck = async () => {
    try {
      const response = await fetch('https://pflow.ddns.net/api/id_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: email })
      });

      const data = await response.json();
      if (response.ok && data.length === 0) {
        setMessage('사용 가능한 이메일입니다.');
        setIsEmailChecked(true); // 이메일 중복 확인 성공 시
      } else {
        setMessage('이미 존재하는 이메일입니다.');
        setIsEmailChecked(false);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
      setIsEmailChecked(false);
    }
  };

  // 인증 코드 전송 요청
  const handleSendCode = async () => {
    if (!isEmailChecked) {
      setMessage('이메일 중복 확인을 먼저 해주세요.');
      return;
    }

    try {
      const response = await fetch('https://pflow.ddns.net/api/auth/sign-up/sendcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setIsCodeSent(true); // 인증 코드 전송 여부 업데이트
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
    }
  };

  // 인증 코드 검증 요청
  const handleVerifyCode = async () => {
    try {
      const response = await fetch('https://pflow.ddns.net/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, enteredCode: code })
      });

      const data = await response.text(); // 서버에서 단순 텍스트 반환
      if (response.ok) {
        setMessage('인증 성공!');
        setIsVerified(true); // 인증 성공 시 회원가입 가능
      } else {
        setMessage(data);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
    }
  };

  // 회원 가입 요청 (이메일 인증 후에만 가능)
  const handleSignUp = async () => {
    if (!isVerified) {
      setMessage('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      const response = await fetch('https://pflow.ddns.net/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          gender,
          birthDate,
          phone,
          address
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('회원가입이 완료되었습니다!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>회원 가입 및 인증</h2>

      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleEmailCheck}>이메일 중복 확인</button>

      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={!isEmailChecked} // 이메일 중복 확인 후 입력 가능
      />

      <input
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!isEmailChecked}
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        disabled={!isEmailChecked}
      >
        <option value="">성별 선택</option>
        <option value="남">남성</option>
        <option value="여">여성</option>
      </select>

      <input
        type="date"
        placeholder="생년월일 입력"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        disabled={!isEmailChecked}
      />

      <input
        type="tel"
        placeholder="연락처 입력"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={!isEmailChecked}
      />

      <input
        type="text"
        placeholder="주소 입력"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={!isEmailChecked}
      />

      {isEmailChecked && (
        <>
          <button onClick={handleSendCode}>인증 코드 전송</button>
        </>
      )}

      {isCodeSent && (
        <>
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="인증 코드 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerifyCode}>인증 코드 확인</button>
          </div>
        </>
      )}

      {/* 이메일 인증이 완료되었을 때만 회원가입 버튼 활성화 */}
      <button disabled={!isVerified} onClick={handleSignUp}>
        회원 가입
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Email;
