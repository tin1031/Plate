import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'

function Login() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navi = useNavigate();

  const EmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }
  const PasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }
  const SubmitHandler = (e) => {
    e.preventDefault();

    let body={
      email:Email,
      password:Password
    }
    dispatch(loginUser(body)).then(response => {
      if(response.payload.loginSuccess){
        navi('/')
      } else{
        alert('error')
      }
    });

  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={SubmitHandler}>
        <label>이메일</label>
        <input type="email" value={Email} onChange={EmailHandler}/>
        <label>비밀번호</label>
        <input type="Password" value={Password} onChange={PasswordHandler}/>
        <br/>
        <button type='submit'>로그인</button>
      </form>
    </div>
  )
}

export default Login