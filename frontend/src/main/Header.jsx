import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {isLogin} from '../slices/PrivateRoute';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/AuthSlice'; // api 로직 가져오기
import './main.css';




function Header() {

  const dispatch = useDispatch();

  const handleLogOut = () => {
      sessionStorage.clear();
      dispatch(logout()); // 비동기 액션 디스패치
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  //console.log(isLogin());


  // 드롭다운 상태 설정
  const onDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropOut = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // 드롭다운 바닥 클릭 시 안 보이게 설정
  useEffect(() => {
    document.addEventListener('mousedown', handleDropOut);

    return () => {
      document.removeEventListener('mousedown', handleDropOut);
    };
  }, []);

  return (
    <div className='Header'>
      <div className='nav'>
      <Link to="/" className='logo-link'>
        <div className='logo'>
          <div className='logo-icon'>
            <div className='group'>
              <div className='vector' />
              <div className='vector-3' />
            </div>
            <div className='vector-4' />
          </div>
          <span className='pflow'>PFLOW</span>
        </div>
        </Link>
        <div className='menu'>
          <ul className='tags'>
            <li><Link to="/resume/Resume1" className='tag'>이력서 작성</Link></li>
            <li><Link to="/Chatbot" className='tag'>회사 추천</Link></li>
            <li><Link to="/Mypage" className='tag'>MY PAGE</Link></li>
            <li><Link to="/Community" className='tag'>커뮤니티</Link></li>
          </ul>
          {isLogin() ? (
  <button className='logout-btn' onClick={handleLogOut}>Logout</button>
) : (
  <Link to="/login" className='login'>
    <button className='login-btn' >Login</button>
  </Link>
)}
        </div>
      </div>
      <div className='m-nav'>
        <Link to="/" className='m-pflow'>PFLOW</Link>
        <div className="faBars">
          <FontAwesomeIcon className="faBars" icon={faBars} size="2x" onClick={onDropDown} />
        </div>
      </div>
      <ul ref={dropdownRef} className={`dropdown ${isOpen ? 'show' : ''}`}>
        <li><Link to="/resume/Resume1">이력서 작성</Link></li>
        <li><Link to="/Chatbot">회사 추천</Link></li>
        <li><Link to="/Mypage">MY PAGE</Link></li>
        <li><Link to="/Community">커뮤니티</Link></li>
      </ul>
    </div>
  );
}

export default Header;
