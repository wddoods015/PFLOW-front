import React, { useState } from 'react';

import './Login.css';

function Login() {

       // 로그인에 활용 할 변수
       const [id,setid] = useState("");
       const [pw,setpw] = useState("");
      // const [user, setUser] = useState({}); // 유저 정보 초기화
       //const [islogin,setislogin] = useState(false);
   
 

      // 로그인 요청
      const savelogin = async (e) =>{
        e.preventDefault();
        console.log(`보낼 데이터 = ID : ${id}, PW : ${pw}`);
        try{
            
                const response = await fetch('http://192.168.0.144:4000/login',{
                    method: 'POST',
                    credentials: 'include', // cookie 포함을 허용하는 속성
                    // 요청을 보낸 경로에서 쿠키를 보내주는데(res) include하지 않으면 쿠키가 저장되지않는다.
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ID: id, PW : pw})
                })
                console.log('중간확인')
            
        // console.log(response);
        
        if(response.ok){
            const result = await response.json();
            if(!result[0]){
                alert("회원 정보가 일치하지않습니다.")
            } else{
                alert("로그인 성공");
             // 로그인 성공, 메인으로 이동   
              // window.location.replace("/"); 
            }
            console.log(result);
            // if (result){
            //     console.log(result);
            //     const userData = result;
            //     setUser(userData);
            //     // console.log(user);
            // }
            // else {
            //     setUser({user_id: '', ID:''})
            //     alert(`회원 정보가 일치하지 않습니다.`);
                
            //     document.getElementById('user_id').textContent = user[0].ID;
            // }
        } else alert('데이터 요청, 응답 오류');

        }catch(error){
            console.error(`전송 중 오류 발생 : ${error.messege}`)
        }
    }



    return (
        <div className='log-in'>
            <h1>로그인</h1>
            <form className='login-form' onSubmit={savelogin}>
                <div>
                    <label id='ID'>ID</label>
                    <input className='input-section' type='ID' placeholder='ID를 입력하세요.' onChange={e=>setid(e.target.value)}></input>
                </div>
                <div>
                    <label id='PW'>비밀번호</label>
                    <input  className='input-section' type='password' placeholder='비밀번호를 입력하세요.' onChange={e=>setpw(e.target.value)}></input>
                </div>
                <div>
                    <button className='submit-login-btn'>Login</button>
                </div>
                <hr className="custom-line"/>
                <button className='signup-btn'>회원가입</button>
            </form>
            <div>
                <p id='user_id'></p>
            </div>
        </div>
    );
}
export default Login;


