import React from "react";
import Sidebar from '../components/Siderbar'; 
import './Mypage.css';


const Myactive = () => {
    
    return (
        <div className="Myactive">
            <Sidebar/>
            <div className="myactive-saction">
            <h1>나의 활동</h1>
            <table className="myactive-tb">
                <tr>
                    <th>번호</th>
                    <th>내가 쓴 글</th>
                    <th>작성일</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>댓글 달았습니다.</td>
                    <td>2024-09-11</td>
                </tr>
            </table>
            </div>
        </div>
    );
};

export default Myactive;