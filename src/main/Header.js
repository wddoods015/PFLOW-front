import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

function Header() {
  return (
    <div className='header'>
        <div className='logo'>
            <div className='logo-icon'>
                <div className='group'>
                  <div className='vector' />
                  <div className='vector-3' />
                </div>
                <div className='vector-4' />
            </div>
            <Link to="/" className='pflow'>PFLOW</Link>
        </div>
        <div className='menu'>
        <ui className='tags'>
              <Link to="/resume/Resume1" className='tag'>이력서 작성</Link>
              <span className='tag'>회사 추천</span>
              <span className='tag'>회사 검색 </span>
              <span className='tag'>커뮤니티</span>
              </ui>
              <Link to="/Login" className='login'><button className='login-btn'>Login</button></Link> 
      </div>
      </div>
  );
}

export default Header;
